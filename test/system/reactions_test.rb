# frozen_string_literal: true

require 'application_system_test_case'

class ReactionsTest < ApplicationSystemTestCase
  setup do
    @first_post = posts(:test_post1)
    @second_post = Post.last
    ActionController::Base.allow_forgery_protection = true
  end

  teardown do
    ActionController::Base.allow_forgery_protection = false
  end

  test 'create reaction in show page' do
    visit post_path(@first_post.public_uid)
    assert_difference '@first_post.reactions_count' do
      find_by_id('loaded', wait: 10)
      click_on 'えらい'
      find_by_id('on', wait: 10)
    end
  end

  test 'create reaction in index page' do
    visit posts_path
    assert_difference '@second_post.reactions_count' do
      find_by_id('loaded', wait: 10)
      click_on 'えらい'
      find_by_id('on', wait: 10)
    end
  end
end
