// ファイル2
import { Controller } from "@hotwired/stimulus"
import Swiper from 'swiper';

export default class extends Controller {
    connect() {
        document.addEventListener('turbo:load', () => {
            this.initializeSwiper();
        });

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
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: () => {
                    this.dispatchPostIdChanged(swiper);
                },
            },
        });
        this.dispatchPostIdChanged(swiper);
    }

    dispatchPostIdChanged(swiper) {
        let activeIndex = swiper.activeIndex;
        let activeSlide = document.querySelectorAll('.swiper-slide')[activeIndex];
        let postID = activeSlide.dataset.postId;
        let event = new CustomEvent('postIdChanged', { detail: postID });

        window.dispatchEvent(event);
    }
}
