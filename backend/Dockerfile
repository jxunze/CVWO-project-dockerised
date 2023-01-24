FROM ruby:3.1.3
RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs postgresql-client

RUN mkdir /rails_backend
WORKDIR /rails_backend

COPY Gemfile* .
RUN gem update bundler
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

COPY . .
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]