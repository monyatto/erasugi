# frozen_string_literal: true

require 'application_system_test_case'

class ReactionsTest < ApplicationSystemTestCase
  setup do
    @post = posts(:test_post1)
    ActionController::Base.allow_forgery_protection = true
  end

  teardown do
    ActionController::Base.allow_forgery_protection = false
  end

  # test 'create reaction' do
  #   visit post_path(@post.public_uid)
  #   assert_difference '@post.reactions_count' do
  #     find_by_id('loaded', wait: 10)
  #     click_on 'えらい'
  #     find_by_id('button-on', wait: 10)
  #   end
  # end
end
