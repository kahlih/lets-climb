class Route < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  belongs_to :location
  has_many :routes_attempts
end
