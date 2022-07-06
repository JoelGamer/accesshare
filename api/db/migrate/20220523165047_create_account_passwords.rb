class CreateAccountPasswords < ActiveRecord::Migration[7.0]
  def change
    create_table :account_passwords do |t|
      t.string :password
      t.datetime :public_until
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
