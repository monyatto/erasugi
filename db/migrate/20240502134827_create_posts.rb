class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :content, null: false
      t.bigint :user_id, null: false, foreign_key: true
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.string :public_uid

      t.index :user_id, name: "index_posts_on_user_id"
      t.index :public_uid, unique: true
    end
  end
end
