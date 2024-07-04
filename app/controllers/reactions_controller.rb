# frozen_string_literal: true

class ReactionsController < PublicApplicationController
  def create
    @post = Post.find(params[:post_id])
    @reaction = @post.reactions.create!
  end
end
