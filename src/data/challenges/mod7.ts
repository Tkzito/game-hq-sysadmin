import { Challenge } from "../../types";

export const MOD7_CHALLENGES: Challenge[] = [
  {
    id: "m7_l151",
    module: "Módulo 7: Conteinerização e Orquestração Local",
    name: "Microserviço Descentralizado Docker",
    actName: "Ato III: O Especialista",
    difficulty: "medium",
    salary: 1200,
    briefing: "Sua tarefa é orquestrar uma nova rede isolada para testar o app em um Dockerfile leve. Crie um arquivo chamado 'Dockerfile' no diretório raiz '/', adicione as linhas essenciais para herdar da imagem 'alpine' (FROM alpine), copiar o diretório atual (COPY . .) e expor as portas de comunicação (EXPOSE 3000), então execute o comando 'docker build -t app:v1 .' para embalar o container.",
    storySegment: "Você foi contatado para escalar a capacidade operacional de um servidor de mensagens criptografadas descentralizado que opera sob ataque governamental de censura. O segredo é isolamento total: empaquetar o nó operacional em um container leve que pode ser iniciado em 1.2 segundos em qualquer hardware doméstico do mundo.",
    validationType: "file_check",
    liveSchematicType: "cluster_status",
    hint: "Escreva o arquivo 'Dockerfile' (use o botão 'Criar Arquivo' ou nano Dockerfile) incluindo:\nFROM alpine\nCOPY . /app\nEXPOSE 3000\nDepois salve e execute o build no console digitando:\ndocker build -t app:v1 ."
  },
  {
    id: "m7_l160",
    module: "Módulo 7: Conteinerização e Orquestração Local",
    name: "O Orquestrador de Microsserviços",
    actName: "Ato IV: O Engenheiro",
    difficulty: "hard",
    salary: 1400,
    briefing: "Crie um docker-compose.yml que suba uma aplicação Node.js isolada de um banco Redis via rede interna, sem expor o banco publicamente, com volume para persistência e variáveis de ambiente injetadas.",
    storySegment: "Os clientes da Hodrich Digital sofrem com dependências complexas. Mapeie a arquitetura de múltiplos contêineres e conecte-os declarativamente usando networks isoladas e volumes persistentes.",
    validationType: "file_check",
    liveSchematicType: "cluster_status",
    hint: "Mapeie services, configure networks separadas no compose.yml, utilize volumes locais e defina environment keys para a conexão do banco."
  }
];
