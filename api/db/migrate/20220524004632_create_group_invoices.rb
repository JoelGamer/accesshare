class CreateGroupInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :group_invoices do |t|
      t.references :group, null: false, foreign_key: true
      t.references :group_user, null: false, foreign_key: true
      t.references :invoice, null: false, foreign_key: true

      t.timestamps
    end
  end
end
