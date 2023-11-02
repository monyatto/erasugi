@posts.each do |post|
    json.set! :reactions do
      post.reactions.group_by(&:post_id).each do |post_id, reactions|
        json.set! post_id do
          json.array! reactions.map(&:reactions_type_id)
        end
      end
    end
end

json.posts_per_page Post::POSTS_PER_PAGE
