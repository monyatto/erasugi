import {Controller} from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
  static values = {
    postId: {type: String},
    firstPostId: {type: String},
    reactionsTypeIds: {type: Array, default: []}
  }
  imageCache = {};
  activePostId = this.firstPostIdValue;
  reactionTypeToImage = {
    1: '/assets/test.png',
    2: '/assets/test1.png',
    3: '/assets/test2.png',
  };

  initialize() {
    this.boundHandlePostIdChanged = this.handlePostIdChanged.bind(this);
    Object.values(this.reactionTypeToImage).forEach(url => {
      const img = new Image();
      img.onload = () => {
        this.imageCache[url] = img;
      };
      img.src = url;
    });
  }

  connect() {
    console.log(this.postIdValue)
    console.log(this.firstPostIdValue)
    console.log(this.reactionsTypeIdsValue)
    if (this.postIdValue === this.firstPostIdValue) {
      // 接続時に表示されている投稿のidと一致したらリアクションを表示する
      this.setupExistingReactions(this.postIdValue)
    }
    ;
    window.addEventListener('postIdChanged', this.boundHandlePostIdChanged);
  };

  disconnect() {
    // コントローラーの二重呼び出しが影響しないように対処
    this.postIdValue = undefined;
    this.firstPostIdValue = undefined;
    this.reactionsTypeIdsValue = undefined;
    window.removeEventListener('postIdChanged', this.boundHandlePostIdChanged);
  };

  handlePostIdChanged(e) {
    this.activePostId = (e.detail)
    if (this.postIdValue === this.activePostId) {
      // スライド切り替え時に表示された投稿のidと一致したらリアクションを表示する
      this.setupExistingReactions(this.postIdValue)
    }
    ;
  }

  async onButtonClick(event) {
    const reactionTypeId = String(event.params.reactionTypeId)
    const response = await fetch("/reactions", {
      method: "POST",
      mode: "same-origin",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      },
      body: JSON.stringify({
        post_id: this.postIdValue,
        reactions_type_id: reactionTypeId
      }),
    }).then((response) => {
      if (response.ok) {
        this.renderReactionImages(reactionTypeId)
        this.addNewReactionsTypeId(reactionTypeId)
      }
    })
  };

  addNewReactionsTypeId(reactionTypeId) {
    // 非同期に更新されたreactionsTypeIdsValueを反映する
    this.reactionsTypeIdsValue = [...this.reactionsTypeIdsValue, reactionTypeId];
  }

  setupExistingReactions(targetPostId) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: availableHeight
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.renderReactionImages(this.reactionsTypeIdsValue)
  }

  async renderReactionImages(reactionTypes) {
    // 以前に押されたリアクション（複数）の表示と新しくボタンが押されたリアクション（単数）の両方に対応
    for (let i = 0; i < reactionTypes.length; i++) {
      const imageSrc = this.reactionTypeToImage[reactionTypes[i]];
      if (imageSrc) {
        await this.displayReaction(imageSrc);
      }
    }
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
        }
        imageObj.src = imageSrc;
      }
    });
  }

  createSprite(imageObj) {
    const sprite = new Konva.Sprite({
      x: Math.floor(Math.random() * (window.innerWidth)) - 150,
      y: Math.floor(Math.random() * (this.stage.height() - 300)),
      image: imageObj,
      animation: 'idle',
      animations: {
        idle: [0, 0, 300, 300, 300, 0, 300, 300]
      },
      frameRate: 7,
      frameIndex: 0
    });
    this.layer.add(sprite);
    if (this.layer.children.length > 100) {
      this.layer.children[0].destroy();
    }
    sprite.start();
    sprite.moveToTop();
    this.layer.draw();
  }
}
