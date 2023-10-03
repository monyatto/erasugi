# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], reactions_type_id: params[:reactions_type_id])
    redirect_to post_path(params[:post_id]) if @reaction.save!
  end

  # def destroy
  #   @reaction = Reaction.find_by(post_id: params[:post_id], reactions_types_id: params[:reactions_types_id])
  #   @reaction.destroy
  #   redirect_to post_path(params[:post_id])
  # end
end
