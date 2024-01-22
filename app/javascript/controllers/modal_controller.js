import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    modalId: {type: String}
  }
  modalElement = document.getElementById(this.modalIdValue);

  connect(event){
    this.modalElement.showModal();
  }
}