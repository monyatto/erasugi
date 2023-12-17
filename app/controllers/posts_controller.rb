# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
    @reactions_types = ReactionsType.all
  end

  # GET /posts/1 or /posts/1.json
  def show
    @reactions_types = ReactionsType.all
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit; end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @reactions_types = ReactionsType.all
    respond_to do |format|
      if @post.save
        # format.turbo_stream { flash.now[:notice] = '投稿成功時のメッセージ' }
        format.html { redirect_to post_url(@post), notice: 'えらすぎを投稿しました' }
        # redirect_to post_path(@post), notice: 'ねこを登録しました。'
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.turbo_stream { flash.now[:notice] = 'えらすぎを編集しました' }
        redirect_to post_url(@posts)
        # format.html { redirect_to post_url(@post), notice: 'えらすぎを編集しました' }
        # format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.turbo_stream { flash.now[:notice] = 'えらすぎを削除しました' }
      format.html { redirect_to user_posts_path(current_user), notice: 'えらすぎを削除しました' }
      format.json { head :no_content }
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
end
