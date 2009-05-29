require 'sinatra'

set :public, "."

post "/upload" do
  puts "File uploaded: " + params[:fileData][:filename]
end

run Sinatra::Application
