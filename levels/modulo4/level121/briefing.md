# Nível 121 — Verificando Interfaces de Rede: O Inventário do Que Existe

## 🎮 Contexto do Freela
Antes de diagnosticar conectividade remota, você precisa entender a configuração de rede do seu próprio servidor. Qual IP está configurado? Qual interface está ativa?

## 🛠️ Missão
Liste as interfaces de rede ativas no sistema usando o comando `ip addr` ou `ip link`.
Identifique o endereço IP e a máscara de sub-rede na notação CIDR da interface principal `enp3s0`.
O sistema validará se você executou os comandos de rede necessários.

## 🎯 Comando-Chave
`ip addr show`, `ip link show`

## 🎯 Critério de Sucesso
* Executar o comando `ip addr` ou `ip link` no terminal para verificar as interfaces de rede.
