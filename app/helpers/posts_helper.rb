# frozen_string_literal: true

module PostsHelper
  def form_character_count(post)
    content_length = post.content&.length.to_i
    content_length > 140 ? "#{content_length - 140}文字オーバーです" : "残り#{140 - content_length}文字入力できます"
  end
end
