import {
  bindKeyboardFeedback,
  bindPhysicalKeyboard,
  bindVirtualKeyboard,
} from "./keyboard.js";
import { bindStatsTracking } from "./stats.js";
import { bindStatsModal } from "./stats-modal.js";

const keyboard = document.querySelector("#keyboard");
const statsModal = document.querySelector("#stats-modal");
const statsButton = document.querySelector("#stats-button");

bindVirtualKeyboard(keyboard);
bindPhysicalKeyboard();
bindKeyboardFeedback(keyboard);
bindStatsTracking();
bindStatsModal({ dialog: statsModal, openButton: statsButton });
