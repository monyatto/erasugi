import { Controller } from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
    static values = {
        post:{ type: String },
        firstPostId:{ type: String },
        reactionsTypeIds:{ type: Array }
    }
    Stage = null;
    layer = null;
    imageCache = {};

    reactionTypeToImage = {
        1: '/assets/test.png',
        2: '/assets/test1.png',
        3: '/assets/test2.png',
    };

    initialize() {
        Object.values(this.reactionTypeToImage).forEach(url => {
            const img = new Image();
            img.onload = () => {
                this.imageCache[url] = img;
            };
            img.src = url;
        });
    }

    connect() {
        if (this.postValue === this.firstPostIdValue) {
            console.log(this.postValue)
            this.displayExistingReaction(this.postValue)
        };
        window.addEventListener('postIdChanged', (e) => {
            const activePostId = e.detail;
            if (this.postValue === activePostId) {
                this.displayExistingReaction(this.postValue);
            }
        });
    };

    disconnect() {
        this.stage.destroy();
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

    onButtonClick(event) {
        this.determineReactionType([parseInt(event.target.dataset.reactionTypeId)]);
    }

    //名前変える
    async determineReactionType(reactionTypes) {
        // 既存のリアクション表示と新しくボタンが押されたリアクション両方に対応
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
