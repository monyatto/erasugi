class CreateReactionsTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions_types do |t|
      t.string :name, null:false
      t.string :image, null:false

      t.timestamps
    end
  end
end
