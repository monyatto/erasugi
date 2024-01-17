Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :show] do
    resources :posts, only: [:index], controller: "users/posts"
  end
  resources :posts
  resources :reactions, only: [:create]
  get 'terms_of_service', to: 'top#terms_of_service'
  get 'privacy_policy', to: 'top#privacy_policy'
end
