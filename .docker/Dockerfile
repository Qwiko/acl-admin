FROM node:22.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .

# Copy public files
COPY ./public ./public

# Copy vite.config.ts
COPY ./vite.config.ts .

# Copy index.html
COPY ./index.html .

RUN npm install --silent

# copy source code
COPY ./src ./src