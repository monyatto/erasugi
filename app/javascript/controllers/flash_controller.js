import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["container", "element"];

  displayMessage({ params: { text } }) {
    const flashContainer = this.containerTarget;
    const flashElement = this.elementTarget;

    flashElement.innerText = text;
    flashElement.className =
      "animate-disappear flex items-center justify-center bg-white fixed w-screen sm:w-[640px] animate-disappear";

    flashElement.dataset.controller = "removal";
    flashElement.dataset.action = "animationend->removal#remove";

    flashContainer.appendChild(flashElement);
    flashContainer.style.display = "block";
  }
}
