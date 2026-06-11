FROM alpine:latest

# Instala ferramentas essenciais para o jogador (SRE Simulator)
RUN apk add --no-cache bash procps coreutils nano vim

# Cria o usuário do jogador
RUN adduser -D -s /bin/bash operator

# Estrutura de pastas do desafio
RUN mkdir -p /home/operator/.sistema_critico
RUN mkdir -p /var/log

# Copia os assets do desafio
COPY ligar_coolers.sh /home/operator/.sistema_critico/
COPY .manual_tecnico.txt /home/operator/.sistema_critico/
COPY relatorio_pane.txt /home/operator/.sistema_critico/.pistas.txt
COPY crypto_miner.sh /usr/local/bin/crypto_miner_malware
COPY fake_sensors.sh /usr/local/bin/sensors

# Permissões
RUN chmod 644 /home/operator/.sistema_critico/ligar_coolers.sh
RUN chmod 644 /home/operator/.sistema_critico/.manual_tecnico.txt
RUN chmod 644 /home/operator/.sistema_critico/.pistas.txt
RUN chmod +x /usr/local/bin/crypto_miner_malware
RUN chmod +x /usr/local/bin/sensors

# Configurações de persistência e histórico
RUN echo "OFFLINE" > /tmp/status_sistema.txt && chmod 666 /tmp/status_sistema.txt
RUN echo 'export HISTFILE=/home/operator/.bash_history' >> /home/operator/.bashrc && \
    echo 'export PROMPT_COMMAND="history -a; $PROMPT_COMMAND"' >> /home/operator/.bashrc && \
    touch /home/operator/.bash_history && chown operator:operator /home/operator/.bash_history

# Entrypoint: Malware rodando em background + terminal do jogador
RUN echo '#!/bin/bash' > /entrypoint.sh && \
    echo 'su - operator -c "/usr/local/bin/crypto_miner_malware &"' >> /entrypoint.sh && \
    echo 'exec su - operator' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

WORKDIR /home/operator
CMD ["/entrypoint.sh"]
