class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :fix_nested_user_params, only: [:create]

  private

  def fix_nested_user_params
    if params[:registration] && params[:registration][:user]
      params[:user] = params[:registration][:user]
    end
  end



  def respond_with(resource, _opts = {})
  if resource.persisted?
    render json: {
      message: 'ユーザー登録成功',
      user: resource,
      token: request.env['warden-jwt_auth.token']
    }, status: :ok
  else
     Rails.logger.error "❌ ユーザー登録エラー: #{resource.errors.full_messages.join(', ')}"
    
    render json: {
      message: 'ユーザー登録に失敗しました',
      errors: resource.errors.full_messages
    }, status: :unprocessable_entity
  end
end


  def respond_to_on_destroy
    head :no_content
  end
end

