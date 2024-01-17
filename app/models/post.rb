# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :reactions, dependent: :destroy
  POSTS_PER_PAGE = 20

  generate_public_uid generator: PublicUid::Generators::HexStringSecureRandom.new(20)

  def to_param
    public_uid
  end

  def associated_reaction_type_ids
    reactions.includes(:reactions_type).order(created_at: :desc).limit(100).sort_by(&:created_at).map do |reaction|
      reaction.reactions_type.id
    end
  end
end
