# MÓDULO 4: Fundamentos de Redes e Acesso Remoto
## Guia de Níveis (121 a 130) — Foco: Diagnóstico de Rede e Administração Remota

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

**Cidade: Nova Recife, 2047.**

Sua reputação como "médico de servidores" da OralTech se espalhou pelo bairro corporativo. Agora você atende empresas regionais como freelancer — até que a **Distribuidora São Luís** te liga em pânico.

Marcos, o gerente de TI, fala rápido ao telefone:
*"Nossa filial em Caruaru está completamente offline. O sistema de rastreamento de caminhões parou, o estoque não atualiza, os vendedores tão na rua sem conseguir confirmar pedido. A gente perde R$ 40 mil por hora quando isso acontece."*

Você pergunta se pode acessar remotamente o servidor da filial.

*"Não consigo nem pingar. O servidor parece que sumiu."*

AURA-7 sintetiza o cenário:
*"Falha de conectividade reportada na filial de Caruaru. Causas possíveis: falha de hardware de rede, rota incorreta, DNS corrompido, firewall bloqueando, ou — o mais assustador — servidor offline. Precisamos afunilar sistematicamente. Por onde você prefere começar?"*

O trabalho real de redes não é mágica. É metodologia — camada por camada, do físico ao lógico, do local ao remoto.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

---

#### Nível 121 — Verificando Interfaces de Rede: O Inventário do Que Existe

- **Contexto:** Antes de diagnosticar conectividade remota, você precisa entender a configuração de rede do seu próprio servidor. Qual IP está configurado? Qual interface está ativa? A interface está up ou down?
- **Missão:** Usar `ip addr` e `ip link` para listar interfaces de rede, verificar endereços IP configurados, identificar o estado das interfaces (UP/DOWN) e entender a notação CIDR.
- **Comando-Chave:** `ip addr show`, `ip addr show eth0`, `ip link show`, `ip link set eth0 up`
- **Conceitos Abordados:**
  - Interfaces de rede: `eth0`, `enp3s0`, `lo` (loopback), `wlan0`
  - Estado da interface: UP, DOWN, UNKNOWN
  - Endereço IP e máscara de sub-rede em notação CIDR (`/24` = 255.255.255.0)
  - Endereço MAC (link/ether)
  - MTU (Maximum Transmission Unit)
  - Diferença entre `ip` (moderno) e `ifconfig` (legado/deprecated)
  - Interface `lo` (loopback 127.0.0.1) e seu papel no sistema
  - IPv4 vs IPv6: `inet` vs `inet6`
- **Diálogo AURA-7:** *"A interface `enp3s0` está UP com IP 192.168.1.10/24. Perfeito — nosso ponto de partida é sólido. Note que o comando `ifconfig` ainda existe em muitos sistemas legados, mas `ip addr` é a ferramenta moderna padrão desde o iproute2. Aprenda ambos — o mundo legado ainda existe."*

---

#### Nível 122 — Roteamento e Tabela de Rotas: Como os Pacotes Viajam

- **Contexto:** Seu servidor consegue se comunicar dentro da rede local, mas como ele sabe para onde enviar pacotes destinados à filial de Caruaru (rede remota)? A tabela de rotas é o mapa que o kernel usa para tomar essa decisão.
- **Missão:** Visualizar a tabela de rotas com `ip route`, identificar o gateway padrão, entender como adicionar e remover rotas temporárias e diagnosticar problemas de roteamento.
- **Comando-Chave:** `ip route show`, `ip route get 8.8.8.8`, `ip route add 192.168.2.0/24 via 192.168.1.1`, `ip route del 192.168.2.0/24`
- **Conceitos Abordados:**
  - Tabela de roteamento: como o kernel decide por qual interface enviar cada pacote
  - Rota padrão (default gateway): para onde vai tudo que não tem rota específica
  - Rota de rede local: pacotes para a própria sub-rede vão diretamente
  - `via`: o próximo salto (next-hop) para redes remotas
  - `dev`: a interface de saída
  - `src`: IP de origem preferido para essa rota
  - `ip route get IP`: "como eu alcançaria esse endereço específico?"
  - Rotas persistentes vs temporárias (não sobrevivem ao reboot sem configuração)
