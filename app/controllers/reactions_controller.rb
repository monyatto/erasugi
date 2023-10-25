# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], reactions_type_id: params[:reactions_type_id])
    return unless @reaction.save!

    respond_to do |format|
      format.turbo_stream
      format.html { post_path(params[:post_id]) }
    end
  end
end
