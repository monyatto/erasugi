# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @reaction = @post.reactions.create!(post_id: params[:post_id])
  end
end
