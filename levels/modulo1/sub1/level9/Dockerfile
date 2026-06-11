FROM alpine:3.18

# Instalar bash e utilitários básicos (incluindo file)
RUN apk add --no-cache bash coreutils findutils grep sed mawk nano vim file

# Criar usuário sem privilégios
RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"

WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
