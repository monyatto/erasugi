# frozen_string_literal: true

require 'application_system_test_case'

class TopTest < ApplicationSystemTestCase
  test 'visiting terms of service' do
    visit root_url

    assert_no_text 'この利用規約（以下、「本規約」といいます。）は'
    click_on '利用規約'

    assert_text 'この利用規約（以下、「本規約」といいます。）は'
  end

  test 'visiting privacy policy' do
    visit root_url

    assert_no_text 'このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における'
    click_on 'プライバシーポリシー'

    assert_text 'このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における'
  end
end
