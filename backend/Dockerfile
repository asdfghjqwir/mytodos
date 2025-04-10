# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.8
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

WORKDIR /app

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# =========================
# ビルドステージ
# =========================
FROM base as build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    git \
    libpq-dev \
    libvips \
    pkg-config \
    libyaml-dev

# ✅ backend/Gemfile, Gemfile.lock を最初にコピー
COPY backend/Gemfile backend/Gemfile.lock ./

# ✅ プラットフォーム追加してから bundle install
RUN bundle lock --add-platform x86_64-linux && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# ✅ 全体のソースコードをあとからコピー
COPY backend/ .

# ✅ bootsnap precompile
RUN bundle exec bootsnap precompile --gemfile && \
    bundle exec bootsnap precompile app/ lib/

# =========================
# 実行ステージ（軽量）
# =========================
FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl \
    libvips \
    postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app

# 必要なディレクトリ作成と権限設定（←ここ修正ポイント）
RUN mkdir -p /app/db /app/log /app/storage /app/tmp/sockets && \
    useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails /app/db /app/log /app/storage /app/tmp

USER rails:rails

# Entrypoint & CMD（←ここが起動のカギ）
ENTRYPOINT ["/app/bin/docker-entrypoint"]
CMD ["bin/rails", "server"]
EXPOSE 3000
