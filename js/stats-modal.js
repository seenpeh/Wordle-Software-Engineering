import { loadStats, normalizeStats, STATS_UPDATED_EVENT } from "./stats.js";

const persianNumber = new Intl.NumberFormat("fa-IR");

export function calculateWinRate(stats) {
  const normalizedStats = normalizeStats(stats);
  return normalizedStats.played === 0
    ? 0
    : Math.round((normalizedStats.wins / normalizedStats.played) * 100);
}

export function renderStats(dialog, stats) {
  const normalizedStats = normalizeStats(stats);
  const winRate = calculateWinRate(normalizedStats);
  const values = {
    played: persianNumber.format(normalizedStats.played),
    winRate: `${persianNumber.format(winRate)}٪`,
    currentStreak: persianNumber.format(normalizedStats.currentStreak),
    maxStreak: persianNumber.format(normalizedStats.maxStreak),
  };

  for (const [name, value] of Object.entries(values)) {
    const output = dialog.querySelector(`[data-stat="${name}"]`);
    if (output) {
      output.textContent = value;
    }
  }

  const summary = dialog.querySelector('[data-stat="summary"]');
  if (summary) {
    summary.textContent = normalizedStats.played === 0
      ? "هنوز بازی‌ای ثبت نشده است."
      : `${persianNumber.format(normalizedStats.wins)} برد و ${persianNumber.format(normalizedStats.losses)} باخت ثبت شده است.`;
  }
}

export function openStatsModal(dialog, stats) {
  renderStats(dialog, stats);

  if (!dialog.open) {
    dialog.showModal();
  }
}

export function bindStatsModal({
  dialog,
  openButton,
  target = document,
  storage = localStorage,
}) {
  if (!dialog || !openButton) {
    throw new Error("Stats modal controls were not found.");
  }

  const openSavedStats = () => openStatsModal(dialog, loadStats(storage));
  const closeModal = () => dialog.close();
  const closeOnBackdrop = (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  };
  const showUpdatedStats = (event) => {
    openStatsModal(dialog, event.detail?.stats);
  };

  openButton.addEventListener("click", openSavedStats);
  dialog.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
  dialog.addEventListener("click", closeOnBackdrop);
  target.addEventListener(STATS_UPDATED_EVENT, showUpdatedStats);
}
