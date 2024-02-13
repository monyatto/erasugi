# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  has_many :posts, dependent: :destroy

  validates :name,
            presence: true,
            length: { maximum: 10 }

  generate_public_uid generator: PublicUid::Generators::HexStringSecureRandom.new(20)

  def to_param
    public_uid
  end
end
