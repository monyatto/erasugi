# frozen_string_literal: true

require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include Devise::Test::IntegrationHelpers
  if ENV['HEADED']
    driven_by :selenium, using: :chrome, screen_size: [1400, 1400]
  else
    driven_by(:selenium, using: :headless_chrome) do |driver_option|
      driver_option.add_argument('--no-sandbox')
      driver_option.add_argument('--disable-dev-shm-usage')
    end
  end
end
