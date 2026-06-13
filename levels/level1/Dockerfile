FROM alpine:latest

# Instalar dependências básicas
RUN apk add --no-cache shadow sudo

# Criar o usuário operator
RUN useradd -m -s /bin/sh operator && \
    echo "operator ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Criar a estrutura do desafio
WORKDIR /home/operator
RUN mkdir .sistema_critico

# Adicionar o script do cooler desativado, o arquivo de pistas e o manual técnico
COPY ligar_coolers.sh .sistema_critico/ligar_coolers.sh
COPY .pistas.txt .sistema_critico/.pistas.txt
COPY .sistema_critico/.manual_tecnico.txt .sistema_critico/.manual_tecnico.txt
RUN chmod 600 .sistema_critico/ligar_coolers.sh && \
    chmod 644 .sistema_critico/.pistas.txt && \
    chmod 444 .sistema_critico/.manual_tecnico.txt && \
    chown -R operator:operator /home/operator

# Ajustar o diretório de trabalho padrão para o usuário operator
USER operator
ENV HOME=/home/operator

# Comando para manter o container rodando no modo interativo do orquestrador
CMD ["/bin/sh"]
