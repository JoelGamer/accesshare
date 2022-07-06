class DateHelpers
  class << self
    def first_day_of_month(date)
      Date.new(date.year, date.month).to_time
    end
  
    def last_day_of_month(date)
      date_class = Date.new(date.year, date.month, -1)
      date_class.to_time.end_of_month
    end
  end
end