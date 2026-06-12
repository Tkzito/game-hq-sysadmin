# Nível 117 — Jobs em Background: Multitarefa no Terminal

## 🎮 Contexto do Freela
Enquanto o servidor é reorganizado, você precisa executar um backup longo mas também continuar monitorando processos. O terminal não pode ficar bloqueado durante o backup.

## 🛠️ Missão
Inicie o script `/usr/local/bin/backup_dental.sh` em segundo plano (background) de forma que ele continue rodando mesmo se você fechar a sua sessão do terminal. Para isso, utilize o utilitário `nohup` associado ao caractere `&` de background.

## 🎯 Comando-Chave
`nohup /usr/local/bin/backup_dental.sh &`, `jobs`, `fg`, `bg`

## 🎯 Critério de Sucesso
* O processo `/usr/local/bin/backup_dental.sh` deve estar rodando em background sob proteção do `nohup` (ou redirecionando saída).
