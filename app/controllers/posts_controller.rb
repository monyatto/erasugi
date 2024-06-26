# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.where(created_at: 1.week.ago..).order('RANDOM()').limit(10)
  end

  # GET /posts/1 or /posts/1.json
  def show; end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit; end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user ? current_user.id : User.guest.id
    respond_to do |format|
      if @post.save
        format.html { redirect_to post_url(@post), notice: 'えらすぎを投稿しました' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.turbo_stream { flash.now[:notice] = 'えらすぎを更新しました' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.turbo_stream { flash.now[:notice] = 'えらすぎを削除しました' }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find_by(public_uid: params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:content, :user_id, :public_uid)
  end

  def correct_user
    @user = User.find_by(public_uid: @post.user.public_uid)
    redirect_to(root_url) unless current_user?(@user)
  end

  def current_user?(user)
    user == current_user
  end
end
