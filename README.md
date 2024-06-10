# えらすぎ

## サービスのURL

## 概要
えらすぎというサービスは、気軽に褒めたり褒められないという問題を解決したい、 褒められたい人・褒めたい人向けの、 画像作成&共有サービスです。
ユーザーは 褒めてほしいことをシェアしてリアクションをもらうことができ、定型的なリアクションのみが備わっている事が特徴です。

## 使い方

### 1. 投稿にリアクションをする
![Image](https://github.com/users/monyatto/projects/1/assets/83024928/83fd55c3-dcfb-4905-8d94-a0626b30ce56)
### 2. 会員登録をする
![Image](https://github.com/users/monyatto/projects/1/assets/83024928/ac435c0a-6868-4c43-bd03-56c1b1b97b54)
### 3. 投稿をする
![Image](https://github.com/users/monyatto/projects/1/assets/83024928/e4f9a423-5d76-43c4-a251-6f7f7d1b9291)
### 4. 過去の投稿を観覧、編集、削除する
![Image](https://github.com/users/monyatto/projects/1/assets/83024928/fad25c80-be80-4f44-88b1-1e0822bd43ea)

## 技術スタック
Ruby 3.3.0
Ruby on Rails 7.1.3.4
Hotwire

## 環境構築

1. 任意のディレクトリにこのリポジトリのクローンを保存します。
```
git clone https://github.com/monyatto/erasugi.git
```

2. リポジトリに移動します。
```
cd erasugi
```

3. PostgreSQLをインストール(既にPostgreSQLをインストール済の場合は不要です)。
```
brew install postgresql
```

4. セットアップを実行します。
```
bin/setup
```

## 起動
```
bin/dev
```

## Test
```
bin/rails test:all
```

## Lint
```
bin/lint 
```