- **Diálogo AURA-7:** *"A tabela de rotas é o GPS do kernel. Sem gateway padrão, o servidor fica preso na própria sub-rede — como saber o endereço de casa mas não saber como chegar ao aeroporto. O `ip route get` é particularmente útil: ele simula exatamente qual caminho um pacote usaria."*

---

#### Nível 123 — Diagnóstico de Conectividade: A Prova de Vida da Rede

- **Contexto:** Hora de testar se conseguimos alcançar o servidor da filial de Caruaru. O `ping` é o primeiro teste — simples, mas extremamente informativo quando analisado corretamente.
- **Missão:** Usar `ping` para testar conectividade, interpretar os resultados (RTT, packet loss, TTL), entender por que ping pode falhar mesmo com conectividade real e identificar diferentes padrões de falha.
- **Comando-Chave:** `ping 192.168.2.100`, `ping -c 4 google.com`, `ping -I eth0 192.168.2.100`, `ping -M do -s 1472 gateway` (MTU path discovery)
- **Conceitos Abordados:**
  - ICMP Echo Request/Reply: o protocolo por trás do ping
  - RTT (Round-Trip Time): tempo de ida e volta em milissegundos
  - TTL (Time To Live): decrementado a cada roteador — ajuda a estimar distância
  - Packet loss: % de pacotes perdidos — acima de 1% é problemático
  - Diferença entre "host unreachable" (sem rota), "network unreachable" (sem gateway) e timeout (resposta não chegou)
  - Por que ping pode ser bloqueado por firewall (ICMP bloqueado) mesmo com serviço funcionando
  - `ping -c`: número de pacotes a enviar
  - `ping -i`: intervalo entre pacotes
  - Interpretação do TTL para estimar número de hops
- **Diálogo AURA-7:** *"O ping para 192.168.2.100 retorna 'Destination Host Unreachable' — diferente de timeout. Isso significa que algum roteador no caminho tem a rota, mas o host final não responde. Pode ser firewall, pode ser a interface de rede da filial offline. Precisamos rastrear onde o pacote para."*

---

#### Nível 124 — Rastreamento de Pacotes: Seguindo a Trilha

- **Contexto:** Sabemos que o ping falha. Agora precisamos descobrir exatamente onde na rota o pacote para. O `traceroute` mostra cada salto da jornada do pacote — como câmeras de segurança na estrada entre você e a filial.
- **Missão:** Usar `traceroute` e `tracepath` para identificar o caminho de pacotes até o destino, interpretar os resultados e identificar onde a conectividade é perdida.
- **Comando-Chave:** `traceroute 192.168.2.100`, `tracepath 192.168.2.100`, `traceroute -n 8.8.8.8` (sem resolução DNS), `mtr 192.168.2.100` (traceroute contínuo)
- **Conceitos Abordados:**
  - Como o traceroute funciona: TTL incrementado + ICMP Time Exceeded
  - Cada linha = um roteador (hop) no caminho
  - `* * *` significa que o roteador não respondeu (ICMP bloqueado — não necessariamente falha)
  - RTT por hop: latências crescentes são normais; latência que cai é assimétrica (normal também)
  - Onde o rastreamento para = onde a conectividade falha
  - `tracepath` vs `traceroute`: tracepath não precisa de root, usa UDP; traceroute pode usar ICMP/UDP/TCP
  - `mtr`: combina ping + traceroute em tempo real — ferramenta premium de diagnóstico
  - Identificação de links lentos (latência entre hops)
- **Diálogo AURA-7:** *"O traceroute chega até o roteador da operadora em Caruaru (hop 7, 38ms) mas para ali. O roteador da filial não responde. Isso aponta para problema de conectividade entre o roteador da operadora e o switch da filial — ou o link da fibra está cortado, ou o roteador da filial está offline."*

---

#### Nível 125 — Resolução de Nomes e DNS: Traduzindo Endereços

