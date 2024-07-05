# frozen_string_literal: true

require 'application_system_test_case'

class ReactionsTest < ApplicationSystemTestCase
  setup do
    @post1 = posts(:test_post1)
    @post2 = Post.last
    ActionController::Base.allow_forgery_protection = true
  end

  teardown do
    ActionController::Base.allow_forgery_protection = false
  end

  test 'create reaction in show page' do
    visit post_path(@post1.public_uid)
    assert_difference '@post1.reactions_count' do
      assert page.has_css?(".test-display-button-#{@post1.id}", wait: 10)
      click_on 'えらい'
      assert page.has_css?(".test-clicked-button-#{@post1.id}", wait: 10)
    end
  end

  test 'create reaction on first post in index page' do
    visit posts_path
    posts = { @post1.id => @post1.content, @post2.id => @post2.content }
    # 最初に表示された投稿のidを取得
    first_post_id = posts.key(find('.test-post-content').text)

    assert_difference 'Post.find(first_post_id).reactions_count' do
      assert page.has_css?(".test-display-button-#{first_post_id}", wait: 10)
      click_on 'えらい'
      assert page.has_css?(".test-clicked-button-#{first_post_id}", wait: 10)
    end
  end

  test 'create reaction on second post in index page' do
    visit posts_path
    posts = { @post1.id => @post1.content, @post2.id => @post2.content }
    # 最初に表示された投稿のidを取得
    first_post_id =  posts.key(find('.test-post-content').text)
    # postsから最初の投稿を除き、二番目の投稿のidを取得
    second_post_id = posts.delete_if { |key| key == first_post_id }.keys.first

    find_by_id('swiper-button-next').click

    assert_difference '(Post.find(second_post_id)).reactions_count' do
      assert page.has_css?(".test-display-button-#{second_post_id}", wait: 10)
      click_on('えらい')
      assert page.has_css?(".test-clicked-button-#{second_post_id}", wait: 10)
    end
  end
end
