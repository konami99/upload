json.array! @people do |person|
  json.id person.id
  json.name person.name
  json.birthday person.birthday
  json.number person.number
  json.description person.description
end