- **Contexto:** O sistema de rastreamento da distribuidora usa hostnames (como `filial-caruaru.saoluis.local`) em vez de IPs fixos. Se o DNS falhar, mesmo que a rede esteja funcionando, os serviços não se encontram.
- **Missão:** Usar `nslookup` e `dig` para consultar servidores DNS, verificar resolução de nomes, identificar qual servidor DNS está sendo usado e testar resolução direta e reversa.
- **Comando-Chave:** `nslookup filial-caruaru.saoluis.local`, `dig @8.8.8.8 google.com`, `dig -x 192.168.2.100` (reverso), `cat /etc/resolv.conf`
- **Conceitos Abordados:**
  - DNS: sistema hierárquico de tradução de nomes para IPs
  - Tipos de registro: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), PTR (reverso), NS (nameserver)
  - `/etc/resolv.conf`: onde estão configurados os servidores DNS do sistema
  - `/etc/hosts`: resolução local estática — tem precedência sobre DNS
  - `nslookup`: ferramenta simples e interativa
  - `dig`: ferramenta avançada com saída completa do protocolo DNS
  - `dig @servidor`: consultar servidor DNS específico
  - TTL dos registros DNS: quanto tempo uma resposta fica em cache
  - Resolução reversa (PTR): IP → nome
- **Diálogo AURA-7:** *"O DNS interno da São Luís não resolve `filial-caruaru.saoluis.local`. O servidor DNS (192.168.1.5) está respondendo, mas sem o registro A para a filial. Alguém pode ter removido o registro durante uma manutenção. Vamos contornar isso usando o IP diretamente por enquanto."*

---

#### Nível 126 — Download de Arquivos via Linha de Comando

- **Contexto:** O servidor da filial voltou a responder parcialmente. Você precisa baixar um script de diagnóstico remoto e um arquivo de configuração de um servidor interno da distribuidora. Sem interface gráfica.
- **Missão:** Usar `wget` e `curl` para baixar arquivos via linha de comando, fazer requisições HTTP com cabeçalhos customizados, testar endpoints de API e salvar outputs.
- **Comando-Chave:** `wget http://servidor/arquivo.sh`, `wget -O nome_local.sh URL`, `curl -O URL`, `curl -I URL` (apenas headers), `curl -X POST -d '{"key":"val"}' URL`
- **Conceitos Abordados:**
  - `wget`: download de arquivos, suporte a retry automático, mirror de sites
  - `curl`: transferência de dados com suporte a múltiplos protocolos (HTTP, FTP, SFTP, SMTP)
  - Diferença principal: wget é focado em download; curl é focado em transferência/API
  - `curl -v`: modo verbose — mostra handshake HTTP completo
  - `curl -I`: HEAD request — obtém headers sem baixar o body
  - `curl -u user:pass`: autenticação básica HTTP
  - `wget --no-check-certificate`: ignorar SSL inválido (use com cautela)
  - Pipes com curl: `curl URL | bash` — conveniente mas perigoso
  - `-k` / `--insecure`: desabilitar verificação de certificado SSL
- **Diálogo AURA-7:** *"O `curl -I` retornou HTTP 200 para o endpoint de saúde do serviço. O serviço está respondendo — o problema estava só na resolução DNS que corrigimos. Atenção: nunca faça `curl URL | bash` em servidores de produção sem inspecionar o script antes. Isso é vetor clássico de ataque de supply chain."*

---

#### Nível 127 — Conexão SSH Segura: O Túnel Criptografado

- **Contexto:** Com a conectividade de rede restaurada, você precisa acessar remotamente o servidor da filial para fazer diagnóstico direto. SSH é o protocolo fundamental de administração remota segura.
- **Missão:** Conectar via SSH ao servidor remoto, configurar o arquivo `~/.ssh/config` para conexões facilitadas, entender o processo de autenticação por chaves e verificação de fingerprint.
- **Comando-Chave:** `ssh user@192.168.2.100`, `ssh-keygen -t ed25519`, `ssh-copy-id user@host`, configuração do `~/.ssh/config`
- **Conceitos Abordados:**
  - SSH (Secure Shell): protocolo de comunicação segura por criptografia assimétrica
  - Autenticação por senha vs por chave pública/privada
  - Geração de par de chaves: `ssh-keygen -t ed25519 -C "comentario"`
  - Chave privada (`~/.ssh/id_ed25519`): secreta, nunca compartilhada
  - Chave pública (`~/.ssh/id_ed25519.pub`): enviada ao servidor
  - `~/.ssh/authorized_keys` no servidor: onde ficam as chaves autorizadas
  - `ssh-copy-id`: copia chave pública para o servidor automaticamente
  - `~/.ssh/config`: atalhos de conexão, usuário padrão, porta, chave específica
  - Host fingerprint: verificação de autenticidade do servidor na primeira conexão
  - `ssh -L 8080:localhost:80 user@host`: port forwarding local
