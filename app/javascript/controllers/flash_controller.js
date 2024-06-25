import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { text: { type: String } };
  static targets = ["flash", "message"];

  displayMessage() {
    const message = this.messageTarget;
    const flash = this.flashTarget;

    message.innerText = this.textValue;
    message.className =
      "animate-disappear flex items-center justify-center bg-white fixed w-screen sm:w-[640px] animate-disappear";

    message.dataset.controller = "removal";
    message.dataset.action = "animationend->removal#remove";

    flash.appendChild(message);
    flash.style.display = "block";
  }
}
