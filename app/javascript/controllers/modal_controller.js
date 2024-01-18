import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "modal" ]

  open(event) {
    const modalId = event.target.dataset.modalId;
    const modalElement = document.getElementById(modalId);
    modalElement.showModal();
  }

  close() {
    this.modalTarget.close();
  }
}