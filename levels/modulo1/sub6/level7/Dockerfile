FROM alpine:3.18

# Instalar bash e utilitários básicos
RUN apk add --no-cache bash grep sed coreutils

# Criar usuário sem privilégios
RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"

WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
