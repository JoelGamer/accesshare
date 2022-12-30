class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.float :price
      t.datetime :paid_in
      t.datetime :expires_in

      t.references :group, null: false, foreign_key: true
      t.references :group_user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
