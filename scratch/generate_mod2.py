import os

MOD2_DIR = "/mnt/dados/workspaces/Game HQ/levels/modulo2"

levels_data = {
    101: {
        "title": "Nível 101 — Quem Pode Ver o Quê?",
        "briefing": """# Nível 101 — Quem Pode Ver o Quê?

## 🎮 Contexto do Freela
A farmácia do bairro contratou você porque arquivos financeiros confidenciais estão expostos para qualquer funcionário ler. Você precisa identificar o estado atual das permissões de arquivos.

## 🛠️ Missão
1. Inspecione as permissões detalhadas dos arquivos contidos na pasta `relatorios/` usando o comando `ls -l`.

## 🎯 Critério de Sucesso
* Executar o comando `ls -l` ou `ls -la` no diretório correto para listar os arquivos de relatórios de forma detalhada.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
""",
        "setup": """#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/relatorios
echo "receita secreta da farmacia" > /home/operator/relatorios/receitas.txt
echo "lucro anual: R$ 500.000" > /home/operator/relatorios/financeiro.txt
chmod 666 /home/operator/relatorios/receitas.txt
chmod 666 /home/operator/relatorios/financeiro.txt
chown -R operator:operator /home/operator
""",
        "validator": """#!/bin/bash
set -euo pipefail
if ! grep -q "ls -l" /home/operator/.bash_history && ! grep -q "ls -la" /home/operator/.bash_history; then
    echo "Falha: Você precisa listar as permissões detalhadamente usando 'ls -l' ou 'ls -la'."
    exit 1
fi
echo "Sucesso: Permissões de arquivos fiscais inspecionadas!"
exit 0
"""
    },
    102: {
        "title": "Nível 102 — Destravando o Script do Caixa",
        "briefing": """# Nível 102 — Destravando o Script do Caixa

## 🎮 Contexto do Freela
O script de fechamento do caixa (`fechar_caixa.sh`) não executa porque apresenta o erro "Permission denied". Adicione o bit de execução ao arquivo.

## 🛠️ Missão
1. Conceda permissão de execução ao script `fechar_caixa.sh`.

## 🎯 Critério de Sucesso
* O arquivo `/home/operator/fechar_caixa.sh` deve ter permissão de execução ativa.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
""",
        "setup": """#!/bin/bash
set -euo pipefail
echo -e "#!/bin/bash\\necho 'Fechamento de caixa concluído.'" > /home/operator/fechar_caixa.sh
chmod 644 /home/operator/fechar_caixa.sh
chown operator:operator /home/operator/fechar_caixa.sh
""",
        "validator": """#!/bin/bash
set -euo pipefail
if [ ! -x "/home/operator/fechar_caixa.sh" ]; then
    echo "Falha: O script fechar_caixa.sh ainda não possui permissão de execução."
    exit 1
fi
echo "Sucesso: Script de fechamento do caixa destravado!"
exit 0
"""
    },
    103: {
        "title": "Nível 103 — Blindagem Numérica",
        "briefing": """# Nível 103 — Blindagem Numérica

## 🎮 Contexto do Freela
O banco de dados de medicamentos está aberto a leitura e escrita por terceiros. Mude as permissões para que apenas o proprietário tenha acesso a ele.

## 🛠️ Missão
1. Restrinja o acesso para que apenas o dono possa ler e escrever em `medicamentos.db` usando o chmod em modo octal.

## 🎯 Critério de Sucesso
* O arquivo `/home/operator/medicamentos.db` deve ter permissões 600.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
""",
        "setup": """#!/bin/bash
set -euo pipefail
echo "Banco de dados de medicamentos" > /home/operator/medicamentos.db
chmod 644 /home/operator/medicamentos.db
chown operator:operator /home/operator/medicamentos.db
""",
        "validator": """#!/bin/bash
set -euo pipefail
PERM=$(stat -c "%a" /home/operator/medicamentos.db)
if [ "$PERM" != "600" ]; then
    echo "Falha: O arquivo medicamentos.db não está blindado (deve ter permissões 600)."
    exit 1
fi
echo "Sucesso: Banco de dados blindado!"
exit 0
"""
    },
    104: {
        "title": "Nível 104 — Mudando de Dono",
        "briefing": """# Nível 104 — Mudando de Dono

## 🎮 Contexto do Freela
O antigo SysAdmin da farmácia foi demitido. Os logs fiscais em `farmacia/` ainda pertencem a ele. Transfira a propriedade de forma recursiva para o novo `gerente`.

## 🛠️ Missão
1. Altere o dono e o grupo da pasta `farmacia` recursivamente para `gerente`.

## 🎯 Critério de Sucesso
* A pasta `/home/operator/farmacia` e seus conteúdos devem pertencer ao proprietário `gerente` e ao grupo `gerente`.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN id -g gerente >/dev/null 2>&1 || addgroup -g 1001 gerente && \\
    id -u gerente >/dev/null 2>&1 || adduser -D -u 1001 -G gerente -s /bin/bash gerente
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/farmacia/logs
echo "log 1" > /home/operator/farmacia/logs/fisc.log
echo "relatorio" > /home/operator/farmacia/relat.txt
chown -R operator:operator /home/operator/farmacia
""",
        "validator": """#!/bin/bash
set -euo pipefail
OWNER=$(stat -c "%U:%G" /home/operator/farmacia)
OWNER_LOG=$(stat -c "%U:%G" /home/operator/farmacia/logs/fisc.log)
if [ "$OWNER" != "gerente:gerente" ] || [ "$OWNER_LOG" != "gerente:gerente" ]; then
    echo "Falha: A pasta farmacia (ou seus arquivos internos) não pertence ao gerente:gerente."
    exit 1
fi
echo "Sucesso: Propriedade dos arquivos transferida!"
exit 0
"""
    },
    105: {
        "title": "Nível 105 — O Grupo Financeiro",
        "briefing": """# Nível 105 — O Grupo Financeiro

## 🎮 Contexto do Freela
Apenas o grupo `financeiro` deve poder editar a planilha de lucros. Mude o grupo do arquivo `planilha.xlsx` e as permissões.

## 🛠️ Missão
1. Altere o grupo do arquivo `planilha.xlsx` para `financeiro` e configure permissões para que apenas o dono e o grupo tenham leitura e escrita (660).

## 🎯 Critério de Sucesso
* O arquivo `/home/operator/planilha.xlsx` deve pertencer ao grupo `financeiro` e ter permissões `660`.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN getent group financeiro || addgroup -g 1002 financeiro
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
echo "planilha financeira" > /home/operator/planilha.xlsx
chmod 644 /home/operator/planilha.xlsx
chown operator:operator /home/operator/planilha.xlsx
""",
        "validator": """#!/bin/bash
set -euo pipefail
GROUP=$(stat -c "%G" /home/operator/planilha.xlsx)
PERM=$(stat -c "%a" /home/operator/planilha.xlsx)
if [ "$GROUP" != "financeiro" ]; then
    echo "Falha: O grupo do arquivo planilha.xlsx deve ser financeiro."
    exit 1
fi
if [ "$PERM" != "660" ]; then
    echo "Falha: As permissões do arquivo planilha.xlsx devem ser 660."
    exit 1
fi
echo "Sucesso: Grupo financeiro configurado no arquivo!"
exit 0
"""
    },
    106: {
        "title": "Nível 106 — O Novo Operador",
        "briefing": """# Nível 106 — O Novo Operador

## 🎮 Contexto do Freela
Um novo funcionário chamado `auxiliar` foi contratado. Você precisa criar uma conta para ele no sistema.

## 🛠️ Missão
1. Crie o novo usuário `auxiliar` no Linux.

## 🎯 Critério de Sucesso
* O usuário `auxiliar` deve estar cadastrado no sistema.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
""",
        "setup": """#!/bin/bash
set -euo pipefail
# Garantir que o usuario nao exista no inicio da fase
if id -u auxiliar >/dev/null 2>&1; then
    userdel -r auxiliar || true
fi
""",
        "validator": """#!/bin/bash
set -euo pipefail
if ! id -u auxiliar >/dev/null 2>&1; then
    echo "Falha: O usuário 'auxiliar' ainda não foi criado."
    exit 1
fi
if ! grep -q "adduser" /home/operator/.bash_history && ! grep -q "useradd" /home/operator/.bash_history; then
    echo "Falha: O usuário auxiliar foi criado mas não detectamos o uso do adduser/useradd no histórico."
    exit 1
fi
echo "Sucesso: Novo operador 'auxiliar' registrado no sistema!"
exit 0
"""
    },
    107: {
        "title": "Nível 107 — Acesso Restrito da Impressora",
        "briefing": """# Nível 107 — Acesso Restrito da Impressora

## 🎮 Contexto do Freela
O usuário `auxiliar` não consegue imprimir cupons fiscais porque não tem permissão para acessar a impressora.

## 🛠️ Missão
1. Adicione o usuário `auxiliar` ao grupo administrativo de impressão `lp`.

## 🎯 Critério de Sucesso
* O usuário `auxiliar` deve pertencer ao grupo `lp`.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
gpasswd -d auxiliar lp 2>/dev/null || true
""",
        "validator": """#!/bin/bash
set -euo pipefail
if ! id -Gn auxiliar | grep -q "\\blp\\b"; then
    echo "Falha: O usuário 'auxiliar' não pertence ao grupo 'lp'."
    exit 1
fi
echo "Sucesso: Auxiliar agora tem acesso à impressora fiscal!"
exit 0
"""
    },
    108: {
        "title": "Nível 108 — Testando a Perspectiva",
        "briefing": """# Nível 108 — Testando a Perspectiva

## 🎮 Contexto do Freela
Você precisa verificar se o acesso do `auxiliar` está devidamente restrito. Troque de identidade no terminal para o usuário `auxiliar`.

## 🛠️ Missão
1. Troque a identidade do terminal para o usuário `auxiliar`.

## 🎯 Critério de Sucesso
* Uso do comando `su` para trocar de usuário para `auxiliar`.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar && \\
    echo "auxiliar:1234" | chpasswd
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
""",
        "validator": """#!/bin/bash
set -euo pipefail
if ! grep -q "su " /home/operator/.bash_history && ! grep -q "su\\b" /home/operator/.bash_history; then
    echo "Falha: Você precisa trocar de identidade no terminal usando 'su'."
    exit 1
fi
echo "Sucesso: Mudança de perspectiva testada!"
exit 0
"""
    },
    109: {
        "title": "Nível 109 — A Impressora Teimosa",
        "briefing": """# Nível 109 — A Impressora Teimosa

## 🎮 Contexto do Freela
O serviço de impressão fiscal cups travou. Como você é o `operator`, utilize a delegação de privilégios `sudo` para reiniciar o serviço usando o comando configurado.

## 🛠️ Missão
1. Reinicie o serviço de cupons da impressora usando o comando `sudo /usr/sbin/service lp restart`.

## 🎯 Critério de Sucesso
* Execução bem-sucedida do comando de reinicialização de serviço usando `sudo`.
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar
RUN echo -e '#!/bin/bash\\nif [ "$1" = "restart" ]; then\\n  echo "Restarting service..."\\n  touch /var/run/lp.restarted\\nfi' > /usr/sbin/service && \\
    chmod +x /usr/sbin/service
RUN echo "operator ALL=(ALL) NOPASSWD: /usr/sbin/service lp restart" >> /etc/sudoers
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
rm -f /var/run/lp.restarted
""",
        "validator": """#!/bin/bash
set -euo pipefail
if [ ! -f "/var/run/lp.restarted" ]; then
    echo "Falha: O serviço de impressão não foi reiniciado."
    exit 1
fi
echo "Sucesso: Serviço de impressão reiniciado via delegação!"
exit 0
"""
    },
    110: {
        "title": "Nível 110 — [Desafio Prático Integrado] A Constituição da Farmácia",
        "briefing": """# Nível 110 — [Desafio Prático Integrado] A Constituição da Farmácia

## 🎮 Contexto do Freela
Chegou a hora de consolidar as políticas de segurança da farmácia. Edite o arquivo de regras `/etc/sudoers` usando a ferramenta de validação segura para permitir que o grupo `%caixas` tenha direitos administrativos limitados.

## 🛠️ Missão
1. Edite o arquivo `/etc/sudoers` usando `visudo` para incluir uma regra delegando acesso ao grupo `%caixas` ou usuário `auxiliar`.

## 🎯 Critério de Sucesso
* Inclusão de regra para `%caixas` ou `auxiliar` no arquivo `/etc/sudoers` sem causar erros de sintaxe (validado via `visudo -c`).
""",
        "dockerfile": """FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar
USER operator
""",
        "setup": """#!/bin/bash
set -euo pipefail
cp /etc/sudoers.dist /etc/sudoers 2>/dev/null || true
""",
        "validator": """#!/bin/bash
set -euo pipefail
if ! grep -q "%caixas" /etc/sudoers && ! grep -q "auxiliar" /etc/sudoers; then
    echo "Falha: Regras do grupo de caixas ou usuário auxiliar não encontradas no sudoers."
    exit 1
fi
visudo -c -f /etc/sudoers >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Falha: O arquivo sudoers possui erro de sintaxe."
    exit 1
fi
echo "Sucesso: Constituição de privilégios de segurança validada!"
exit 0
"""
    }
}

def generate():
    for num, data in levels_data.items():
        lvl_dir = os.path.join(MOD2_DIR, f"level{num}")
        os.makedirs(lvl_dir, exist_ok=True)
        
        # Write briefing.md
        with open(os.path.join(lvl_dir, "briefing.md"), "w", encoding="utf-8") as f:
            f.write(data["briefing"])
            
        # Write Dockerfile
        with open(os.path.join(lvl_dir, "Dockerfile"), "w", encoding="utf-8") as f:
            f.write(data["dockerfile"])
            
        # Write setup.sh
        with open(os.path.join(lvl_dir, "setup.sh"), "w", encoding="utf-8") as f:
            f.write(data["setup"])
            
        # Write validator.sh
        with open(os.path.join(lvl_dir, "validator.sh"), "w", encoding="utf-8") as f:
            f.write(data["validator"])
            
        print(f"Generated levels/modulo2/level{num}/ files successfully.")

if __name__ == "__main__":
    generate()
