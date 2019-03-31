class UserRoute < ApplicationRecord
  belongs_to :user
  belongs_to :route

  has_many :route_attempts

  def todo?
    route_attempts.empty?
  end

  def in_progress?
    !todo? && !completed?
  end

  def completed?
    route_attempts.where(success: true).any?
  end

  def serialize
    route.attributes.merge(
      in_progress: in_progress?,
      completed: completed?,
      todo: todo?,
      location: route.location.attributes
    )
  end
end
