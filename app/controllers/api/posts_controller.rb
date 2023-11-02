# frozen_string_literal: true

class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end
