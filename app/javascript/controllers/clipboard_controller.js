import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["url"];

  copy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(this.urlTarget);
    this.flashMessage("URLをコピーしました");
  }

  flashMessage(message) {
    const flash = document.getElementById("flash");
    const flashMessage = document.createElement("div");

    flashMessage.innerText = message;
    flashMessage.className =
      "animate-disappear flex items-center justify-center bg-white fixed w-screen sm:w-[640px] animate-disappear";
    flashMessage.dataset.controller = "removals";
    flashMessage.dataset.action = "animationend->removals#remove";

    flash.appendChild(flashMessage);
    flash.style.display = "block";

    flashMessage.addEventListener("animationend", function () {
      flashMessage.style.display = "none";
    });
  }
}
