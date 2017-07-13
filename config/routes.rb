Rails.application.routes.draw do
  root "home#index"

  post "/upload", to: "home#upload"
end
