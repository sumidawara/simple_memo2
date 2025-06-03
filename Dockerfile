# ----------------------------------------------------------------------------------------------------
# ビルドステージ: 依存関係のインストールとNext.jsアプリケーションのビルド
# ----------------------------------------------------------------------------------------------------
FROM node:20-bookworm-slim AS builder 

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーし、依存関係をインストール
# npmの場合、package-lock.jsonを使用します
COPY package.json package-lock.json ./
RUN npm ci
# プロジェクトのソースコードを全てコピー
COPY . .

# Next.jsアプリケーションを本番用にビルド
RUN npm run build

# ----------------------------------------------------------------------------------------------------
# ランタイムステージ: ビルドされたアプリケーションの実行環境
# ----------------------------------------------------------------------------------------------------
FROM node:20-bookworm-slim AS runner

# Next.jsの本番環境用ファイルと、package.jsonをコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# ポートを公開
EXPOSE 3000

# Next.jsアプリケーションを起動
CMD ["npm", "start"]