# frozen_string_literal: true

class Users::PostsController < ApplicationController
  before_action :correct_user, only: %i[index]

  def index
    @posts = current_user.posts.order(created_at: :desc)
  end

  private

  def correct_user
    @user = User.find_by(public_uid: params[:user_id])
    redirect_to(root_url) unless current_user?(@user)
  end

  def current_user?(user)
    user == current_user
  end
end
