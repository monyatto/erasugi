# frozen_string_literal: true

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  def setup
    @post = posts(:test_post1)
  end

  test 'to_param' do
    assert_equal @post.public_uid, @post.to_param
  end

  test '#reactions_count' do
    assert_equal 0, @post.reactions_count
    @post.reactions.create
    assert_equal 1, @post.reactions_count
  end
end
