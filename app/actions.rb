# Homepage (Root path)
get '/' do
  puts "index"
  erb :index
end

get '/contacts' do
  content_type :json
  @contacts = Contact.all
  @contacts.to_json

end

post '/contacts' do

  content_type :json
  firstname = params[:firstname]
  lastname = params[:lastname]
  email = params[:email]
  @contact = Contact.new(firstname: firstname, lastname: lastname, email: email)

  if @contact.save
    @contact.to_json
  end

end

get '/contacts/:id' do

end

get '/search' do
  # binding.pry
  content_type :json
  gen = params[:gen]
  @contacts = Contact.gen(gen)
  

  @contacts.to_json

end

delete '/contacts/:id' do
  # binding.pry
  content_type :json
  id = params[:id]
  Contact.find(id).destroy
  {success: true}.to_json
end