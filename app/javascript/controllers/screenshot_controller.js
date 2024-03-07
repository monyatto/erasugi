import { Controller } from "@hotwired/stimulus";
import Html2canvas from "html2canvas";

export default class extends Controller {
  connect() {
    this.element.addEventListener("click", this.takeScreenshot.bind(this));
  }

  takeScreenshot() {
    Html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}
