Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :show] do
    resources :posts, only: [:index], controller: "users/posts"
  end
  resources :posts
  resources :reactions
end
