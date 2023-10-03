# frozen_string_literal: true

class Reaction < ApplicationRecord
  belongs_to :post
  belongs_to :reactions_type
end
