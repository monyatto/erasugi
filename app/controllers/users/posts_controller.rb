# frozen_string_literal: true

class Users::PostsController < ApplicationController
  before_action :set_post, only: %i[edit update destroy]
  before_action :correct_user, only: %i[index update edit destroy]

  def index
    @posts = current_user.posts.order(created_at: :desc).page(params[:page])
  end

  def edit; end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.turbo_stream { flash.now[:notice] = 'えらすぎを更新しました' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.turbo_stream { flash.now[:notice] = 'えらすぎを削除しました' }
    end
  end

  private

  def set_post
    @post = Post.find_by(public_uid: params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end

  def correct_user
    @user = User.find_by(public_uid: params[:user_id])

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
