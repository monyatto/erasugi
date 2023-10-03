# frozen_string_literal: true

class Users::PostsController < ApplicationController
  before_action :correct_user, only: [:index]
  def index
    @posts = current_user.posts
  end

  private

  def correct_user
    @user = User.find(params[:user_id])
    redirect_to(posts_path) unless current_user?(@user)
  end

  def current_user?(user)
    user == current_user
  end
end
