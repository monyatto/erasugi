# frozen_string_literal: true

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  def setup
    @post = posts(:test_post1)
  end

  test 'to_param' do
    assert_equal @post.public_uid, @post.to_param
  end

  test '#associated_reaction_type_ids' do
    reactions_type_ids = [1, 2, 3].cycle.take(101)
    reactions_type_ids.each do |id|
      @post.reactions.create(reactions_type_id: id)
    end

    assert_equal reactions_type_ids.reverse.shift(100), @post.associated_reaction_type_ids,
                 'Expected the last 100 reaction type IDs in reverse order, but got a different result.'
  end
end
