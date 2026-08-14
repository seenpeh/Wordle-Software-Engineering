import {
  bindKeyboardFeedback,
  bindPhysicalKeyboard,
  bindVirtualKeyboard,
} from "./keyboard.js";
import { bindStatsTracking } from "./stats.js";

const keyboard = document.querySelector("#keyboard");

bindVirtualKeyboard(keyboard);
bindPhysicalKeyboard();
bindKeyboardFeedback(keyboard);
bindStatsTracking();
