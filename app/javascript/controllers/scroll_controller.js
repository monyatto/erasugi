import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "name" ]
    scrollDirection = 0

    connect(){
        // イベントリスナーを一時的に無効にするフラグを設定
        this.isAutoScrolling = true;

        this.scrollDirection = window.scrollY;
        let vh = window.innerHeight * 0.1;  // 10vhをピクセル単位で計算
        window.scrollTo(0, vh);  // スクロール位置を10vh下げる

        // 自動スクロールが終わったことを検知するためのタイムアウトを設定
        setTimeout(() => {
            this.isAutoScrolling = false;
        }, 1000);  // ここでは1秒後にフラグをfalseに設定していますが、必要に応じて調整してください

        // ユーザーによるスクロールを検知するイベントリスナーを設定
        window.addEventListener('wheel', this.scrollEvent.bind(this));
    }
    disconnect() {
        window.removeEventListener('wheel', this.scrollEvent.bind(this))
    }

    scrollEvent(e) {
        // 自動スクロール中は何もしない
        if (this.isAutoScrolling) {
            return;
        }
        if (Math.abs(e.deltaY) > 100) {
            if (e.deltaY > 0) {
                // スクロールが下向きの場合
                window.location.href = "http://localhost:3000/posts/32"
            } else {
                // スクロールが上向きの場合
                window.location.href = "http://localhost:3000/posts/33"
            }
        }
    }
}
