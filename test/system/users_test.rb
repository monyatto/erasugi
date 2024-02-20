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

  test 'create user' do
    visit new_user_registration_path
    fill_in 'Eメール', with: 'test3@example.com'
    fill_in 'ユーザー名', with: 'テスト三郎'
    fill_in 'パスワード ※6文字以上', with: 'password'
    fill_in 'パスワード（確認用）', with: 'password'
    click_on '登録する'

    assert_current_path root_path
    assert_selector('#flash-message', text: 'アカウント登録が完了しました')
  end

  test 'destroy user' do
    user = users(:test_user1)
    sign_in user
    visit edit_user_registration_path(user.id)
    accept_alert do
      click_on 'アカウントを削除する'
    end

    assert_current_path root_path
    assert_selector('#flash-message', text: 'アカウントを削除しました')
  end
end
