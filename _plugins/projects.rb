require 'open-uri'
require 'fileutils'
require 'liquid'

url = "https://script.google.com/macros/s/AKfycbxfAjId0Q2x3vED8GklxP8tJD6QZVoks3qIP8T3RN0c5fLT5xoaQINKxHsQ2mSLkzv_bQ/exec?sheetName=dt"
json_data = JSON.parse(URI.open(url).read)

# Transform the data to the desired format
transformed_data = json_data.map do |row|
  [
    row[0], # title
    row[1].slice(0, 10), # date
    row[2].downcase.gsub(' ', '-'), # Category
    row[3], # Description
    row[4].split("\n").map { |tag| tag.downcase.gsub(' ', '-') }, # Tag
    row[5], # main Image
    row[6], # heading h2
    row[7].split("\n"), # description 
    row[8].split("\n"), # image gallery
    row[9].split("\n"), # 2nd description
    row[10].split("\n"), # 2nd Image Gallery
    row[11].split("\n") # 3rd description
  ]
end

# Save the transformed data to a JSON file
File.open('_data/data.json', 'w') do |file|
  file.write(JSON.pretty_generate(transformed_data))
end

# Create a directory for posts
posts_directory = '_posts'
FileUtils.rm_rf(posts_directory) if File.directory?(posts_directory)
Dir.mkdir(posts_directory)

# Load Jekyll data if available (example: menu.yml or menu.json)
jekyll_data = {}
jekyll_data['menu'] = YAML.load_file('_data/menu.yml') if File.exist?('_data/menu.yml')
jekyll_data['menu'] = JSON.parse(File.read('_data/menu.json')) if File.exist?('_data/menu.json')

# Load the template content
template_content = File.read('_layouts/posts.html')
template = Liquid::Template.parse(template_content)

# Generate HTML files based on criteria
transformed_data.each do |data|
  filename = "#{data[1]}-#{data[0]}.html".downcase.gsub(' ', '-')
  rendered_content = template.render('data' => data, 'jekyll' => jekyll_data)
  File.open("#{posts_directory}/#{filename}", 'w') do |file|
    file.write(rendered_content)
  end
end
