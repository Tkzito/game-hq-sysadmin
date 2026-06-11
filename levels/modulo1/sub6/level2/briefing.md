# Nível 52 — O Fim da Linha ($)

## 🎮 Contexto do Freela
Sinais de radiofrequência captados pelos sensores externos terminam com certos códigos identificadores. Precisamos isolar os relatórios que foram concluídos com sucesso através da tag de término de linha `[OK]`.

## 🛠️ Missão
Filtre o arquivo `/home/operator/alertas.txt` exibindo na tela apenas as linhas que terminam exatamente com `[OK]`.

## 📝 Comandos Úteis
*   `$`: Caractere âncora que indica o final da linha no grep. Note que colchetes são caracteres especiais em Regex, então devem ser escapados como `\[OK\]` ou colocados em aspas apropriadas.

## 🎯 Critério de Sucesso
Filtrar linhas do arquivo de alertas que terminam com `[OK]` usando regex âncora de final de linha.
