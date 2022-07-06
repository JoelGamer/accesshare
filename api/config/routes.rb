require 'sidekiq/web'
require 'sidekiq-scheduler/web'

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  mount Sidekiq::Web => '/sidekiq'

  resources :groups do
    resources :accounts do
      resources :accounts_password, only: %i[index create]
    end

    resources :group_invoices do
      post :paid, on: :member
    end

    resources :group_users, except: %i[update] do
      resources :permissions, except: %i[update], controller: :group_users_permissions
    end
  end

  resources :users, except: %i[index show] do
    get :me, on: :collection
    post :login, on: :collection
  end
end
