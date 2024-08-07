import { Controller } from "@hotwired/stimulus";
import Konva from "konva";

export default class extends Controller {
  static values = {
    postId: { type: String },
    firstPostId: { type: String },
    associatedReactions: { type: Number },
  };

  static targets = ["load", "button"];

  activePostId = this.firstPostIdValue;

  connect() {
    if (this.postIdValue === this.firstPostIdValue) {
      this.setupExistingReactions(this.postIdValue);
    }
  }

  disconnect() {
    this.postIdValue = undefined;
    this.firstPostIdValue = undefined;
    this.associatedReactionsValue = undefined;
  }

  postIdChanged({ detail: { content } }) {
    this.activePostId = content;
    if (this.postIdValue === this.activePostId) {
      this.setupExistingReactions(this.postIdValue);
    }
  }

  onButtonClick(event) {
    fetch(`/posts/${this.postIdValue}/reactions`, {
      method: "POST",
      mode: "same-origin",
      referrerPolicy: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector("meta[name='csrf-token']")
          .getAttribute("content"),
      },
      body: JSON.stringify({
        post_id: this.postIdValue,
      }),
    }).then((response) => {
      if (response.ok) {
        const isButtonPressed = true;
        this.createText(0, isButtonPressed);
        this.associatedReactionsValue++;

        // テスト用にclassを付与
        this.buttonTarget.classList.add(
          `test-clicked-button-${this.postIdValue}`,
        );
      }
    });
  }

  setupExistingReactions(targetPostId) {
    const headerHeight = document.querySelector("header").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;
    this.stage = new Konva.Stage({
      container: "container",
      width: window.innerWidth,
      height: availableHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    const isButtonPressed = false;
    for (let i = 0; i < this.associatedReactionsValue; i++) {
      this.createText(i * 100, isButtonPressed);
    }
  }

  createText(delay, isButtonPressed) {
    setTimeout(() => {
      const wordProbabilities = {
        えらい: 0.8,
        すてき: 0.03,
        ええやん: 0.03,
        とても良い: 0.03,
        素晴らしい: 0.03,
        最高: 0.02,
        優勝: 0.02,
        神: 0.02,
        パーフェクト: 0.02,
        今夜はお寿司: 0.01,
      };
      const randomWord = this.getRandomWord(wordProbabilities);
      const text = new Konva.Text({
        x: isButtonPressed
          ? window.innerWidth / 2 - randomWord.length * 10
          : Math.floor(Math.random() * (window.innerWidth + 30)) - 50,
        y: isButtonPressed
          ? window.innerHeight / 2
          : Math.floor(Math.random() * (this.stage.height() - 50)),
        text: randomWord,
        fontSize: isButtonPressed ? "20" : "18",
        fontStyle: isButtonPressed ? "bold" : "normal",
        fontFamily: "Zen Maru Gothic",
        fill: isButtonPressed ? "#303030" : "gray",
        opacity: 1,
      });
      text.listening(false);
      text.perfectDrawEnabled(false);
      this.layer.add(text);
      text.moveToTop();
      this.layer.draw();
      isButtonPressed ? this.moveUp(text) : this.fadeIn(text);
    }, delay);
  }

  fadeIn(text) {
    return new Promise((resolve, reject) => {
      const tween = new Konva.Tween({
        node: text,
        duration: 1.0,
        opacity: 0,
        onFinish: () => {
          text.destroy();
          tween.destroy();
          resolve();
        },
      });
      tween.play();
    });
  }

  moveUp(text) {
    return new Promise((resolve, reject) => {
      const tween = new Konva.Tween({
        node: text,
        duration: 0.5,
        y: text.y() - 150,
        opacity: 0,
        onFinish: function () {
          text.destroy();
          tween.destroy();
          resolve();
        },
      });
      tween.play();
    });
  }

  getRandomWord(wordProbabilities) {
    const sum = Object.values(wordProbabilities).reduce((a, b) => a + b, 0);
    let rand = Math.random() * sum;
    for (const word in wordProbabilities) {
      rand -= wordProbabilities[word];
      if (rand < 0) {
        return word;
      }
    }
  }
}
