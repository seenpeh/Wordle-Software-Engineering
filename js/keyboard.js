import { emitGameInput, normalizeGameInput } from "./input.js";

export const GUESS_EVALUATED_EVENT = "wordle:guess-evaluated";

const KEY_STATE_PRIORITY = {
  absent: 1,
  present: 2,
  correct: 3,
};

const STATE_LABELS = {
  absent: "در کلمه نیست",
  present: "در جای دیگر است",
  correct: "در جای درست است",
};

function isEditableTarget(target) {
  return target instanceof Element
    && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

export function bindVirtualKeyboard(keyboard, target = document) {
  if (!keyboard) {
    throw new Error("Virtual keyboard element was not found.");
  }

  const handleClick = (event) => {
    const keyButton = event.target.closest("[data-key]");

    if (!keyButton || !keyboard.contains(keyButton) || keyButton.disabled) {
      return;
    }

    emitGameInput(keyButton.dataset.key, { target, source: "virtual" });
  };

  keyboard.addEventListener("click", handleClick);

  return () => keyboard.removeEventListener("click", handleClick);
}

export function bindPhysicalKeyboard(target = document) {
  const handleKeydown = (event) => {
    if (
      event.defaultPrevented
      || event.ctrlKey
      || event.altKey
      || event.metaKey
      || isEditableTarget(event.target)
    ) {
      return;
    }

    const handled = emitGameInput(event.key, { target, source: "physical" });

    if (handled) {
      event.preventDefault();
    }
  };

  target.addEventListener("keydown", handleKeydown);

  return () => target.removeEventListener("keydown", handleKeydown);
}

export function mergeKeyState(currentState, nextState) {
  if (!(nextState in KEY_STATE_PRIORITY)) {
    return currentState ?? null;
  }

  if (!currentState || KEY_STATE_PRIORITY[nextState] > KEY_STATE_PRIORITY[currentState]) {
    return nextState;
  }

  return currentState;
}

export function updateKeyboardFeedback(keyboard, evaluations) {
  if (!keyboard || !Array.isArray(evaluations)) {
    return;
  }

  for (const evaluation of evaluations) {
    const input = normalizeGameInput(evaluation?.letter);

    if (input?.action !== "letter") {
      continue;
    }

    const keyButton = [...keyboard.querySelectorAll("[data-key]")]
      .find((button) => button.dataset.key === input.value);

    if (!keyButton) {
      continue;
    }

    const nextState = mergeKeyState(keyButton.dataset.state, evaluation.status);

    if (nextState) {
      keyButton.dataset.state = nextState;
      keyButton.setAttribute("aria-label", `${input.value}، ${STATE_LABELS[nextState]}`);
    }
  }
}

export function bindKeyboardFeedback(keyboard, target = document) {
  const handleGuessEvaluation = (event) => {
    updateKeyboardFeedback(keyboard, event.detail?.evaluations);
  };

  target.addEventListener(GUESS_EVALUATED_EVENT, handleGuessEvaluation);

  return () => target.removeEventListener(GUESS_EVALUATED_EVENT, handleGuessEvaluation);
}
