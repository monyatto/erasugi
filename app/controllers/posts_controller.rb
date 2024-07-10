# frozen_string_literal: true

class PostsController < PublicApplicationController
  def index
    @posts = Post.where(created_at: 1.week.ago..).order('RANDOM()').limit(10)
  end

  def show
    @post = Post.find_by!(public_uid: params[:id])
  end

  def new
    @post = Post.new
  end

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

  private

  def post_params
    params.require(:post).permit(:content, :user_id, :public_uid)
  end

  def current_user?(user)
    user == current_user
  end
end
