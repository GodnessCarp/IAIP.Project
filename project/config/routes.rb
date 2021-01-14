Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      match "auth/register", via: %i[post get], as: :register
      match "auth/login", via: %i[post get], as: :login
      get "auth/logout", as: :logout
      get "auth/login", to: "auth#login"
      get "auth/register", to: "auth#register"
      #get "auth/logout", to: "auth#logout"
      resources :users
      get "products/index"
      post "products/create"
      post "edit/:id", to: "products#edit"
      get "show/:id", to: "products#show"
      delete "/destroy/:id", to: "products#destroy"
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
