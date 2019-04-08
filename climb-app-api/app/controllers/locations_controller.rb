class LocationsController < ApplicationController
  def index
    @locations = Location.all
    render json: @locations.to_json, status: :ok
  end
end
