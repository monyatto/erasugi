# frozen_string_literal: true

require 'application_system_test_case'

class ReactionsTest < ApplicationSystemTestCase
  setup do
    @post = posts(:test_post1)
    @reaction_type = reactions_types(:test_reactions_type1)
    ActionController::Base.allow_forgery_protection = true
  end

  teardown do
    ActionController::Base.allow_forgery_protection = false
  end

  test 'create reaction' do
    visit post_path(@post.public_uid)
    assert_difference '@post.reactions.count' do
      find_by_id('loaded', wait: 10)
      click_on @reaction_type.name
      find_by_id('button-on', wait: 10)
    end
  end
end
