# ThisOne-Web

ThisOne のWebサイトプロジェクトです。ユーザー向けの情報ページやアカウント管理機能を提供します。

## 概要

このプロジェクトは、ThisOne アプリケーションの公式Webサイトとして、以下の機能を提供しています：

- ホームページ
- プライバシーポリシー
- 利用規約
- アカウント削除機能

## 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite 7
- **ルーティング**: React Router v7
- **バックエンド**: Supabase (認証、Edge Functions)
- **スタイリング**: CSS


## プロジェクト構成

```
ThisOne-Web/
├── src/
│   ├── components/      # 共通コンポーネント
│   │   ├── Layout.tsx   # ページレイアウト
│   │   └── Layout.css
│   ├── pages/          # ページコンポーネント
│   │   ├── HomePage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── DeleteAccountPage.tsx
│   ├── lib/            # ユーティリティ・設定
│   │   └── supabaseClient.ts
│   ├── App.tsx         # メインアプリケーション
│   └── main.tsx        # エントリーポイント
├── public/             # 静的ファイル
└── index.html          # HTMLテンプレート
```

## 機能

### アカウント削除機能

ユーザーは `/delete-account` ページから自分のアカウントを削除できます。

**処理フロー:**
1. ユーザーがメールアドレスとパスワードでログイン
2. 削除内容を確認し、チェックボックスで同意
3. Supabase Edge Function (`delete-account`) を呼び出してアカウントと関連データを削除
4. 自動的にログアウト

※このリポジトリのコード・画像・資源の無断使用、複製、改変、再配布を禁止します。
著作権は作者に帰属します。