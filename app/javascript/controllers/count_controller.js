import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { textLimit: String };
  static targets = ["input", "display"];

  updateDisplay() {
    const remainingCharacters =
      this.textLimitValue - this.inputTarget.value.length;

    if (remainingCharacters >= 0) {
      this.displayTarget.textContent = `残り${remainingCharacters}文字入力できます`;
    } else {
      this.displayTarget.textContent = `${-remainingCharacters}文字オーバーしています`;
    }
  }
}
