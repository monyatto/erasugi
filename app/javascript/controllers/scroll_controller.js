import { Controller } from "@hotwired/stimulus";
import Swiper from "swiper";

export default class extends Controller {
  static values = { postsIds: Array };

  connect() {
    this.swiper = new Swiper(".swiper", {
      direction: "vertical",
      mousewheel: {
        thresholdDelta: 100,
      },
      speed: 400,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: () => {
          this.setActivePostId();
        },
      },
    });
    window.onpopstate = function (event) {
      location.reload();
    };
  }

  setActivePostId() {
    const activeIndex = this.swiper.activeIndex;
    const activePostId = this.postsIdsValue[activeIndex];
    this.dispatch("setActivePostId", {
      detail: { content: activePostId.toString() },
    });
  }
}
