class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
 
 
  def create
    user = User.new(sign_up_params)

    if user.save
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
 
      render json: {
        message: 'ユーザー登録成功',
        user: user,
        token: token
      }, status: :ok
    else
      Rails.logger.error "❌ ユーザー登録エラー: #{user.errors.full_messages.join(', ')}"
      render json: {
        message: 'ユーザー登録に失敗しました',
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
