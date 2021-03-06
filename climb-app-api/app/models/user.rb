class User < ApplicationRecord
  # Adds methods to set and authenticate against a BCrypt password
  # This mechanism requires you to have a password_digest attribute
  # password_digest is generated by encrypting user passwords by hashing and salting w/ bcrypt gem
  # provides authenticate method
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
end
