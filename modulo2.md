# MÓDULO 2: Permissões, Usuários e Segurança POSIX
## Guia de Níveis (101 a 110) — Foco: SysAdmin Júnior / Segurança de Sistemas

---

## 📖 INTRODUÇÃO E NARRATIVA DO MÓDULO
O protagonista se consolida como SysAdmin Júnior. A farmácia local do bairro contrata seus serviços após descobrir que qualquer funcionário consegue ler planilhas confidenciais e arquivos de senhas. A missão é aplicar as políticas de segurança POSIX e auditoria de privilégios.

---

## 🛠️ CAPÍTULOS (NÍVEIS)

#### Nível 101 — Quem Pode Ver o Quê?
- **Contexto:** A farmácia possui relatórios fiscais expostos para leitura de qualquer operador.
- **Missão:** Analisar as permissões de leitura/escrita dos arquivos e interpretar a saída do comando.
- **Comando-Chave:** Interpretar a saída de `ls -l` (flags `rwxrwxrwx`)
- **Diálogo AURA-7:** *"Para auditar a segurança, primeiro leia as permissões existentes com `ls -l`. Entenda os blocos de dono, grupo e outros."*

#### Nível 102 — Destravando o Script do Caixa
- **Contexto:** O script de fechamento do dia do caixa recusa-se a rodar apresentando erro de permissão negada.
- **Missão:** Adicionar privilégio de execução ao script do caixa.
- **Comando-Chave:** `chmod +x fechar_caixa.sh`
- **Diálogo AURA-7:** *"`Permission denied` indica que o kernel impede a execução. Ative o bit `x` no arquivo."*

#### Nível 103 — Blindagem Numérica
- **Contexto:** O arquivo do banco de dados de medicamentos está aberto para leitura geral do sistema.
- **Missão:** Restringir o acesso para que somente o dono possa ler e escrever no arquivo, usando a representação octal do chmod.
- **Comando-Chave:** `chmod 600 medicamentos.db`
- **Diálogo AURA-7:** *"Use a notação octal de segurança. `6` significa leitura e escrita, `0` significa nenhum acesso para grupo e outros."*

#### Nível 104 — Mudando de Dono
- **Contexto:** O administrador antigo de TI da farmácia foi desligado e todos os logs sensíveis ainda pertencem ao usuário dele.
- **Missão:** Alterar recursivamente o dono dos relatórios fiscais para o novo gerente.
- **Comando-Chave:** `chown -R gerente:gerente /var/farmacia`
- **Diálogo AURA-7:** *"Quando usuários saem, a propriedade de seus arquivos precisa ser transferida. Use `chown`."*

#### Nível 105 — O Grupo Financeiro
- **Contexto:** O setor de contabilidade precisa editar a planilha de lucros, mas os caixas comuns não devem ter acesso a ela.
- **Missão:** Alterar o grupo do arquivo e garantir as permissões corretas de escrita para o grupo.
- **Comando-Chave:** `chgrp financeiro planilha.xlsx`, `chmod 660 planilha.xlsx`
- **Diálogo AURA-7:** *"Gerencie permissões coletivas. Mude o grupo do arquivo para `financeiro` e restrinja acessos externos."*

#### Nível 106 — O Novo Operador
- **Contexto:** Um novo funcionário foi contratado como auxiliar de caixa e precisa de uma conta isolada no Linux do servidor.
- **Missão:** Criar o novo usuário com home diretório e shell padrão bash.
- **Comando-Chave:** `adduser auxiliar`
- **Diálogo AURA-7:** *"Segurança começa com contas isoladas. Crie a identidade digital do novo auxiliar."*

#### Nível 107 — Acesso Restrito da Impressora
- **Contexto:** O auxiliar de caixa não consegue emitir cupons porque não tem acesso direto à impressora fiscal do sistema.
- **Missão:** Adicionar o usuário auxiliar ao grupo administrativo de impressão `lp`.
- **Comando-Chave:** `usermod -aG lp auxiliar`
- **Diálogo AURA-7:** *"Não mude permissões do hardware. Adicione o usuário ao grupo da impressora com `usermod -aG`."*

#### Nível 108 — Testando a Perspectiva
- **Contexto:** Garantir que o ambiente do auxiliar está restrito de fato e sem falhas de escape.
- **Missão:** Mudar temporariamente de identidade e testar o acesso a pastas confidenciais.
- **Comando-Chave:** `su - auxiliar`
- **Diálogo AURA-7:** *"Audite na prática. Assuma a identidade do auxiliar e tente acessar o diretório do financeiro."*

#### Nível 109 — A Impressora Teimosa
- **Contexto:** O serviço do servidor de impressão travou e o caixa precisa reiniciá-lo, mas ele não tem privilégios de root.
- **Missão:** Configurar permissão para que o auxiliar reinicie apenas o serviço de impressão sem dar acesso total à senha de root.
- **Comando-Chave:** `sudo /usr/sbin/service lp restart`
- **Diálogo AURA-7:** *"`sudo` permite delegar tarefas específicas e de forma pontual. Não conceda acesso root geral."*

#### Nível 110 — [Desafio Prático Integrado] A Constituição da Farmácia
- **Contexto:** A farmácia precisa das regras de privilégios consolidadas e à prova de travamentos.
- **Missão:** Editar com segurança o arquivo `/etc/sudoers` usando o validador nativo, concedendo permissão para o grupo `caixas` reiniciar o serviço de cupons e para o grupo `financeiro` ler os logs do banco de dados.
- **Comando-Chave:** `visudo`
- **Diálogo AURA-7:** *"Um erro no sudoers bloqueia o acesso geral do sistema. Sempre use `visudo` para validar a sintaxe antes de aplicar!"*
