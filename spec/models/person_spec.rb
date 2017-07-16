require 'rails_helper'

RSpec.describe Person, type: :model do
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :birthday }
  it { is_expected.to validate_presence_of :number }
  it { is_expected.to validate_presence_of :description }
end
