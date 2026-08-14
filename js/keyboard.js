import { emitGameInput } from "./input.js";

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
