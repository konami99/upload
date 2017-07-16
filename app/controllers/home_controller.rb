class HomeController < ApplicationController
  def index
  end

  def upload
    require 'csv'
    unless uploaded_csv?
      render status: :bad_request, json: { response: "file is not format of csv" }
      return
    end

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

  private

  def uploaded_csv?
    params[:csv].content_type == "text/csv"
  end
end
