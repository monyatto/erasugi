# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def after_sign_in_path_for(_resource)
    new_post_path
  end

  def after_sign_out_path_for(_resource_or_scope)
    new_post_path
  end
end
