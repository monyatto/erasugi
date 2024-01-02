# frozen_string_literal: true

class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(post_id: params[:post_id], reactions_type_id: params[:reactions_type_id])
    nil unless @reaction.save!

    # リアクションを押したら、サーバーに教えてサーバーからjsに伝える
    #     # respond_to do |format|
    #     #   format.js { render js: 'window.dispatchEvent(new CustomEvent("reaction-saved"))' } if @reaction.save
    #     # end
  end
end
