# syntax = docker/dockerfile:1

ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

WORKDIR /app

ENV RAILS_ENV="development" \
    BUNDLE_DEPLOYMENT="0" \
    BUNDLE_PATH="/usr/local/bundle"


FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config

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

FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app

RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp

USER rails:rails

ENTRYPOINT ["/app/bin/docker-entrypoint"]
CMD ["bin/rails", "server"]
