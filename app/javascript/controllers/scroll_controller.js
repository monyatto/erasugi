// ファイル2
import { Controller } from "@hotwired/stimulus"
import Swiper from 'swiper';

export default class extends Controller {
    swiper = new Swiper(".swiper", {
        direction: 'vertical',
        mousewheel: {
            thresholdDelta: 100,
        },
        speed: 400,
        spaceBetween: 100,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: () => {
                console.log("スライドが変わった！")
                let activeIndex = this.swiper.activeIndex;
                fetch('/api/posts')
                    .then(response => response.json())
                    .then(data => {
                        let postIds = Object.keys(data.reactions);
                        let activePostId = postIds[activeIndex];
                        let event = new CustomEvent('postIdChanged', { detail: activePostId });
                        window.dispatchEvent(event);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
        },
    });
}
