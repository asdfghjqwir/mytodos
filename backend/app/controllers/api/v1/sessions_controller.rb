class Api::V1::SessionsController < ApplicationController

  def create
    user=User.find_by(email: params[:user][:email])

    if user&.authenticate(params[:user][:password])
      payload={user_id: user.id}
      token= JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
      render json: {token: token, user: user},status: :ok
    else
      render json: { errors: ['メールアドレスまたはパスワードが無効です']},status: :unauthorized
end
end
end
