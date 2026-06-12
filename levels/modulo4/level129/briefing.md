# Nível 129 — Regras Básicas de Firewall com UFW

## 🎮 Contexto do Freela
O servidor da filial foi restaurado, mas você percebe que está completamente aberto para a internet — qualquer porta, qualquer protocolo. Isso é uma bomba-relógio de segurança. Você precisa implementar regras básicas de firewall imediatamente.

## 🛠️ Missão
Configure o firewall do sistema usando o UFW (Uncomplicated Firewall):
1. **Regra de Ouro:** Antes de ativar o firewall, libere a porta SSH (`22/tcp`) para garantir que você não se tranque para fora do servidor!
2. Libere a porta do servidor web (`80/tcp`).
3. Bloqueie explicitamente a porta do banco de dados MySQL (`3306/tcp`).
4. Ative o firewall com o comando `ufw enable`.

## 🎯 Comando-Chave
`sudo ufw allow 22/tcp`, `sudo ufw allow 80/tcp`, `sudo ufw deny 3306/tcp`, `sudo ufw enable`, `sudo ufw status verbose`

## 🎯 Critério de Sucesso
* Ativar o UFW.
* Liberar a porta 22/tcp e 80/tcp e bloquear a porta 3306/tcp.
* **ATENÇÃO:** Se você ativar o firewall antes de liberar o SSH (porta 22), você se trancará fora do servidor e o desafio falhará!
