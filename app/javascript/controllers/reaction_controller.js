import { Controller } from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
    stage = null;
    layer = null;
    imageCache = {};
    reactionTypeToImage = {
        1: '/assets/test.png',
        2: '/assets/test1.png',
        3: '/assets/test2.png',
    };

    connect() {
        this.preloadImages(Object.values(this.reactionTypeToImage));
        if (document.querySelector('.swiper')) {
            window.addEventListener('postIdChanged', (e) => {
                this.displayExistingReaction(e.detail)
            });
            let event = new Event('DOMContentLoaded');
            window.dispatchEvent(event);
        } else {
            const postId = document.querySelector('[data-post-id]').getAttribute('data-post-id');
            this.displayExistingReaction(postId)
        }
    }

    preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.onload = () => {
                this.imageCache[url] = img;
            };
            img.src = url;
        });
    }

    displayExistingReaction(targetPostId){
        const availableHeight = window.innerHeight - document.querySelector('.navbar').offsetHeight;
        if (!this.stage) {
            this.stage = new Konva.Stage({
                container: 'container',
                width: window.innerWidth,
                height: availableHeight,
            });
        }
        if (!this.layer) {
            this.layer = new Konva.Layer();
            this.stage.add(this.layer);
        } else {
            this.layer.destroyChildren();
        }

        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                this.determineReactionType(data.reactions[targetPostId])
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    onButtonClick(event) {
        this.determineReactionType([parseInt(event.target.dataset.reactionTypeId)]);
    }

    async determineReactionType(reactionTypes) {
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
