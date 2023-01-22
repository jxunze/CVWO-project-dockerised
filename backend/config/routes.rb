Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :users
  resources :comments
  resources :posts
  post "/login", to: "users#login"
  get '/profile', to: "users#user_profile"
  # get '/posts/:order/:search', to: "posts#index"

end
