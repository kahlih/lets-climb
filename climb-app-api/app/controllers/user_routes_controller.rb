class UserRoutesController < ApplicationController
  before_action :authorize_request

  def index
    @user_routes = UserRoute.where(user_id: @current_user.id)
    render json: @user_routes.map(&:serialize).to_json, status: :ok
  end
 
end
