// وردل فارسی - نقطه‌ی ورود برنامه

import { WORD_LENGTH, MAX_GUESSES } from "./config.js";

function init() {
  console.log(`وردل فارسی: ${WORD_LENGTH} حرف، ${MAX_GUESSES} حدس`);
}

document.addEventListener("DOMContentLoaded", init);
