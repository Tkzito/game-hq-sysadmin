FROM gamehq-compile-base:latest
USER root
RUN apk add --no-cache python3 py3-pip && pip3 install awscli --break-system-packages
USER operator
