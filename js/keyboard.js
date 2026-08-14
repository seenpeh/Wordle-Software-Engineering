import { emitGameInput } from "./input.js";

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
