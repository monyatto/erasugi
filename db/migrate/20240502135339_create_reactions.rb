class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :post, null: false, foreign_key: true
      t.datetime :created_at, null: false
    end
  end
end
