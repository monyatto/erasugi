import { Controller } from "@hotwired/stimulus"
import Konva from 'konva';

export default class extends Controller {
    stage = null;
    layer = null;
    reactionCount = null;
    navbarHeight = null;
    availableHeight = null;

    connect() {
        const array = JSON.parse(document.getElementById('filename_and_count').dataset.count);
        this.reactionCount = document.getElementById('reactionCount').dataset.count;
        this.navbarHeight = document.querySelector('.navbar').offsetHeight;
        this.availableHeight = window.innerHeight - this.navbarHeight;
        this.generate(array);
    }

    generate(array) {
        this.stage = new Konva.Stage({
            container: 'container',
            width: window.innerWidth,
            height: this.availableHeight,
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        array.forEach((element) => {
            this.add_reaction(element[0],element[1]);
        });
    }

    add_reaction(imageSrc, reactionCount) {
        for (let i = 0; i < reactionCount; i++) {
            const imageObj = new Image();
            imageObj.onload = () => {
                const sprite = new Konva.Sprite({
                    x: Math.floor(Math.random() * (window.innerWidth)) -150,
                    y: Math.floor(Math.random() * (this.availableHeight - 300 )) ,
                    image: imageObj,
                    animation: 'idle',
                    animations: {
                        idle: [
                            0, 0, 300, 300, 300, 0, 300, 300,
                        ]
                    },
                    frameRate: 7,
                    frameIndex: 0
                });
                this.layer.add(sprite);
                sprite.start();
                this.layer.draw();
            }
            imageObj.src = `/assets/${imageSrc}`;
        }
    }

    onButtonClick(event) {
        const imageSrc = event.currentTarget.getAttribute('data-imageSrc');
        this.reactionCount = event.currentTarget.dataset.count;
        this.add_reaction(imageSrc,1);
    }

}
