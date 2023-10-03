# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], reactions_type_id: params[:reactions_type_id])
    redirect_to post_path(params[:post_id]) if @reaction.save!
  end
end
