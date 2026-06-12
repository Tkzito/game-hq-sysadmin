FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar && \
    echo "auxiliar:1234" | chpasswd
USER operator
