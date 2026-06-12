# Nível 130 — [DESAFIO INTEGRADO] O Filial Offline

## 🎮 Contexto do Freela
14h32, sexta-feira. A distribuidora São Luís perde contato com a filial de Caruaru. O sistema de estoque parou de sincronizar e os caminhões estão sem rotas. O gerente de TI Marcos liga em pânico: *"Você tem que resolver isso antes das 17h ou o prejuízo será catastrófico."*

## 🛠️ Missão
Restaurar a conectividade do serviço de sincronização da filial seguindo estas etapas:

1. **DNS Local:** Mapeie localmente a filial no arquivo `/etc/hosts` associando o nome `filial-caruaru.saoluis.local` ao IP `192.168.2.100` (requer `sudo`).
2. **Acesso SSH:** Conecte remotamente à filial via SSH usando `ssh admin@filial-caruaru.saoluis.local`. O usuário do sistema da filial é `admin` e a senha é `admin`.
3. **Análise de Log:** Copie para o seu diretório local ou leia na sessão SSH o log de erros em `/var/log/sync.log` para identificar o problema de sincronização.
4. **Abertura de Firewall:** Após identificar o bloqueio de firewall no log, execute o comando na filial (via SSH) para permitir o tráfego da porta `8443/tcp` no UFW (`sudo ufw allow 8443/tcp`).
5. **Teste do Endpoint:** Confirme localmente que o serviço de sincronização está no ar consultando o endpoint `http://192.168.2.100:8443/health` usando `curl`. Salve a saída dessa requisição no arquivo `/home/operator/health_response.json`.

## 🎯 Comando-Chave
`ssh`, `scp`, `ufw allow 8443/tcp`, `curl`, `/etc/hosts`

## 🎯 Critério de Sucesso
* Configurar `/etc/hosts` corretamente.
* Conectar à filial e configurar a regra de firewall correta no UFW (`allow 8443/tcp`).
* Fazer a requisição com `curl` para a porta `8443` e salvar o JSON `{"status":"healthy"}` em `/home/operator/health_response.json`.
