FROM gamehq-compile-base:latest

# Install ufw mock
RUN cat << 'EOF' > /usr/local/bin/ufw
#!/usr/bin/env python3
import sys
import os

RULES_FILE = '/home/operator/.ufw_rules'
USAGE_FILE = '/home/operator/.ufw_usage'

def main():
    args = sys.argv[1:]
    try:
        with open(USAGE_FILE, 'a') as f:
            f.write("ufw " + " ".join(args) + "\n")
        os.chmod(USAGE_FILE, 0o666)
    except:
        pass
        
    if not args:
        print("Usage: ufw [command] [args]")
        return

    cmd = args[0]
    if cmd == 'deny':
        if len(args) >= 5 and args[1] == 'from' and args[3] == 'to' and args[4] == 'any':
            ip = args[2]
            try:
                with open(RULES_FILE, 'a') as f:
                    f.write(f"deny from {ip} to any\n")
                os.chmod(RULES_FILE, 0o666)
            except:
                pass
            print("Rule added")
            print("Rule added (v6)")
        elif len(args) == 2:
            # simple format: ufw deny IP
            ip = args[1]
            try:
                with open(RULES_FILE, 'a') as f:
                    f.write(f"deny from {ip} to any\n")
                os.chmod(RULES_FILE, 0o666)
            except:
                pass
            print("Rule added")
        else:
            print("Unsupported deny rule format. Try: ufw deny from [IP] to any")
    elif cmd == 'status':
        print("Status: active")
        print(f"{'To':<20}{'Action':<10}{'From':<20}")
        print(f"{'--':<20}{'------':<10}{'----':<20}")
        if os.path.exists(RULES_FILE):
            with open(RULES_FILE, 'r') as f:
                for line in f:
                    parts = line.strip().split()
                    if len(parts) >= 5:
                        ip = parts[2]
                        print(f"{'Anywhere':<20}{'DENY':<10}{ip:<20}")
    else:
        print("Firewall rule updated (simulated).")

if __name__ == '__main__':
    main()
EOF

RUN chmod +x /usr/local/bin/ufw
