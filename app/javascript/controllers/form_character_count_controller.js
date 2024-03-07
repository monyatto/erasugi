import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="form-character-count"
export default class extends Controller {
  connect() {
    const textArea = document.getElementById("post_content");
    const textLength = document.getElementById("text-length");
    const textLimit = 140;
    if (textArea) {
      textArea.addEventListener("keyup", function () {
        const count = textArea.value.length;
        if (count <= textLimit) {
          if (textArea.classList.contains("err")) {
            textArea.classList.remove("err");
          }
          textLength.innerHTML =
            "残り" + (textLimit - count) + "文字入力できます";
        } else {
          textArea.classList.add("err");
          textLength.innerHTML = count - textLimit + "文字オーバーしています";
        }
      });
    }
  }
}
