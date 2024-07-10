# frozen_string_literal: true

class PublicApplicationController < ApplicationController
  skip_before_action :authenticate_user!
end
