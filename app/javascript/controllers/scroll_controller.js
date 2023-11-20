// ファイル2
import { Controller } from "@hotwired/stimulus"
import Swiper from 'swiper';

export default class extends Controller {
    connect() {
        window.addEventListener('DOMContentLoaded', () => {
            this.initializeSwiper();
        });
    }

    initializeSwiper() {
        const swiper = new Swiper(".swiper", {
            direction: 'vertical',
            mousewheel: {
                thresholdDelta: 100,
            },
            speed: 400,
            spaceBetween: 100,
            on: {
                slideChange: () => {
                    this.dispatchPostIdChanged(swiper);
                },
            },
        });

        // ページ読み込み時にもイベントを発火
        this.dispatchPostIdChanged(swiper);
    }

    dispatchPostIdChanged(swiper) {
        let activeIndex = swiper.activeIndex;
        let activeSlide = document.querySelectorAll('.swiper-slide')[activeIndex];
        let postID = activeSlide.dataset.postId;
        let event = new CustomEvent('postIdChanged', { detail: postID });

        // カスタムイベントを発火
        window.dispatchEvent(event);
    }
}
