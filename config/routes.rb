Rails.application.routes.draw do
  root 'posts#index'

  devise_for :users

  namespace :users do
    resources :posts, only: %i[index edit update destroy]
  end

  resources :users, only: [:show]

  resources :posts, only: %i[index new create show] do
    resources :reactions, only: [:create]
    get 'ogp_image', to: 'posts#ogp_image', on: :member
  end

  get 'terms_of_service', to: 'top#terms_of_service'
  get 'privacy_policy', to: 'top#privacy_policy'

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
