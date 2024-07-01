import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["url"];

  copy(event) {
    event.preventDefault();
    this.dispatch("copy");
    navigator.clipboard.writeText(this.urlTarget);
  }
}
