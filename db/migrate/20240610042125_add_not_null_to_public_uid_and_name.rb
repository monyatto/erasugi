class AddNotNullToPublicUidAndName < ActiveRecord::Migration[7.0]
  def change
    change_column_null :posts, :public_uid, false
    change_column_null :users, :public_uid, false
    change_column_null :users, :name, false
  end
end
