FROM node:8.12.0

RUN mkdir -p /opt/apps/friends
WORKDIR /opt/apps/friends

COPY ./package.json /opt/apps/friends/package.json

# improve requirements build cache
RUN npm install

COPY . /opt/apps/friends

ENV PORT 80
EXPOSE 80

CMD npm start
