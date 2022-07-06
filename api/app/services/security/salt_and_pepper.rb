##
# Simple Salter created just for "security" purposes,
# please don't use this for actual production projects

class Security::SaltAndPepper
  SALT = 'TOSALTYFORU'
  PEPPER = 'PEPPERMYDISH'

  class << self
    def encode(string)
      SALT + string + PEPPER
    end

    def decode(salted_pepper)
      salted_pepper.sub(to_regexp(SALT), '').sub(to_regexp(PEPPER), '')
    end

    private

    def to_regexp(string)
      Regexp.new(string)
    end
  end
end