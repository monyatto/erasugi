# frozen_string_literal: true

require 'application_system_test_case'

class UsersTest < ApplicationSystemTestCase
  setup do
    @user = users(:test_user1)
  end

  test 'can login' do
    visit new_user_session_path
    fill_in 'Eメール', with: 'test1@example.com'
    fill_in 'パスワード', with: 'password'
    click_on 'ログイン'
    assert_selector('#flash-message', text: 'ログインしました')
  end

  test 'can logout' do
    sign_in @user
    visit root_path
    find('.hamburger').click
    click_on 'ログアウト'
    assert_selector('#flash-message', text: 'ログアウトしました')
  end

  test 'show user page' do
    sign_in @user
    visit root_path
    find('.hamburger').click
    click_on '登録情報'
    assert_text @user.email.to_s
    assert_text @user.name.to_s
  end

  test 'create user' do
    visit new_user_registration_path
    fill_in 'Eメール', with: 'test3@example.com'
    fill_in 'ユーザー名', with: 'テスト三郎'
    fill_in 'パスワード ※6文字以上', with: 'password'
    fill_in 'パスワード（確認用）', with: 'password'
    click_on '登録する'
    assert_selector('#flash-message', text: 'アカウント登録が完了しました')
  end

  test 'update user' do
    sign_in @user
    visit edit_user_registration_path
    fill_in 'Eメール', with: 'change@example.com'
    fill_in 'ユーザー名', with: 'テスト変更'
    fill_in '現在のパスワード ※必須', with: 'password'
    click_on '更新する'
    assert_selector('#flash-message', text: 'アカウント情報を変更しました')

    visit user_path(@user.public_uid)
    assert_text 'change@example.com'
    assert_text 'テスト変更'
  end

  test 'delete user' do
    sign_in @user
    visit edit_user_registration_path
    accept_confirm do
      click_on 'アカウントを削除する'
    end
    assert_selector('#flash-message', text: 'アカウントを削除しました')
  end
end
