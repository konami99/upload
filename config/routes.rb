Rails.application.routes.draw do
  resources :people, only: [:index]

  post "/upload", to: "home#upload"

  root "home#index"
end
