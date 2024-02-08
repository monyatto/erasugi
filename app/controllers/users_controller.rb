# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[show edit update destroy]

  def show
    @user = User.find_by(public_uid: params[:id])
  end

  def edit; end

  def update; end

  def destroy; end

  private

  def set_user
    @user = User.find_by(public_uid: params[:id])
  end

  def correct_user
    redirect_to(root_url) unless current_user?(@user)
  end

  def current_user?(user)
    user == current_user
  end
end
