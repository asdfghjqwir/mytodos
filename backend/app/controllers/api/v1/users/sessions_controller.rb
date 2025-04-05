class Api::V1::Users::SessionsController < ApplicationController

respond_to :json

skip_before_action :authenticate_user!, only: [:create]

def create
  user=User.find_by(email: params[:user][:email])

  if user && user.valid_password?(params[:user][:password])
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first

    render json: {
      status: {code: 200, message: 'Logged in successfully.'},
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
    status: {code: 401, message: 'Login failed. Invalid credentials.'}
  },status: :unauthorized
end
end

def destroy
  render json: { message: "Logged out successfully" }, status: :ok
end
end































