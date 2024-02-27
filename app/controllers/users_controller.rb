# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[show edit update destroy]

  def show; end

  def edit; end

  def update; end

  def destroy; end

  private

  def set_user
    @user = User.find_by(public_uid: params[:id])
  end

  def correct_user
    if current_user.nil?
      redirect_to(new_user_session_path)
    elsif !current_user?(@user)
      render file: Rails.public_path.join('404.html'), status: :not_found, layout: false, content_type: 'text/html'
    end
  end

  def current_user?(user)
    user == current_user
  end
end
