# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:test_user1)
  end

  test 'to_param' do
    assert_equal @user.public_uid, @user.to_param
  end

  test 'guest user is created if not exists' do
    user =
      assert_difference 'User.count', 1 do
        User.guest
      end
    assert_equal 'guest@guest.mail', user.email
  end

  test 'existing guest user is returned if exists' do
    User.create!(email: 'guest@guest.mail', name: 'ゲストユーザー', password: 'password')
    user =
      assert_no_difference 'User.count' do
        User.guest
      end
    assert_equal 'guest@guest.mail', user.email
  end
end
