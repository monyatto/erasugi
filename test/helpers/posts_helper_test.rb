# frozen_string_literal: true

require 'test_helper'

class PostsHelperTest < ActionView::TestCase
  include PostsHelper

  def setup
    @post = Post.new
  end

  test 'should return remaining characters count when post content length is less than or equal to 60' do
    @post.content = 'a' * 50

    assert_equal '残り10文字入力できます', count_characters(@post)
  end

  test 'should return over characters count when post content length is more than 60' do
    @post.content = 'a' * 70

    assert_equal '10文字オーバーです', count_characters(@post)
  end
end
