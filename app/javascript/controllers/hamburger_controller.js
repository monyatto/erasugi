import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  menuItems = document.getElementById("menu-items");
  svgElement = document.querySelector('svg[data-controller="hamburger"]');
  isOpen = false;

  connect() {
    this.menuItems.classList.add("invisible");
  }

  openAndClose() {
    this.menuItems.classList.toggle("invisible");
    if (this.isOpen) {
      this.svgElement.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />';
    } else {
      this.svgElement.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 17.94 6M18 18 6.06 6"/>';
    }
    this.isOpen = !this.isOpen;
  }
}
