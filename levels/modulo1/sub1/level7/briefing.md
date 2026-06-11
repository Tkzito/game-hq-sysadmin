# Nível 7 — Copiando e Movendo Módulos

## 🎮 Contexto do Freela
Para atualizar os subsistemas de AURA-7, precisamos manipular arquivos antigos que estão na pasta `/home/operator/legado`. O arquivo `firmware.bin` é crítico e deve ser copiado como backup de segurança antes de qualquer alteração. Além disso, o relatório antigo `relatorio.txt` deve ser tirado daquela pasta e colocado diretamente na pasta raiz do operador com um novo nome para ser processado pela rotina principal.

## 🛠️ Missão
1. Crie uma pasta chamada `backup` no seu diretório home (`/home/operator`).
2. Copie o arquivo `/home/operator/legado/firmware.bin` para dentro desta nova pasta `backup/`.
3. Mova o arquivo `/home/operator/legado/relatorio.txt` para a raiz do seu diretório (`/home/operator`) renomeando-o para `relatorio_final.txt`.

## 📝 Comandos Úteis
*   `cp <origem> <destino>`: Copia arquivos. (Dica: para copiar pastas recursivamente, use `cp -r`).
*   `mv <origem> <destino>`: Move ou renomeia arquivos/diretórios.

## 🎯 Critério de Sucesso
*   Presença do arquivo `/home/operator/backup/firmware.bin` com a cópia exata do firmware.
*   Presença do arquivo `/home/operator/relatorio_final.txt`.
*   Ausência do arquivo `/home/operator/legado/relatorio.txt`.
