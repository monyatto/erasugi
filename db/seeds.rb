# frozen_string_literal: true

@user = User.create!(name: 'サンプル一郎', email: 'sample1@example.com', password: 'password')
Post.create!(content: 'サンプル投稿1', user: @user)
Post.create!(content: 'サンプル投稿2', user: @user)
Post.create!(content: 'サンプル投稿3', user: @user)
