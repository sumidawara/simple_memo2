# Dockerfile

# ベースイメージとしてNode.js 20を使用
FROM node:20

# アプリケーションの作業ディレクトリを設定
WORKDIR /app

# 依存関係のキャッシュを有効にするために、まずpackage.jsonとpackage-lock.jsonをコピー
# (もしyarnやpnpmを使っている場合は、それぞれyarn.lock, pnpm-lock.yamlに置き換えてください)
COPY package*.json ./

# 依存関係をインストール (npm ci を使用してlockファイルに基づいて厳密にインストール)
# これにより、devDependenciesもインストールされますが、Next.jsのビルドには必要です。
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
# package.jsonのscriptsに "build": "next build" が定義されていることを想定
RUN npm run build

# アプリケーションがリッスンするポートを指定 (Next.jsのデフォルトは3000)
EXPOSE 3000

# アプリケーションを起動するコマンド
# package.jsonのscriptsに "start": "next start" が定義されていることを想定
# Next.js 15では `next start` でプロダクションサーバーを起動します。
CMD ["npm", "run", "start"]