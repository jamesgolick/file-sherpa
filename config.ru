require 'sinatra'

set :public, "."

post "/upload" do
  puts "File uploaded: " + params[:fileData][:filename]
  "{hello: true}"
end

run Sinatra::Application
