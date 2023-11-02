# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :reactions, dependent: :destroy
  POSTS_PER_PAGE = 20
end
