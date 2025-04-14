# app/controllers/api/v1/users/sessions_controller.rb
class Api::V1::Users::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first

      render json: {
        message: 'ログイン成功',
        user: user,
        token: token
      }, status: :ok
    else
      render json: {
        message: 'ログインに失敗しました',
        errors: ['メールアドレスまたはパスワードが間違っています']
      }, status: :unauthorized
    end
  end
end
