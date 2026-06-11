FROM alpine:latest
RUN apk add --no-cache bash dialog
RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"
WORKDIR /home/operator
COPY setup.sh /setup.sh
RUN chmod +x /setup.sh && /setup.sh
USER operator
