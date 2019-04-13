class RouteAttemptsController < ApplicationController
  before_action :authorize_request

  def create
    @route_attempt = RouteAttempt.new(route_attempt_params)
    if @route_attempt.valid?
      @route_attempt.save
      render json: @route_attempt.to_json, status: :ok
    else
      render json: { errors: @route_attempt.errors.full_messages }, status: :unprocessable_entity
    end

  end

  private

  def route_attempt_params
    user_route = UserRoute.where(user_id: @current_user.id, route_id: params[:route_attempt][:route_id]).take
    return unless user_route
    params.require(:route_attempt).permit(:summary, :recorded_at, :success).merge(user_route_id: user_route.id)
  end

end
