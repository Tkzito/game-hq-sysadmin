# Módulo 11: Provisionamento e Gerenciamento com Ansible
## Guia de Níveis (191 a 200) — Foco: Configuração automática e idempotente de servidores em escala

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO

Com dezenas de servidores criados na nuvem, acessá-los individualmente via SSH para instalar atualizações é impraticável. Você deve utilizar o Ansible para declarar a configuração desejada e aplicá-la em lote de forma idêntica.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 191 — Inventários e Comandos Ad-hoc
- **Contexto:** Configurar um arquivo hosts com grupos de servidores e testar a conexão em lote usando comandos ad-hoc.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** ansible all -m ping -i hosts, ansible web -m shell -a "uptime"
- **Diálogo AURA-7:** *"O Ansible não precisa de agentes instalados nas pontas (agentless). Ele opera conectando-se diretamente via SSH."*

---

#### Nível 192 — Playbooks e Idempotência
- **Contexto:** Escrever um playbook YAML simples para instalar o editor vim e garantir que ele esteja em sua versão mais recente.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** ansible-playbook -i hosts site.yml, apt: name=vim state=latest
- **Diálogo AURA-7:** *"Idempotência significa que rodar o playbook uma ou dez vezes gerará exatamente o mesmo resultado sem quebrar nada."*

---

#### Nível 193 — Variáveis de Inventário e Grupos
- **Contexto:** Configurar variáveis específicas para o grupo de banco de dados (portas e caminhos) na estrutura group_vars.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** group_vars/, host_vars/, ansible_port
- **Diálogo AURA-7:** *"Variáveis de grupo permitem diferenciar as portas SSH ou pacotes de produção sem duplicar os códigos das tarefas."*

---

#### Nível 194 — Handlers e Execuções Condicionais
- **Contexto:** Configurar um trigger (handler) para reiniciar o serviço Nginx apenas se o arquivo de configuração index.html for alterado.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** notify: Restart Nginx, handlers: name: Restart Nginx
- **Diálogo AURA-7:** *"Handlers evitam restarts desnecessários de serviços. O serviço só reinicia se houve modificação real no arquivo."*

---

#### Nível 195 — Loops e Templates Jinja2
- **Contexto:** Utilizar laço de repetição loop: no Ansible e templates dinâmicos Jinja2 para gerar configurações customizadas por host.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** template: src=config.j2, loop: {{ items }}
- **Diálogo AURA-7:** *"Jinja2 permite injetar o hostname ou IPs nas configurações dinamicamente em tempo de deploy."*

---

#### Nível 196 — Ansible Roles e Organização
- **Contexto:** Dividir o playbook em estruturas de tasks, templates, vars e handlers dentro de Roles isoladas.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** roles/common/tasks/main.yml, ansible-galaxy init
- **Diálogo AURA-7:** *"Roles modularizam playbooks. Uma role de segurança comum pode ser aplicada a qualquer tipo de servidor instantaneamente."*

---

#### Nível 197 — Segredos Seguros com Ansible Vault
- **Contexto:** Criptografar arquivos de credenciais confidenciais de banco de dados usando o utilitário ansible-vault.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** ansible-vault encrypt credentials.yml, --ask-vault-pass
- **Diálogo AURA-7:** *"Nunca armazene senhas em texto puro em repositórios. O Vault criptografa os arquivos com cifras AES."*

---

#### Nível 198 — Ações Locais e Delegações
- **Contexto:** Configurar uma tarefa para notificar a API local de monitoramento usando delegate_to durante a atualização remota.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** delegate_to: localhost, local_action: uri
- **Diálogo AURA-7:** *"Delegação permite realizar etapas intermediárias de deploy em servidores de build ou gateways sem sair do fluxo."*

---

#### Nível 199 — Pipelining e Otimização de Performance
- **Contexto:** Ativar pipelining nas configurações do ansible.cfg para reduzir as conexões SSH em deploys de alta latência.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** pipelining = True, forks = 10 em ansible.cfg
- **Diálogo AURA-7:** *"Pipelining acelera a execução rodando múltiplos blocos de código na mesma conexão SSH sem recriar túneis."*

---

#### Nível 200 — [Desafio Integrado] O Orquestrador Ansible
- **Contexto:** Escrever um playbook integrado estruturado em roles para provisionar segurança, configurar nginx e vault em todos os nós locais.
- **Missão:** Executar ou configurar o cenário conforme os tópicos de infraestrutura.
- **Comando-Chave:** Todos do módulo
- **Diálogo AURA-7:** *"Dezenas de servidores configurados e atualizados perfeitamente com um único comando. Deploy em escala concluído!"*

---

## 📊 RESUMO DO MÓDULO

| Nível | Título | Comando Principal | Dificuldade |
|:------|:-------|:------------------|:-----------|
| 191 | Inventários e Comandos Ad-hoc | `ansible all -m ping -i hosts` | easy |
| 192 | Playbooks e Idempotência | `ansible-playbook -i hosts site.yml` | easy |
| 193 | Variáveis de Inventário e Grupos | `group_vars/` | easy |
| 194 | Handlers e Execuções Condicionais | `notify: Restart Nginx` | medium |
| 195 | Loops e Templates Jinja2 | `template: src=config.j2` | medium |
| 196 | Ansible Roles e Organização | `roles/common/tasks/main.yml` | medium |
| 197 | Segredos Seguros com Ansible Vault | `ansible-vault encrypt credentials.yml` | medium |
| 198 | Ações Locais e Delegações | `delegate_to: localhost` | hard |
| 199 | Pipelining e Otimização de Performance | `pipelining = True` | hard |
| 200 | [Desafio Integrado] O Orquestrador Ansible | `Todos do módulo` | hard |
