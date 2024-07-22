# frozen_string_literal: true

class Users::PostsController < ApplicationController
  before_action :set_post, only: %i[edit update destroy]

  def index
    @posts = current_user.posts.order(created_at: :desc).page(params[:page])
  end

  def edit; end

  def update
    delete_ogp_image
    respond_to do |format|
      if @post.update(post_params)
        format.turbo_stream { flash.now[:notice] = 'えらすぎを更新しました' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
      create_ogp_image
    end
  end

  def destroy
    delete_ogp_image
    @post.destroy
    respond_to do |format|
      format.turbo_stream { flash.now[:notice] = 'えらすぎを削除しました' }
    end
  end

  private

  def set_post
    @post = current_user.posts.find_by!(public_uid: params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end

  def current_user?(user)
    user == current_user
  end

  def create_ogp_image
    @post.image.path
  end

  def delete_ogp_image
    path = "public/posts/#{@post.image.path}"
    FileUtils.rm_f(path)
  end
end
