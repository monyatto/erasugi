Rails.application.routes.draw do
  root 'posts#index'

  devise_for :users

  resources :users, only: [:show] do
    resources :posts, only: %i[index edit update destroy], module: :users
  end

  resources :posts, only: %i[index new create show] do
    resources :reactions, only: [:create]
  end

  get 'terms_of_service', to: 'top#terms_of_service'
  get 'privacy_policy', to: 'top#privacy_policy'

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
