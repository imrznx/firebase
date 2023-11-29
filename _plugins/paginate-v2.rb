module Jekyll
    class CustomGenerator < Generator
      def generate(site)
        # Collect all unique tags and categories from posts
        tags = site.posts.docs.flat_map { |post| post.data['tags'] }.uniq
        categories = site.posts.docs.flat_map { |post| post.data['categories'] }.uniq
  
        # Generate folders for tags in the root directory
        tags.each do |tag|
          generate_folder(site, tag, 'tag')
        end
  
        # Generate folders for categories in the root directory
        categories.each do |category|
          generate_folder(site, category, 'category')
        end
      end
  
      private
  
      def generate_folder(site, name, type)
        folder_path = File.join(site.source, "#{type}", name)
        FileUtils.mkdir_p(folder_path)
  
        index_content = File.read(File.join(site.source, '_layouts/demo.html'))
        updated_content = index_content.gsub('$type', type).gsub('$tag_or_category', name)
  
        File.open(File.join(folder_path, 'index.html'), 'w') do |file|
          file.write(updated_content)
        end
      end
    end
  end
  