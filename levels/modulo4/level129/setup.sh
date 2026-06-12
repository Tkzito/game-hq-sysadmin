#!/bin/bash
set -euo pipefail

# Limpa qualquer regra ou status anterior
rm -f /var/tmp/ufw_rules.txt
rm -f /var/tmp/ufw_status.txt

# Garante que as pastas de destino existam
mkdir -p /usr/sbin /usr/local/bin

# Cria o script mock de ufw em /usr/sbin/ufw e /usr/local/bin/ufw
cat << 'EOF' > /usr/sbin/ufw
#!/bin/bash
RULES_FILE="/var/tmp/ufw_rules.txt"
STATUS_FILE="/var/tmp/ufw_status.txt"
touch "$RULES_FILE" "$STATUS_FILE"

if [ ! -s "$STATUS_FILE" ]; then
    echo "disabled" > "$STATUS_FILE"
fi

case "$1" in
    enable)
        # Verifica se a porta 22 foi liberada antes
        if ! grep -qE "(22/tcp|22 ALLOW)" "$RULES_FILE"; then
            echo "lockout" > "$STATUS_FILE"
            echo "Command may disrupt existing ssh connections. Proceed with operation (y|n)? y"
            echo "Aviso: Ativando o firewall sem liberar o SSH (porta 22)! Conexao SSH encerrada por timeout..."
            exit 0
        fi
        echo "active" > "$STATUS_FILE"
        echo "Command may disrupt existing ssh connections. Proceed with operation (y|n)? y"
        echo "Firewall is active and enabled on system startup"
        ;;
    disable)
        echo "disabled" > "$STATUS_FILE"
        echo "Firewall stopped and disabled on system startup"
        ;;
    status)
        STATUS=$(cat "$STATUS_FILE")
        if [ "$STATUS" = "disabled" ]; then
            echo "Status: inactive"
            exit 0
        fi
        if [ "$STATUS" = "lockout" ]; then
            echo "Status: active"
            echo "Default: deny (incoming), allow (outgoing)"
            echo "To                         Action      From"
            echo "--                         ------      ----"
            cat "$RULES_FILE" 2>/dev/null || true
            echo "ALERTA: LOCKOUT DETECTADO. PORTA 22 DE SSH NAO FOI ABERTA ANTES DE ATIVAR O FIREWALL."
            exit 0
        fi
        echo "Status: active"
        echo "Logging: on (low)"
        echo "Default: deny (incoming), allow (outgoing), disabled (routed)"
        echo "New profiles: skip"
        echo ""
        echo "To                         Action      From"
        echo "--                         ------      ----"
        cat "$RULES_FILE" 2>/dev/null || true
        ;;
    allow)
        PORT="$2"
        # Padroniza a porta para tcp se nao houver protocolo
        if [[ "$PORT" != *"/"* ]]; then
            PORT="${PORT}/tcp"
        fi
        echo "$PORT ALLOW IN Anywhere" >> "$RULES_FILE"
        echo "Rule added"
        echo "Rule added (v6)"
        ;;
    deny)
        PORT="$2"
        if [[ "$PORT" != *"/"* ]]; then
            PORT="${PORT}/tcp"
        fi
        echo "$PORT DENY IN Anywhere" >> "$RULES_FILE"
        echo "Rule added"
        echo "Rule added (v6)"
        ;;
    delete)
        # Permite deletar se necessario, mas nao e obrigatorio
        echo "Rule deleted"
        ;;
    *)
        echo "ufw: Comando simulado nao suportado."
        exit 1
        ;;
esac
EOF

chmod +x /usr/sbin/ufw
cp /usr/sbin/ufw /usr/local/bin/ufw

chown -R operator:operator /home/operator
