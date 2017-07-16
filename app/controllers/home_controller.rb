class HomeController < ApplicationController
  def index
  end

  def upload
    require 'csv'
    CSV.foreach(params[:csv].tempfile) do |line|
      next if line[0] == "name"
      Person.create \
        name: line[0],
        birthday: line[1],
        number: line[2],
        description: line[3]
    end

    head :ok
  end
end
