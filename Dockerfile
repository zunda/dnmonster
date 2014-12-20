FROM node:0.11

# This is needed for node-canvas dependency on cairo. Annoyingly large...
RUN apt-get update && apt-get install -yy libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++

#Following is effectively onbuild image. We can't use the official onbuild image
#as it would run the above line everytime which is very tiresome
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY ./src /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 8080
