# frozen_string_literal: true

require 'test_helper'

class PostsHelperTest < ActionView::TestCase
  include PostsHelper

  def setup
    @post = Post.new
  end

  test 'should return remaining characters count when post content length is less than or equal to 140' do
    @post.content = 'a' * 130

    assert_equal '残り10文字入力できます', form_character_count(@post)
  end

  test 'should return over characters count when post content length is more than 140' do
    @post.content = 'a' * 150

    assert_equal '10文字オーバーです', form_character_count(@post)
  end
end
