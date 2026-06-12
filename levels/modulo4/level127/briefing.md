# Nível 127 — Conexão SSH Segura: O Túnel Criptografado

## 🎮 Contexto do Freela
Com a conectividade de rede restaurada, você precisa acessar remotamente o servidor da filial para fazer diagnóstico direto. SSH é o protocolo fundamental de administração remota segura.

## 🛠️ Missão
Configure a autenticação segura por chaves SSH e um atalho de conexão rápida:
1. Gere um par de chaves SSH (preferencialmente do tipo `ed25519`) em sua máquina usando `ssh-keygen`.
2. Envie a sua chave pública para o servidor remoto (que nesta simulação está rodando no `localhost` na porta `2222` como usuário `operator`). A senha do usuário `operator` é `operator`. Use o comando `ssh-copy-id` especificando a porta `-p 2222`.
3. Crie ou edite o arquivo de configuração do SSH do seu usuário em `/home/operator/.ssh/config` e adicione um atalho com o nome `filial` apontando para o servidor remoto. O atalho deve permitir conectar digitando apenas `ssh filial`.

Exemplo de configuração para o `/home/operator/.ssh/config`:
```text
Host filial
    HostName localhost
    User operator
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

## 🎯 Comando-Chave
`ssh-keygen -t ed25519`, `ssh-copy-id -p 2222 operator@localhost`, `ssh filial`

## 🎯 Critério de Sucesso
* Par de chaves SSH criado.
* Chave pública copiada para as chaves autorizadas do servidor remoto.
* Arquivo `/home/operator/.ssh/config` configurado com o Host `filial` na porta `2222`.
