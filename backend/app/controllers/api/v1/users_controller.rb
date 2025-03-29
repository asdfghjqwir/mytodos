class Api::V1::UsersController < ApplicationController

  def create
    user=User.new(user_params)
    if user.save
      render json: { message: 'ユーザー登録成功',user: user },status: created
    else
      render json: { errors: user.errors.full_messages }, status: unprocessable_entiry
    end
end

private

def user_params
  params.require(:user).permit(:email, :password_confirmation)
end
end
