FROM nginx:alpine
COPY . /usr/share/nginx/html/
COPY game-demo.conf /etc/nginx/conf.d/default.conf
