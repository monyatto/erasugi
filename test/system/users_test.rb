# frozen_string_literal: true

require 'application_system_test_case'

class UsersTest < ApplicationSystemTestCase
  test 'can login' do
    visit new_user_session_path
    fill_in 'Eメール', with: 'test1@example.com'
    fill_in 'パスワード', with: 'password'
    click_on 'ログイン'

    assert_current_path root_path
    assert_selector('#flash-message', text: 'ログインしました')
  end

  test 'can logout' do
    user = users(:test_user1)
    sign_in user
    visit user_posts_path(user.id)
    find('.dropdown').click
    click_link 'ログアウト'

    assert_current_path root_path
    assert_selector('#flash-message', text: 'ログアウトしました')
  end
end