- **Diálogo AURA-7:** *"Autenticação por senha é conveniente mas fraca — um ataque de força bruta pode descobri-la. Com chave Ed25519, a chave pública no servidor é inútil sem a chave privada correspondente no seu computador. Adicionalmente, configure `PasswordAuthentication no` no sshd_config do servidor — o próximo nível vai cobrir isso."*

---

#### Nível 128 — Cópia Segura de Arquivos: Movendo Dados Remotamente

- **Contexto:** Dentro do servidor da filial, você identificou um arquivo de log com erros críticos que precisa ser analisado localmente. Também precisa enviar um script de correção para o servidor remoto.
- **Missão:** Usar `scp` para copiar arquivos entre hosts de forma segura. Entender a sintaxe local→remoto e remoto→local, copiar diretórios recursivamente e usar as mesmas credenciais SSH.
- **Comando-Chave:** `scp user@host:/caminho/arquivo.log ./`, `scp script.sh user@host:/tmp/`, `scp -r diretorio/ user@host:/destino/`, `rsync -avz source/ user@host:/dest/`
- **Conceitos Abordados:**
  - SCP (Secure Copy Protocol): cópia de arquivos sobre SSH
  - Sintaxe: `scp [origem] [destino]` onde origem/destino pode ser `user@host:/path`
  - `-r`: recursivo para diretórios
  - `-P` (maiúsculo): especificar porta SSH
  - `-i`: usar chave SSH específica
  - `rsync` vs `scp`: rsync é incremental (transfere apenas o que mudou), mais eficiente para sincronização
  - `rsync -avz --delete`: sincronização completa com delete de arquivos removidos na origem
  - `rsync --dry-run`: simular sem executar — segurança antes de sincronização crítica
  - SCP depreciado em algumas distribuições em favor de SFTP/rsync
- **Diálogo AURA-7:** *"O `rsync` é superior ao `scp` para qualquer transferência que não seja pontual. Ele verifica checksums e transfere apenas blocos modificados. Para um servidor com 500GB de logs, isso pode significar a diferença entre 30 minutos e 8 horas de transferência. Aprenda rsync — você vai usar para sempre."*

---

#### Nível 129 — Regras Básicas de Firewall com UFW

- **Contexto:** O servidor da filial foi restaurado, mas você percebe que está completamente aberto para a internet — qualquer porta, qualquer protocolo. Isso é uma bomba-relógio de segurança. Você precisa implementar regras básicas de firewall imediatamente.
- **Missão:** Configurar o UFW (Uncomplicated Firewall) para permitir apenas serviços essenciais, bloquear o restante e verificar o status das regras aplicadas.
- **Comando-Chave:** `ufw status verbose`, `ufw allow 22/tcp`, `ufw allow 80/tcp`, `ufw deny 3306/tcp`, `ufw enable`, `ufw delete allow 80`
- **Conceitos Abordados:**
  - UFW: frontend simplificado para iptables/nftables
  - Política padrão: `deny incoming`, `allow outgoing` (princípio do mínimo privilégio)
  - `ufw allow PORT/PROTOCOL`: abrir porta específica
  - `ufw allow from IP`: whitelist de origem
  - `ufw allow from IP to any port PORTA`: regra combinada origem + destino
  - `ufw deny`: bloquear explicitamente (diferente de não ter regra)
  - `ufw status numbered`: listar regras com número para facilitar deleção
  - `ufw delete N`: remover regra por número
  - `ufw logging on`: habilitar logs de firewall
  - ATENÇÃO: sempre liberar porta 22 ANTES de habilitar UFW para não se trancar para fora
