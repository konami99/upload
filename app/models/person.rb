class Person < ApplicationRecord
  validates :name, :birthday, :number, :description, presence: true
end
