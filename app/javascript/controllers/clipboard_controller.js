import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["url"]

  copy() {
    event.preventDefault();
    navigator.clipboard.writeText(this.urlTarget.value)

    this.flashMessage("URLをコピーしました");
  }

  flashMessage(message) {
    const flash = document.getElementById('flash');
    const flashMessage = document.createElement('div');

    flashMessage.innerText = message;
    flashMessage.className = "animate-disappear";
    flashMessage.dataset.controller = "removals";
    flashMessage.dataset.action = "animationend->removals#remove";

    flash.appendChild(flashMessage);
    flash.style.display = 'block';

    setTimeout(function () {
      flashMessage.style.display = 'none';
      flashMessage.dispatchEvent(new Event('animationend'));
    }, 3000);
  }
}
