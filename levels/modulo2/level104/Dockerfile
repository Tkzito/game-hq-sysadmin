FROM gamehq-compile-base:latest
USER root
RUN id -g gerente >/dev/null 2>&1 || addgroup -g 1001 gerente && \
    id -u gerente >/dev/null 2>&1 || adduser -D -u 1001 -G gerente -s /bin/bash gerente
USER operator
