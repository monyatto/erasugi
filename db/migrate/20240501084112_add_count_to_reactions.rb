class AddCountToReactions < ActiveRecord::Migration[7.0]
  def change
    add_column :reactions, :count, :integer, default: 0
  end
end
