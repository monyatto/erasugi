# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    # ログイン後に遷移するpathを設定
  end

  def after_sign_out_path_for(resource)
    # ログアウト後に遷移するpathを設定
  end
end
