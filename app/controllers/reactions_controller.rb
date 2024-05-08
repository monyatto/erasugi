# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], created_at: params[:created_at])
    nil unless @reaction.save!
  end
end
