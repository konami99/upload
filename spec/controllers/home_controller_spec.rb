require "rails_helper"

RSpec.describe HomeController do
  it "create person records" do
    upload = ActionDispatch::Http::UploadedFile.new({
      tempfile: File.new("#{Rails.root}/spec/controllers/sentia-coding-test-file.csv")
    })
    allow(controller).to receive(:params).and_return({csv: upload})
    expect{
      post :upload
    }.to change(Person, :count).by(20)
  end
end