- **Diálogo AURA-7:** *"Regra de ouro: libere porta 22 antes de ativar o UFW. Administradores que se trancam para fora do servidor SSH via firewall mal configurado são uma estatística real e dolorosa. Sempre verifique: `ufw allow 22` → `ufw enable` → testar nova sessão SSH antes de fechar a atual."*

---

#### Nível 130 — [DESAFIO INTEGRADO] O Filial Offline

- **Contexto:** 14h32, sexta-feira. A distribuidora São Luís perde contato com a filial de Caruaru. Os caminhoneiros estão na estrada sem rota atualizada. O sistema de estoque parou de sincronizar há 3 horas. Marcos liga em pânico: *"Você tem que resolver isso antes das 17h ou a gente não fecha o mês."*
- **Missão:** Diagnóstico completo de conectividade e restauração do acesso remoto. O jogador deve executar as seguintes etapas em sequência lógica:
  1. **Verificar** interfaces locais com `ip addr show` — confirmar que o próprio servidor está configurado
  2. **Verificar** tabela de rotas com `ip route` — confirmar gateway para redes remotas
  3. **Testar** conectividade básica com `ping -c 4 192.168.2.100` (filial)
  4. **Rastrear** onde o pacote para com `traceroute 192.168.2.100`
  5. **Verificar** DNS com `dig filial-caruaru.saoluis.local` — identificar registro ausente
  6. **Adicionar** entrada temporária em `/etc/hosts` para contornar DNS
  7. **Conectar** via SSH ao servidor da filial: `ssh admin@192.168.2.100`
  8. **Copiar** log de erro para análise: `scp admin@192.168.2.100:/var/log/sync.log ./`
  9. **Identificar** o erro no log — porta do serviço bloqueada por firewall recém-aplicado
  10. **Criar** regra de firewall correta: `ufw allow 8443/tcp` (porta do serviço de sincronização)
  11. **Verificar** que o serviço voltou a sincronizar com `curl -I http://192.168.2.100:8443/health`
- **Restrições do Desafio:**
  - Não pode modificar o servidor DNS (sem acesso root ao AD)
  - Não pode desabilitar o UFW completamente (política de segurança)
  - A regra de firewall deve ser específica (porta + protocolo), não `ufw allow any`
- **Critério de Vitória:** SSH funcionando, serviço de sincronização respondendo HTTP 200, log mostrando sincronização retomada, regra UFW correta aplicada.
- **Diálogo AURA-7:** *"16h47. Treze minutos antes do prazo. Sincronização restaurada, 847 pedidos em fila processados. A causa raiz foi uma regra de firewall aplicada às 11h32 por um estagiário que bloqueou a porta 8443 sem documentar. Diagnóstico sistemático, não suposições — foi isso que resolveu."*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 121 | Verificando Interfaces de Rede | `ip addr show` | ⭐⭐ |
| 122 | Roteamento e Tabela de Rotas | `ip route` | ⭐⭐⭐ |
| 123 | Diagnóstico de Conectividade | `ping` | ⭐⭐ |
| 124 | Rastreamento de Pacotes | `traceroute` | ⭐⭐⭐ |
| 125 | Resolução de Nomes e DNS | `dig`, `nslookup` | ⭐⭐⭐ |
| 126 | Download via Linha de Comando | `wget`, `curl` | ⭐⭐ |
| 127 | Conexão SSH Segura | `ssh`, `ssh-keygen` | ⭐⭐⭐⭐ |
| 128 | Cópia Segura de Arquivos | `scp`, `rsync` | ⭐⭐⭐ |
| 129 | Firewall com UFW | `ufw` | ⭐⭐⭐⭐ |
| 130 | [Desafio] O Filial Offline | Todos | ⭐⭐⭐⭐⭐ |

**XP Total do Módulo:** 2.600 XP  
**Título Desbloqueado:** 🌐 *"O Elo da Rede"*  
**Próximo Módulo:** Módulo 5 — Automação e Shell Scripting Avançado
