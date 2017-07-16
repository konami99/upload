FactoryGirl.define do
  factory :person do
    name { Faker::Name.first_name }
    birthday { Faker::Date.birthday }
    number { Faker::Number.number(2) }
    description { Faker::Lorem.paragraph }
  end
end
