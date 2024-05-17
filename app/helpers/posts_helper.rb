# frozen_string_literal: true

module PostsHelper
  def count_characters(post)
    content_length = post.content&.length.to_i
    content_length > 60 ? "#{content_length - 60}文字オーバーです" : "残り#{60 - content_length}文字入力できます"
  end
end
