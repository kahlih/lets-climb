class UserRoutesController < ApplicationController
  before_action :authorize_request

  def index
    @user_routes = UserRoute.where(user_id: @current_user.id)
    render json: @user_routes.map(&:serialize).to_json, status: :ok
  end

  # refactor so that users can look for a list of routes in db
  # instead of creating a new one every time
  def create
    @route = Route.new(route_params)
    if @route.valid?
      @route.save
      @user_route = UserRoute.create(user_id: @current_user.id, route_id: @route.id)
      render json: @user_route.serialize.to_json, status: :ok
    else
      render json: { errors: @route.errors.full_messages }, status: :unprocessable_entity
    end

  end

  private

  def route_params
    params.require(:route).permit(:name, :description, :type, :difficulty, :location_id)
  end

end
