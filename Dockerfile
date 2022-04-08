FROM node:14-alpine

WORKDIR /app

ENV USER=node
USER node

ENTRYPOINT ["./web-docker-entrypoint.sh"]
