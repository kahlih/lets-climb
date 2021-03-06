Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :user_routes, only: [:index, :create]
  resources :route_attempts, only: [:create]
  resources :locations, only: [:index]

  post '/auth/login', to: 'authentication#login'
  get '/*a', to: 'application#not_found'
end
