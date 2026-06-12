import { Challenge } from "../../types";

export const M9_GENERATED: Challenge[] = [
  {
    "id": "m9_l171",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 171 — Nginx como Servidor Web",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar o Nginx para servir a página estática de landing page da fintech na porta padrão.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`nginx, systemctl start nginx, /etc/nginx/nginx.conf`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {
      "/": {
        "index.html": {
          "type": "file",
          "content": "<h1>Fintech landing page</h1>",
          "permissions": 644
        }
      }
    }
  },
  {
    "id": "m9_l172",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 172 — Proxy Reverso para APIs",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar o Nginx para encaminhar requisições do endpoint /api para a porta 8080 onde a API de pagamentos está rodando.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`proxy_pass, location /api/ {}`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l173",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 173 — Balanceamento de Carga (Load Balancing)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "easy",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nAdicionar dois servidores redundantes no bloco upstream do Nginx para balancear as requisições de pix.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`upstream, server ip:port, round-robin`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l174",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 174 — Otimização de Entrega e Cache",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar diretivas de cache de arquivos estáticos (.js, .css, imagens) para aliviar o processamento do backend.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`expires max, add_header Cache-Control`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l175",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 175 — Headers de Segurança HTTP",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar cabeçalhos de segurança (CORS, HSTS e bloqueio de iframes) no Nginx para evitar ataques de injeção e clickjacking.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`add_header X-Frame-Options DENY, add_header Strict-Transport-Security`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l176",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 176 — Limitação de Taxa de Requisições (Rate Limiting)",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar limit_req no Nginx para evitar brute-force e ataques de negação de serviço na rota de login.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`limit_req_zone, limit_req zone=one burst=5`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l177",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 177 — Instalação de Certificados SSL/TLS com Certbot",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "medium",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nObter e associar chaves SSL automáticas para o domínio usando o utilitário certbot.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`certbot --nginx -d dominio.com, certbot renew --dry-run`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l178",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 178 — Cifras Criptográficas Robustas",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar cifras de TLS 1.3 seguras e desativar versões legadas como TLS 1.0 e 1.1.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`ssl_protocols TLSv1.2 TLSv1.3, ssl_ciphers`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l179",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 179 — Virtual Hosts e Múltiplos Domínios",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 2000,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar dois blocos 'server {}' diferentes para responder a api.tech.local e app.tech.local na mesma porta.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`server_name, listen 80, listen 443`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  },
  {
    "id": "m9_l180",
    "module": "Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
    "name": "Nível 180 — [Desafio Integrado] O Gateway de Produção",
    "actName": "Ato IV: O Engenheiro",
    "difficulty": "hard",
    "salary": 2500,
    "briefing": "## 🎮 Contexto do Freela\nConfigurar do zero o arquivo nginx.conf integrando proxy reverso para a API, HTTPS blindado, rate limiting e cabeçalhos de segurança.\n\n## 🛠️ Missão\nExecutar ou configurar o cenário conforme os tópicos de infraestrutura.\n\n## 🎯 Comando-Chave\n`Todos do módulo`\n\n## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso de acordo com as diretrizes do ecossistema.",
    "storySegment": "",
    "validationType": "bash_script",
    "liveSchematicType": "ssh_routes",
    "hint": "",
    "initialFS": {}
  }
];
