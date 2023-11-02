import { Controller } from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
    stage = null;
    layer = null;
    reactionCount = null;
    navbarHeight = null;
    availableHeight = null;

    targetPostId = location.pathname.split('/')[2];

    connect() {
        this.reactionCount = document.getElementById('reactionCount').dataset.count;
        this.navbarHeight = document.querySelector('.navbar').offsetHeight;
        this.availableHeight = window.innerHeight - this.navbarHeight;

        this.stage = new Konva.Stage({
            container: 'container',
            width: window.innerWidth,
            height: this.availableHeight,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        let targetArray  = null;

        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                for (let post of data.posts) {
                    for (let reaction of post.reactions) {
                        if (reaction.hasOwnProperty(this.targetPostId)) {
                            targetArray = reaction[this.targetPostId];
                            break;
                        }
                    }
                }
                this.determineReactionType(targetArray)
                const postsPerPage = data.posts_per_page;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    onButtonClick(event) {
        const reactionTypeId = parseInt(event.target.dataset.reactionTypeId);
        let reactionTypes = [];
        reactionTypes.push(reactionTypeId)
        this.determineReactionType(reactionTypes);
    }

    async determineReactionType(reactionTypes) {
        for (let i = 0; i < reactionTypes.length; i++) {
            if (reactionTypes[i] === 1) {
                await this.displayReaction(`/assets/test.png`);
            } else if (reactionTypes[i] === 2) {
                await this.displayReaction(`/assets/test1.png`);
            } else if (reactionTypes[i] === 3) {
                await this.displayReaction(`/assets/test2.png`);
            }
        }
    }

    async displayReaction(imageSrc) {
        return new Promise((resolve, reject) => {
            const imageObj = new Image();
            imageObj.onload = () => {
                const sprite = new Konva.Sprite({
                    x: Math.floor(Math.random() * (window.innerWidth)) -150,
                    y: Math.floor(Math.random() * (this.availableHeight - 300 )),
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
                resolve();
            }
            imageObj.src = imageSrc;
        });
    }
}
