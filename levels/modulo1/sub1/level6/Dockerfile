FROM alpine:3.18

# Instalar bash, coreutils e man-db se houver (mas alpine man-db pode ser grande, --help ja funciona perfeitamente no alpine)
RUN apk add --no-cache bash coreutils findutils grep sed mawk nano vim

# Criar usuário sem privilégios
RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"

WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
