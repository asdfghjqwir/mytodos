class ApplicationController < ActionController::API
  
  include ActionController::MimeResponds
  respond_to :json

  def current_user
    current_api_v1_user
  end
end