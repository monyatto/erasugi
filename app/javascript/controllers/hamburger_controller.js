import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menuItems", "svg"];

  isOpen = false;

  connect() {
    this.menuItemsTarget.classList.add("invisible");
  }

  openAndClose() {
    const svgElement = this.svgTarget;
    this.menuItemsTarget.classList.toggle("invisible");

    if (this.isOpen) {
      svgElement.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />';
    } else {
      svgElement.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 17.94 6M18 18 6.06 6"/>';
    }
    this.isOpen = !this.isOpen;
  }
}
