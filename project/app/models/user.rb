class User < ApplicationRecord
  has_secure_password
  validates :login, presence: true, length: { minimum: 3, maximum: 20 }, uniqueness: true
end
