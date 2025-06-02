# ----------------------------------------------------------------------------------------------------
# ビルドステージ: 依存関係のインストールとNext.jsアプリケーションのビルド
# UbuntuベースのNode.jsイメージを使用
# ----------------------------------------------------------------------------------------------------
FROM node:20-ubuntu AS builder

WORKDIR /app

# package.jsonとyarn.lockをコピーし、依存関係をインストール
# これにより、パッケージの変更がない限り、この層がキャッシュされてビルドが高速化されます
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# プロジェクトのソースコードを全てコピー
COPY . .

# Next.jsアプリケーションを本番用にビルド
# このステップで .next/static や public ディレクトリなどが生成されます
RUN yarn build

# ----------------------------------------------------------------------------------------------------
# ランタイムステージ: ビルドされたアプリケーションの実行環境
# UbuntuベースのNode.jsイメージを使用
# ----------------------------------------------------------------------------------------------------
FROM node:20-ubuntu AS runner

WORKDIR /app

# Next.jsの本番環境用ファイルと、package.jsonをコピー
# .next フォルダ、public フォルダ、package.json が必要です。
# 依存関係はビルドステージでインストール済みなので、ここでは不要です。
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Next.jsのデフォルトポートである3000番を公開
EXPOSE 3000

# Next.jsアプリケーションを本番モードで起動
# package.json の scripts.start に定義されている 'next start' が実行されます。
CMD ["yarn", "start"]