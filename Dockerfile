FROM node:14-alpine

WORKDIR /app

ENV USER=node
USER node

ENTRYPOINT ["./scripts/web-docker-entrypoint.sh"]
