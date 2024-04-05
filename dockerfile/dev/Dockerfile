FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules && npm install
EXPOSE 5173
# CMD [ "/bin/bash" ],include ENTRYPOINT
ENTRYPOINT [ "npm","run","dev" ]
