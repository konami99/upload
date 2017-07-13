class HomeController < ApplicationController
  def index
  end

  def upload
    params[:csv].tempfile.read.each_line do |line|

    end
  end

  private

  def task_params
    binding.pry
    params.permit(:myfile)
  end
end
