class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.float :price, null: false
      t.string :password_digest
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
