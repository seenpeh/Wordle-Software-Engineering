// کنترلر بازی: رویدادهای ورودی را به وضعیت و گرید وصل می‌کند

import { GAME_INPUT_EVENT } from "./input.js";
import { GUESS_EVALUATED_EVENT } from "./keyboard.js";
import { createBoard, setTileLetter, setTileState } from "./board.js";
import {
  addLetter,
  commitRow,
  createGameState,
  currentGuess,
  deleteLetter,
  isBoardFull,
  isGuessComplete,
} from "./state.js";
import { WORD_LENGTH } from "./config.js";
import { evaluateGuess, isWinningEvaluation } from "./evaluate.js";
import { isValidWord, pickRandomWord } from "./words.js";

// همان رویدادی که ماژول آمار برای ثبت نتیجه به آن گوش می‌دهد.
export const GAME_ENDED_EVENT = "wordle:game-ended";

/**
 * ردیف جاری گرید را با حروف تایپ‌شده هم‌گام می‌کند.
 */
function renderCurrentRow(tiles, state) {
  const letters = currentGuess(state);
  const rowTiles = tiles[state.currentRow];

  if (!rowTiles) {
    return;
  }

  for (let col = 0; col < WORD_LENGTH; col++) {
    setTileLetter(rowTiles[col], letters[col] ?? "");
  }
}

/**
 * نتیجه‌ی ارزیابی را روی خانه‌های یک ردیف اعمال می‌کند.
 */
function paintRow(rowTiles, evaluations) {
  evaluations.forEach((entry, index) => {
    setTileState(rowTiles[index], entry.status);
  });
}

/**
 * بازی را روی گرید داده‌شده راه‌اندازی می‌کند.
 * @param {HTMLElement} boardElement
 * @param {Document|HTMLElement} target عنصری که رویدادهای ورودی روی آن منتشر می‌شود
 * @param {string} [targetWord] کلمه‌ی هدف، در صورت نبود تصادفی انتخاب می‌شود
 * @returns {() => void} تابع پاک‌سازی شنونده‌ها
 */
export function startGame(boardElement, target = document, targetWord = pickRandomWord()) {
  const tiles = createBoard(boardElement);
  const state = createGameState();
  const message = document.querySelector("#message");

  const announce = (text) => {
    if (message) {
      message.textContent = text;
    }
  };

  const endGame = (won) => {
    state.status = won ? "won" : "lost";
    announce(won ? "آفرین! درست حدس زدی." : `فرصت‌ها تمام شد. کلمه «${targetWord}» بود.`);

    // ماژول آمار به این رویداد گوش می‌دهد تا برد/باخت و streak را ذخیره کند.
    target.dispatchEvent(new CustomEvent(GAME_ENDED_EVENT, {
      detail: { won, targetWord },
    }));
  };

  /**
   * حدس را ارزیابی می‌کند و نتیجه را برای رنگ‌آمیزی کیبورد منتشر می‌کند.
   */
  const checkGuess = (guess) => {
    const evaluations = evaluateGuess(guess, targetWord);

    target.dispatchEvent(new CustomEvent(GUESS_EVALUATED_EVENT, {
      detail: { evaluations },
    }));

    return evaluations;
  };

  const submitGuess = () => {
    if (!isGuessComplete(state)) {
      return;
    }

    const guess = currentGuess(state).join("");

    if (!isValidWord(guess)) {
      announce("این کلمه در فهرست کلمات نیست.");
      return;
    }

    announce("");

    const evaluations = checkGuess(guess);
    paintRow(tiles[state.currentRow], evaluations);

    commitRow(state);

    if (isWinningEvaluation(evaluations)) {
      endGame(true);
    } else if (isBoardFull(state)) {
      endGame(false);
    }
  };

  const handleInput = (event) => {
    const { action, value } = event.detail ?? {};
    let changed = false;

    if (action === "letter") {
      changed = addLetter(state, value);
    } else if (action === "delete") {
      changed = deleteLetter(state);
    } else if (action === "submit") {
      submitGuess();
      return;
    }

    if (changed) {
      renderCurrentRow(tiles, state);
    }
  };

  target.addEventListener(GAME_INPUT_EVENT, handleInput);

  return () => target.removeEventListener(GAME_INPUT_EVENT, handleInput);
}
