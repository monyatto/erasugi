json.set! :posts do
  json.array! @posts do |post|
    json.set! :reactions do
      json.array! post.reactions.group_by(&:post_id) do |post_id, reactions|
        json.set! post_id do
          json.array! reactions.map(&:reactions_type_id)
        end
      end
    end
  end
end

json.posts_per_page Post::POSTS_PER_PAGE
