class CreateAccountAccesses < ActiveRecord::Migration[7.0]
  def change
    create_table :account_accesses do |t|
      t.references :account, null: false, foreign_key: true
      t.references :group_user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
