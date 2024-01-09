# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], reactions_type_id: params[:reactions_type_id])
    return unless @reaction.save!

    respond_to do |format|
      format.js
    end
  end
end
