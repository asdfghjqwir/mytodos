# Vue + Rails API ポートフォリオ

## 概要
Vue 3 と Rails API、JWT 認証を組み合わせた「Todo 管理アプリ」です。  
Docker + EC2 を用いた構成で、実務レベルの開発と運用を意識しています。

## テーマ
ユーザーごとに Todo を登録・管理できる認証付きのシンプルなタスク管理アプリ。

## 特徴
- JWT を使った自前の認証システム
- .env による秘密情報の安全な管理
- Docker による開発・本番環境の共通化
- Bootstrap によるレスポンシブ対応
- Vue による動的なフロントエンド

## 主な機能
- ユーザー登録・ログイン（JWT認証）
- 認証状態による画面制御（Pinia）
- Todo の追加・編集・削除・完了切り替え
- 入力バリデーション（フロントエンド）
- API保護（未認証ユーザーの制限）

## 技術構成
フロントエンド:
- Vue 3 (Vite)
- Vue Router
- Pinia
- Axios
- Bootstrap 5

バックエンド:
- Ruby on Rails 7 APIモード
- PostgreSQL
- JWT（gem 'jwt'）
- rack-cors

インフラ・開発環境:
- Docker / Docker Compose
- AWS EC2（開発・本番を同一インスタンスで運用）
