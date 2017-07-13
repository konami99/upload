class PeopleController < ApplicationController
  def index
    Person.all
  end
end
