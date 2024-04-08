# frozen_string_literal: true

require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
  include ApplicationHelper

  def test_full_title_without_page_title
    assert_equal 'えらすぎ', full_title('')
  end

  def test_full_title_with_page_title
    assert_equal 'テスト | えらすぎ', full_title('テスト')
  end
end
