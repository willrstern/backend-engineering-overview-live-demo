require 'sinatra'

# Using Sinatra microframework for Ruby
get '/' do
  'Hello world!'
end

get '/hello/:name' do
  "Hello #{params['name']}!"
end