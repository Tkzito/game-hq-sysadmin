# Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS
## Guia de Níveis (171 a 180) — Foco: Configuração da infraestrutura de entrega da TechVanguard

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

Nova Recife, 2047. O tráfego na fintech TechVanguard explodiu após a nova rodada de investimentos. O servidor web antigo está caindo sob o peso de milhares de requisições de transferências pix. O gestor de TI te colocou na linha de frente para implantar Nginx de produção, gerenciar rotas de proxy reverso, balancear cargas e blindar com criptografia SSL.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 171 — Nginx como Servidor Web
- **Contexto:** Configurar o Nginx para servir a página estática de landing page da fintech na porta padrão.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** nginx, systemctl start nginx, /etc/nginx/nginx.conf
- **Diálogo AURA-7:** *"A instalação padrão do Nginx coloca o arquivo de boas-vindas. Vamos limpar a configuração para servir nossa aplicação."*

---

#### Nível 172 — Proxy Reverso para APIs
- **Contexto:** Configurar o Nginx para encaminhar requisições do endpoint /api para a porta 8080 onde a API de pagamentos está rodando.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** proxy_pass, location /api/ {}
- **Diálogo AURA-7:** *"Nunca exponha as portas das APIs diretamente. O Nginx na frente atua como escudo e otimiza a latência."*

---

#### Nível 173 — Balanceamento de Carga (Load Balancing)
- **Contexto:** Adicionar dois servidores redundantes no bloco upstream do Nginx para balancear as requisições de pix.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** upstream, server ip:port, round-robin
- **Diálogo AURA-7:** *"Se o servidor A cair ou ficar sobrecarregado, o Nginx encaminhará a requisição para o servidor B instantaneamente."*

---

#### Nível 174 — Otimização de Entrega e Cache
- **Contexto:** Configurar diretivas de cache de arquivos estáticos (.js, .css, imagens) para aliviar o processamento do backend.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** expires max, add_header Cache-Control
- **Diálogo AURA-7:** *"O melhor processamento é aquele que não precisa ser executado. O cache local poupa bateria e banda."*

---

#### Nível 175 — Headers de Segurança HTTP
- **Contexto:** Configurar cabeçalhos de segurança (CORS, HSTS e bloqueio de iframes) no Nginx para evitar ataques de injeção e clickjacking.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** add_header X-Frame-Options DENY, add_header Strict-Transport-Security
- **Diálogo AURA-7:** *"Headers corretos instruem os navegadores modernos a travarem requisições inseguras na origem."*

---

#### Nível 176 — Limitação de Taxa de Requisições (Rate Limiting)
- **Contexto:** Configurar limit_req no Nginx para evitar brute-force e ataques de negação de serviço na rota de login.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** limit_req_zone, limit_req zone=one burst=5
- **Diálogo AURA-7:** *"Se um robô tentar bater 100 requisições por segundo na rota de login, o Nginx responderá 429 sem encostar na API."*

---

#### Nível 177 — Instalação de Certificados SSL/TLS com Certbot
- **Contexto:** Obter e associar chaves SSL automáticas para o domínio usando o utilitário certbot.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** certbot --nginx -d dominio.com, certbot renew --dry-run
- **Diálogo AURA-7:** *"A Web moderna exige criptografia HTTPS. O Certbot interage com a Let's Encrypt para emitir certificados em 5 segundos."*

---

#### Nível 178 — Cifras Criptográficas Robustas
- **Contexto:** Configurar cifras de TLS 1.3 seguras e desativar versões legadas como TLS 1.0 e 1.1.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** ssl_protocols TLSv1.2 TLSv1.3, ssl_ciphers
- **Diálogo AURA-7:** *"Manter protocolos antigos expõe a transação a ataques de downgrade. Blindagem máxima exige TLS 1.3."*

---

#### Nível 179 — Virtual Hosts e Múltiplos Domínios
- **Contexto:** Configurar dois blocos 'server {}' diferentes para responder a api.tech.local e app.tech.local na mesma porta.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** server_name, listen 80, listen 443
- **Diálogo AURA-7:** *"Os Server Blocks do Nginx permitem consolidar múltiplos serviços no mesmo servidor mantendo isolamento completo."*

---

#### Nível 180 — [Desafio Integrado] O Gateway de Produção
- **Contexto:** Configurar do zero o arquivo nginx.conf integrando proxy reverso para a API, HTTPS blindado, rate limiting e cabeçalhos de segurança.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"O tráfego de pagamentos está protegido. O Nginx está roteando, balanceando e criptografando perfeitamente. Trabalho brilhante."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 171 | Nginx como Servidor Web | `nginx` | easy |
| 172 | Proxy Reverso para APIs | `proxy_pass` | easy |
| 173 | Balanceamento de Carga (Load Balancing) | `upstream` | easy |
| 174 | Otimização de Entrega e Cache | `expires max` | medium |
| 175 | Headers de Segurança HTTP | `add_header X-Frame-Options DENY` | medium |
| 176 | Limitação de Taxa de Requisições (Rate Limiting) | `limit_req_zone` | medium |
| 177 | Instalação de Certificados SSL/TLS com Certbot | `certbot --nginx -d dominio.com` | medium |
| 178 | Cifras Criptográficas Robustas | `ssl_protocols TLSv1.2 TLSv1.3` | hard |
| 179 | Virtual Hosts e Múltiplos Domínios | `server_name` | hard |
| 180 | [Desafio Integrado] O Gateway de Produção | `Todos do módulo` | hard |
