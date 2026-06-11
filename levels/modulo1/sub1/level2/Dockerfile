FROM alpine:3.18

# Instalar bash
RUN apk add --no-cache bash

# Criar usuário
RUN sh -lc "id -u operator >/dev/null 2>&1 || adduser -D -s /bin/bash operator"

WORKDIR /home/operator
USER operator

CMD ["/bin/bash"]
