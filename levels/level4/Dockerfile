FROM alpine:latest

# Instala ferramentas essenciais
RUN apk add --no-cache bash git nano vim

# Cria o usuário do jogador
RUN adduser -D -s /bin/bash operator

# Pasta de trabalho do projeto e pasta de destino do deploy
WORKDIR /home/operator/projeto
RUN mkdir -p /var/www/html && chown -R operator:operator /var/www/html

# Configura o Git
RUN git config --global user.email "player@devopsgame.local" && \
    git config --global user.name "Player"

# Prepara o repositório inicial com conflito
RUN git init && \
    echo "PORT=8080" > app.conf && git add app.conf && git commit -m "Initial commit" && \
    echo "PORT=9000" > app.conf && git checkout -b feature/nova-porta 2>/dev/null || true && \
    git add app.conf && git commit -m "Change port on feature" && \
    git checkout master 2>/dev/null || true && \
    echo -e "<<<<<<< HEAD\nPORT=8080\nTIMEOUT=30\n=======\nPORT=9000\nTIMEOUT=60\n>>>>>>> feature/nova-porta" > app.conf

# Cria o validador em background (monitora o deploy)
RUN echo -e '#!/bin/bash\nwhile true; do\n  if [ -f /var/www/html/app.conf ] && ! grep -q "<<<<<<<" /var/www/html/app.conf; then\n    echo "ONLINE" > /tmp/status_sistema.txt\n  fi\n  sleep 1\ndone' > /usr/local/bin/validador.sh && \
    chmod +x /usr/local/bin/validador.sh

RUN chown -R operator:operator /home/operator/
RUN echo "OFFLINE" > /tmp/status_sistema.txt && chmod 666 /tmp/status_sistema.txt

USER operator
CMD ["/bin/bash", "-c", "/usr/local/bin/validador.sh & exec /bin/bash"]
