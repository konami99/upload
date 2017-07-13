class PeopleController < ApplicationController
  def index
    @people = Person.all.order(name: :asc)
  end
end
