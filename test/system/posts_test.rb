# frozen_string_literal: true

require 'application_system_test_case'

class PostsTest < ApplicationSystemTestCase
  setup do
    @user = users(:test_user1)
    @post1 = posts(:test_post1)
    @post2 = posts(:test_post2)
  end

  test 'show post page' do
    sign_in @user
    visit post_path(@post1.public_uid)
    assert_text @post1.content
  end

  test 'show second post index page' do
    visit posts_path
    posts = { @post1.id => @post1.content, @post2.id => @post2.content }
    # 最初に表示された投稿のidを取得
    first_post_id = posts.key(find('.test-post-content').text)
    # postsから最初の投稿を除き、二番目の投稿のidを取得
    second_post_id, second_post_content = posts.delete_if { |key| key == first_post_id }.first

    find_by_id('swiper-button-next').click
    assert page.has_css?(".test-display-button-#{second_post_id}", wait: 10)
    assert_text second_post_content
  end

  test 'show user posts index page' do
    sign_in @user
    visit user_posts_path(@user.public_uid)
    assert_text @post1.content
    assert_no_text @post2.content
  end

  test 'create post' do
    visit new_post_path
    fill_in 'あたらしいえらすぎ', with: '投稿テスト'
    click_on '投稿する'
    assert_selector('#flash-message', text: 'えらすぎを投稿しました')
    assert_text '投稿テスト'
  end

  test 'update post' do
    sign_in @user
    visit user_posts_path(@user.public_uid)
    assert_no_text '編集後投稿'
    click_on 'edit-button'
    fill_in 'post_content', with: '編集後投稿'
    click_on '更新する'
    assert_selector('#flash-message', text: 'えらすぎを更新しました')
    assert_text '編集後投稿'
  end

  test 'delete post' do
    sign_in @user
    visit user_posts_path(@user.public_uid)
    assert_text 'テスト投稿1'
    accept_confirm do
      click_on 'delete-button'
    end
    assert_selector('#flash-message', text: 'えらすぎを削除しました')
    assert_no_text 'テスト投稿1'
  end
end
