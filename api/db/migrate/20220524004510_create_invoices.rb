class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.float :price
      t.datetime :paid_in
      t.datetime :expires_in

      t.timestamps
    end
  end
end
