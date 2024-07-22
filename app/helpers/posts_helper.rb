# frozen_string_literal: true

module PostsHelper
  def count_characters(post)
    content_length = post.content&.length.to_i
    content_length > Post::TEXT_LIMIT ? "#{content_length - Post::TEXT_LIMIT}文字オーバーです" : "残り#{Post::TEXT_LIMIT - content_length}文字入力できます"
  end
end
