class Invoice::GenerateInvoiceJob
  include Sidekiq::Job

  def perform(*args)
    GroupUser.all.each do |group_user|
      return unless GroupInvoice.by_month(Date.today).by_user(group_user).empty?

      group_user.accounts.map do |account|
        users = account.group_user_permissions.count
        invoice = Invoice.create!(price: account.price / users, expires_in: invoice_expires_in(account.created_at))
        GroupInvoice.create!(group_user: group_user, group: group_user.group, invoice: invoice)
      end
    end
  end

  private

  def invoice_expires_in(account_creation)
    Date.today.change(day: account_creation.day)
  end
end
