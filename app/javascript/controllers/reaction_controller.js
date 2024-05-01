import {Controller} from "@hotwired/stimulus";
import Konva from "konva";

export default class extends Controller {
  static values = {
    postId: {type: String},
    firstPostId: {type: String},
    reactionsTypeIds: {type: Array, default: []},
  };

  imageCache = {};
  activePostId = this.firstPostIdValue;
  reactionTypeToImage = {
    1: "/assets/test.png",
    2: "/assets/test1.png",
    3: "/assets/test2.png",
  };

  initialize() {
    this.boundHandlePostIdChanged = this.handlePostIdChanged.bind(this);
    Object.values(this.reactionTypeToImage).forEach((url) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache[url] = img;
      };
      img.src = url;
    });
  }

  connect() {
    if (this.postIdValue === this.firstPostIdValue) {
      // 接続時に表示されている投稿のidと一致したらリアクションを表示する
      this.setupExistingReactions(this.postIdValue);
    }

    window.addEventListener("postIdChanged", this.boundHandlePostIdChanged);
  }

  disconnect() {
    // コントローラーの二重呼び出しが影響しないように対処
    this.postIdValue = undefined;
    this.firstPostIdValue = undefined;
    this.reactionsTypeIdsValue = undefined;
    window.removeEventListener("postIdChanged", this.boundHandlePostIdChanged);
  }

  handlePostIdChanged(e) {
    this.activePostId = e.detail;
    if (this.postIdValue === this.activePostId) {
      // スライド切り替え時に表示された投稿のidと一致したらリアクションを表示する
      this.setupExistingReactions(this.postIdValue);
    }
  }

  async onButtonClick(event) {
    const reactionTypeId = String(event.params.reactionTypeId);
    await fetch("/reactions", {
      method: "POST",
      mode: "same-origin",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector("meta[name='csrf-token']")
          .getAttribute("content"),
      },
      body: JSON.stringify({
        post_id: this.postIdValue,
        reactions_type_id: reactionTypeId,
      }),
    }).then((response) => {
      if (response.ok) {
        this.renderReactionImages(reactionTypeId);
        this.addNewReactionsTypeId(reactionTypeId);
      }
    });
  }

  addNewReactionsTypeId(reactionTypeId) {
    // 非同期に更新されたreactionsTypeIdsValueを反映する
    this.reactionsTypeIdsValue = [
      ...this.reactionsTypeIdsValue,
      reactionTypeId,
    ];
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
    this.renderReactionImages(this.reactionsTypeIdsValue);
  }

  async renderReactionImages(reactionTypes) {
    // 以前に押されたリアクション（複数）の表示と新しくボタンが押されたリアクション（単数）の両方に対応
    for (let i = 0; i < reactionTypes.length; i++) {
      const imageSrc = this.reactionTypeToImage[reactionTypes[i]];
      if (imageSrc) {
        await this.displayReaction(imageSrc);
      }
    }
    document.getElementById("loading").id = "loaded";
    document.getElementById("button-off").id = "button-on";
  }

  async displayReaction(imageSrc) {
    return new Promise((resolve, reject) => {
      if (this.imageCache[imageSrc]) {
        this.createSprite(this.imageCache[imageSrc]);
        resolve();
      } else {
        const imageObj = new Image();
        imageObj.onload = () => {
          this.imageCache[imageSrc] = imageObj;
          this.createSprite(imageObj);
          resolve();
        };
        imageObj.src = imageSrc;
      }
    });
  }

  createSprite(imageObj) {
    const wordProbabilities = {
      'えらい': 0.9,  // 50% の確率で出現
      '最高': 0.05, // 25% の確率で出現
      '神': 0.05  // 25% の確率で出現
    };
    const randomWord = this.getRandomWord(wordProbabilities);
    const text = new Konva.Text({
      x: Math.floor(Math.random() * (window.innerWidth + 30)) - 50,
      y: Math.floor(Math.random() * (this.stage.height() - 50)),
      text: randomWord,  // ランダムに選んだ文字を表示
      fontSize: 20,
      fontFamily: 'Zen Maru Gothic',
      fill: 'grey',
    });
    this.layer.add(text);
    if (this.layer.children.length > 100) {
      this.layer.children[0].destroy();
    }
    text.moveToTop();
    this.layer.draw();
  }

  getRandomWord(wordProbabilities) {
    const sum = Object.values(wordProbabilities).reduce((a, b) => a + b, 0);
    let rand = Math.random() * sum;
    for (let word in wordProbabilities) {
      rand -= wordProbabilities[word];
      if (rand < 0) {
        return word;
      }
    }
  }
}
