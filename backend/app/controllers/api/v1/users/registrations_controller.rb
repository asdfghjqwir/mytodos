class Api::V1::Users::RegistrationsController < ApplicationController
respond_to :json

skip_before_action :authenticate_user!, only: [:create]

def create
  user=User.new(sign_up_params)
  if user.save
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first

    
    render json: {
    status: {code: 200, message: 'Signed up successfully.'},
    data: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      jti: user.jti,
      token: token
    }
  }, status: :ok
else
  render json: {
    status: { code: 422, message: "User couldn't be created successfully."},
    errors: resource.errors.full_messages
  } ,status: :unprocessable_entity
end
end

private

def sign_up_params
  params.require(:user).permit(:email,:password, :password_confirmation)
end
end
