# frozen_string_literal: true

class Post < ApplicationRecord
  delegate :path, to: :image, prefix: true
  belongs_to :user
  has_many :reactions, dependent: :destroy

  validates :content,
            presence: true,
            length: { maximum: 60 }

  POSTS_PER_PAGE = 20

  generate_public_uid generator: PublicUid::Generators::HexStringSecureRandom.new(20)

  def to_param
    public_uid
  end

  delegate :count, to: :reactions, prefix: true

  def image
    @image ||= Post::Image.new(self)
  end
end
