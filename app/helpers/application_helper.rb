# frozen_string_literal: true

module ApplicationHelper
  def turbo_stream_flash
    turbo_stream.update 'flash', partial: 'layouts/flash'
  end
end
