# frozen_string_literal: true

class ReactionsType < ApplicationRecord
  has_many :reactions, dependent: :destroy
end
