class Post::Image
  FRAME_IMAGE_PATH = Rails.root.join('app/assets/images/flame.png')
  FONT_SIZE = 25
  INTERLINE_SPACING = (FONT_SIZE * 0.5).round
  COLOR_CODE = '#333333'
  IMAGE_WIDTH = 640
  IMAGE_HEIGHT = 315
  MAX_ROWS = 5
  COLS = 20
  ROWS = 10
  OMMIT_MESSAGE = '…（省略させてください。）'

  attr_reader :post

  def initialize(post)
    @post = post
  end

  def path
    path = "#{post.public_uid}_#{post.updated_at.to_i}.png"
    local_path = Rails.public_path.join('posts', path)
    FileUtils.mkdir_p(File.dirname(local_path)) unless File.directory?(File.dirname(local_path))
    image.write(local_path) unless File.exist?(local_path)
    path
  end

  def image
    image = MiniMagick::Image.open(FRAME_IMAGE_PATH)
    image.combine_options do |c|
      c.gravity 'Center'
      c.pointsize FONT_SIZE
      c.font font_path
      c.interline_spacing INTERLINE_SPACING
      c.stroke COLOR_CODE
      c.annotate "+0+0", formated_body
    end
  end

  def formated_body
    lines = post.content.lines.map { |line| line.scan(/.{1,#{COLS}}/o) }.flatten
    lines = lines[0, MAX_ROWS - 1].push(OMMIT_MESSAGE) if lines.size > MAX_ROWS
    lines.join('\n')
  end

  def font_path
    Rails.root.join('app/assets/fonts/ZenMaruGothic-Regular.ttf')
  end
end
