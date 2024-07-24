# frozen_string_literal: true

class PostsController < PublicApplicationController
  def index
    @posts = Post.order(created_at: :desc).limit(100).order('RANDOM()').limit(10)
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

  def ogp_image
    @post = Post.find_by!(public_uid: params[:id])
    image_path = generate_image_path(@post)
    @post.image.create_ogp(image_path) unless File.exist?(image_path)
    send_file image_path, type: 'image/png', disposition: 'inline'
  end

  private

  def post_params
    params.require(:post).permit(:content, :user_id, :public_uid)
  end

  def current_user?(user)
    user == current_user
  end

  def generate_image_path(post)
    Rails.root.join('tmp', 'ogp_image', "#{post.public_uid}_#{post.updated_at.to_i}.png").to_s
  end
end
