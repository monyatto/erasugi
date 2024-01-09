// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { register } from "swiper/element/bundle";
register();
import Rails from '@rails/ujs';
Rails.start();