FROM alpine:3.18

# Instalar bash e utilitários básicos
RUN apk add --no-cache bash coreutils findutils grep sed mawk nano vim

# Criar usuário sem privilégios
RUN adduser -D -s /bin/bash operator

WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
