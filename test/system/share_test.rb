# frozen_string_literal: true

require 'application_system_test_case'

class SocialSharingTest < ApplicationSystemTestCase
  setup do
    @user = users(:test_user1)
    @post = posts(:test_post1)
  end

  test 'share to x' do
    sign_in @user
    visit post_path(@post.public_uid)
    assert_equal "https://twitter.com/intent/tweet?text=#{ERB::Util.url_encode(@post.content)}%20#{ERB::Util.url_encode('#えらすぎ')}%0A#{post_url(@post)}",
                 find_by_id('x-share')['href']
  end

  test 'share to line' do
    sign_in @user
    visit post_path(@post.public_uid)
    assert_equal "https://social-plugins.line.me/lineit/share?url=#{post_url(@post)}", find_by_id('line-share')['href']
  end

  test 'copy url' do
    visit post_url(@post)
    find_by_id('url-copy').click
    assert_text 'URLをコピーしました'
  end
end
