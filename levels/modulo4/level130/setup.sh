#!/bin/bash
set -euo pipefail

# 1. Configura o usuario admin com senha admin
if ! id "admin" >/dev/null 2>&1; then
    useradd -m -s /bin/bash admin
fi
echo "admin:admin" | chpasswd
echo "admin ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/admin
chmod 0440 /etc/sudoers.d/admin

# 2. Configura e inicia o SSH Daemon na porta 2222
mkdir -p /var/run/sshd
ssh-keygen -A || true
pkill -f "sshd -p 2222" || true
/usr/sbin/sshd -p 2222 \
    -o "PermitRootLogin=yes" \
    -o "PasswordAuthentication=yes" \
    -o "AuthorizedKeysFile=.ssh/authorized_keys" \
    -o "UsePAM=no"

# 3. Configura o servico de sincronizacao fake na porta 8443
mkdir -p /var/www-sync
echo '{"status":"healthy"}' > /var/www-sync/health
pkill -f "http.server 8443" || true
nohup python3 -m http.server 8443 --directory /var/www-sync >/dev/null 2>&1 &

# 4. Cria o arquivo de log de sincronizacao na filial
mkdir -p /var/log
echo "[ERROR] Sincronizacao falhou na porta 8443. Connection refused. Verifique se o UFW possui regra 'allow 8443/tcp'." > /var/log/sync.log
chown admin:admin /var/log/sync.log

# 5. Limpa a entrada de filial-caruaru no hosts
sed -i '/filial-caruaru.saoluis.local/d' /etc/hosts

# 6. Pre-configura as regras e o status inicial do UFW mockado (firewall comeca ativo bloqueando)
mkdir -p /var/tmp
echo "active" > /var/tmp/ufw_status.txt
echo "22/tcp ALLOW IN Anywhere" > /var/tmp/ufw_rules.txt

# 7. Cria o mock do UFW
cat << 'EOF' > /usr/sbin/ufw
#!/bin/bash
RULES_FILE="/var/tmp/ufw_rules.txt"
STATUS_FILE="/var/tmp/ufw_status.txt"
touch "$RULES_FILE" "$STATUS_FILE"

case "$1" in
    enable)
        echo "active" > "$STATUS_FILE"
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
        echo "Status: active"
        echo "Default: deny (incoming), allow (outgoing)"
        echo "To                         Action      From"
        echo "--                         ------      ----"
        cat "$RULES_FILE" 2>/dev/null || true
        ;;
    allow)
        PORT="$2"
        if [[ "$PORT" != *"/"* ]]; then
            PORT="${PORT}/tcp"
        fi
        echo "$PORT ALLOW IN Anywhere" >> "$RULES_FILE"
        echo "Rule added"
        ;;
    deny)
        PORT="$2"
        if [[ "$PORT" != *"/"* ]]; then
            PORT="${PORT}/tcp"
        fi
        echo "$PORT DENY IN Anywhere" >> "$RULES_FILE"
        echo "Rule added"
        ;;
    *)
        echo "ufw: Comando simulado nao suportado."
        exit 1
        ;;
esac
EOF
chmod +x /usr/sbin/ufw
cp /usr/sbin/ufw /usr/local/bin/ufw

# 8. Cria o wrapper de SSH
cat << 'EOF' > /usr/bin/ssh
#!/bin/bash
ARGS=()
for arg in "$@"; do
    if [[ "$arg" == *"@192.168.2.100" ]] || [[ "$arg" == "192.168.2.100" ]]; then
        user="${arg%%@*}"
        if [[ "$user" == "$arg" ]]; then user="admin"; fi
        ARGS+=("-p" "2222" "${user}@localhost")
    elif [[ "$arg" == *"@filial-caruaru.saoluis.local" ]] || [[ "$arg" == "filial-caruaru.saoluis.local" ]]; then
        user="${arg%%@*}"
        if [[ "$user" == "$arg" ]]; then user="admin"; fi
        ARGS+=("-p" "2222" "${user}@localhost")
    else
        ARGS+=("$arg")
    fi
done
exec /usr/bin/ssh.real -o StrictHostKeyChecking=no "${ARGS[@]}"
EOF
chmod +x /usr/bin/ssh

# 9. Cria o wrapper de SCP
cat << 'EOF' > /usr/bin/scp
#!/bin/bash
ARGS=()
for arg in "$@"; do
    if [[ "$arg" == *"192.168.2.100:"* ]]; then
        path="${arg#*:}"
        user_host="${arg%%:*}"
        user="${user_host%%@*}"
        if [[ "$user" == "$user_host" ]]; then user="admin"; fi
        ARGS+=("-P" "2222" "${user}@localhost:${path}")
    elif [[ "$arg" == *"filial-caruaru.saoluis.local:"* ]]; then
        path="${arg#*:}"
        user_host="${arg%%:*}"
        user="${user_host%%@*}"
        if [[ "$user" == "$user_host" ]]; then user="admin"; fi
        ARGS+=("-P" "2222" "${user}@localhost:${path}")
    else
        ARGS+=("$arg")
    fi
done
exec /usr/bin/scp.real -o StrictHostKeyChecking=no "${ARGS[@]}"
EOF
chmod +x /usr/bin/scp

# 10. Cria o wrapper de CURL
cat << 'EOF' > /usr/bin/curl
#!/bin/bash
if [[ "$*" == *"8443"* ]]; then
    RULES_FILE="/var/tmp/ufw_rules.txt"
    if [ -f "$RULES_FILE" ] && grep -qE "(8443/tcp ALLOW|8443 ALLOW)" "$RULES_FILE"; then
        NEW_ARGS=()
        for arg in "$@"; do
            if [[ "$arg" == *"192.168.2.100"* ]]; then
                NEW_ARGS+=("${arg/192.168.2.100/localhost}")
            elif [[ "$arg" == *"filial-caruaru.saoluis.local"* ]]; then
                NEW_ARGS+=("${arg/filial-caruaru.saoluis.local/localhost}")
            else
                NEW_ARGS+=("$arg")
            fi
        done
        exec /usr/bin/curl.real "${NEW_ARGS[@]}"
    else
        echo "curl: (7) Failed to connect to 192.168.2.100 port 8443: Connection timed out" >&2
        exit 7
    fi
else
    exec /usr/bin/curl.real "$@"
fi
EOF
chmod +x /usr/bin/curl

# Limpa resquicios locais
rm -f /home/operator/health_response.json

chown -R operator:operator /home/operator
