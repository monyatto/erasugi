# frozen_string_literal: true

require 'application_system_test_case'

class SocialSharingTest < ApplicationSystemTestCase
  setup do
    @user = users(:test_user1)
    @post1 = posts(:test_post1)
  end

  test 'share to x' do
    sign_in @user
    visit post_path(@post1.public_uid)
    find('#x-share').click

    switch_to_window(windows.last)
    assert_equal current_url, "https://twitter.com/intent/tweet?text=#{ERB::Util.url_encode(@post1.content)}%20#{post_url(@post1)}%20%E3%81%88%E3%82%89%E3%81%99%E3%81%8E"
  end
end
