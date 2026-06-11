FROM alpine:3.18

RUN apk add --no-cache bash shadow grep coreutils findutils tar gzip curl vim nano

RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"
WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
