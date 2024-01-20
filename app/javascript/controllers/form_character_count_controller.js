import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form-character-count"
export default class extends Controller {
  connect() {
    const textArea = document.getElementById('post_content');
    const text_length = document.getElementById('text-length');
    const text_limit = 140
    if(textArea){
      textArea.addEventListener('keyup', function(){
        let count = textArea.value.length;
        if (count <= text_limit){
          if(textArea.classList.contains('err')){
            textArea.classList.remove('err');
          }
          text_length.innerHTML = '残り' + (text_limit - count) + '文字入力できます';
        }else{
          textArea.classList.add('err');
          text_length.innerHTML = (count - text_limit) + '文字オーバーしています';
        }
      });
    }
  }
}
