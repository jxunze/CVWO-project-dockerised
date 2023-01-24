# pull official base image
FROM node:19.4-alpine3.16

ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3001
# Start the app
CMD [ "yarn", "start" ]