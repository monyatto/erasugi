# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:test_user1)
  end

  test 'to_param' do
    assert_equal @user.public_uid, @user.to_param
  end
end
