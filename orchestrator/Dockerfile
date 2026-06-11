FROM python:3.11-slim

# Instala o cliente do Docker para que o container possa dar comandos de docker
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instala as dependências do Python
RUN pip install flask flask-cors pyyaml

# Copia o código do orquestrador
COPY orchestrator.py .

# Porta da API
EXPOSE 8000

CMD ["python", "orchestrator.py"]
