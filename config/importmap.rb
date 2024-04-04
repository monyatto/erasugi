# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers", preload: true

pin "konva", to: "https://ga.jspm.io/npm:konva@9.2.2/lib/index.js"
pin "swiper", to: "https://ga.jspm.io/npm:swiper@11.0.4/swiper.mjs"
pin "swiper/element/bundle", to: "https://ga.jspm.io/npm:swiper@11.0.4/swiper-element-bundle.mjs"
pin "html2canvas", to: "https://ga.jspm.io/npm:html2canvas@1.4.1/dist/html2canvas.js"