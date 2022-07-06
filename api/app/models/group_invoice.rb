class GroupInvoice < ApplicationRecord
  belongs_to :group
  belongs_to :group_user
  belongs_to :invoice

  scope :by_user, ->(group_user) { where(group_user: group_user) }
  scope :by_month, ->(date) { joins(:invoice).where(invoice: { expires_in: DateHelpers.first_day_of_month(date).. }).where(invoice: { expires_in: ..DateHelpers.last_day_of_month(date) }) }
  scope :by_pending, ->() { joins(:invoice).where(invoice: { paid_in: nil }) }
  scope :by_paid, ->() { joins(:invoice).where.not(invoice: { paid_in: nil }) }
end
