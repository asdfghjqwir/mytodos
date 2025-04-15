class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_secure_password
  has_many :todos, dependent: :destroy

  validates :email, presence: true, uniqueness: true
end
