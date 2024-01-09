import { Controller } from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
    static values = {
        post:{ type: String },
        firstPostId:{ type: String },
        reactionsTypeIds:{ type: Array , default: [] },
    }
    imageCache = {};
    activePostId = undefined;
    reactionTypeToImage = {
        1: '/assets/test.png',
        2: '/assets/test1.png',
        3: '/assets/test2.png',
    };

    initialize() {
        this.boundHandlePostIdChanged = this.handlePostIdChanged.bind(this);
        this.boundHandleOnButtonClick = this.handleOnButtonClick.bind(this);
        Object.values(this.reactionTypeToImage).forEach(url => {
            const img = new Image();
            img.onload = () => {
                this.imageCache[url] = img;
            };
            img.src = url;
        });
    }

    connect() {
        this.activePostId = this.firstPostIdValue;
        if (this.postValue === this.firstPostIdValue) {
            this.displayExistingReaction(this.postValue)
        };
        window.addEventListener('postIdChanged', this.boundHandlePostIdChanged);
        window.addEventListener('onButtonClick', this.boundHandleOnButtonClick);
    };

    disconnect() {
        // コントローラーの二重呼び出しが影響しないように対処
        this.postValue = undefined;
        this.firstPostIdValue = undefined;
        this.reactionsTypeIdsValue = undefined;
        window.removeEventListener('postIdChanged', this.boundHandlePostIdChanged);
        window.removeEventListener('onButtonClick', this.boundHandleOnButtonClick);
    };

    addNewReactionsTypeId(reactionTypeId) {
        // 非同期に更新されたreactionsTypeIdsValueを反映する
        this.reactionsTypeIdsValue = [...this.reactionsTypeIdsValue, reactionTypeId];
    }
された
    handlePostIdChanged(e) {
        this.activePostId = (e.detail)
        if (this.postValue === this.activePostId) {
            this.displayExistingReaction(this.postValue)
        };
    }

    handleOnButtonClick(e) {
        if (this.postValue === this.activePostId) {
            const reactionTypeId = (e.detail)
            this.addNewReactionsTypeId(reactionTypeId)
            this.determineReactionType(reactionTypeId)
        };
    }

    displayExistingReaction(targetPostId){
        const availableHeight = window.innerHeight - document.querySelector('.navbar').offsetHeight;
            this.stage = new Konva.Stage({
                container: 'container',
                width: window.innerWidth,
                height: availableHeight,
            });
            this.layer = new Konva.Layer();
            this.stage.add(this.layer);
            this.determineReactionType(this.reactionsTypeIdsValue)
    }

    //名前変える
    async determineReactionType(reactionTypes) {
        // 既存のリアクション表示と新しくボタンが押されたリアクションの両方に対応
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
            x: Math.floor(Math.random() * (window.innerWidth)) -150,
            y: Math.floor(Math.random() * (this.stage.height() - 300 )),
            image: imageObj,
            animation: 'idle',
            animations: {
                idle: [0, 0, 300, 300, 300, 0, 300, 300]
            },
            frameRate: 7,
            frameIndex: 0
        });
        this.layer.add(sprite);
        sprite.start();
        sprite.moveToTop();
        this.layer.draw();
    }
}
