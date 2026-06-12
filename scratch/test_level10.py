import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste 1: Falha (Sem permissão de execução)
payload_fail_perms = {
    "levelId": "m1_s1_l10",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "cd .bunker_config/sistema/scripts\n./ligar_coolers.sh\n",
                "permissions": 644
            }
        },
        "/.bunker_config/sistema/scripts": {
            "ligar_coolers.sh": {
                "type": "file",
                "content": 'echo "⚙️ [SYSTEM] Ativando exaustores auxiliares do Bunker 7..."\necho "🌬️ [PNEUMA] Fluxo de O2 normalizado em 21%."',
                "permissions": 644  # Not executable
            }
        }
    }
}

# Teste 2: Falha (Sem ter executado)
payload_fail_not_executed = {
    "levelId": "m1_s1_l10",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "cd .bunker_config/sistema/scripts\nchmod +x ligar_coolers.sh\n",
                "permissions": 644
            }
        },
        "/.bunker_config/sistema/scripts": {
            "ligar_coolers.sh": {
                "type": "file",
                "content": 'echo "⚙️ [SYSTEM] Ativando exaustores auxiliares do Bunker 7..."\necho "🌬️ [PNEUMA] Fluxo de O2 normalizado em 21%."',
                "permissions": 755
            }
        }
    }
}

# Teste 3: Sucesso (Com permissão e executado)
payload_success = {
    "levelId": "m1_s1_l10",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "cd .bunker_config/sistema/scripts\nchmod +x ligar_coolers.sh\n./ligar_coolers.sh\n",
                "permissions": 644
            }
        },
        "/.bunker_config/sistema/scripts": {
            "ligar_coolers.sh": {
                "type": "file",
                "content": 'echo "⚙️ [SYSTEM] Ativando exaustores auxiliares do Bunker 7..."\necho "🌬️ [PNEUMA] Fluxo de O2 normalizado em 21%."',
                "permissions": 755
            }
        }
    }
}

def run_test(name, payload):
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode('utf-8')
            print(f"--- Test: {name} ---")
            print(json.dumps(json.loads(body), indent=2))
    except Exception as e:
        print(f"Error running {name}: {e}")

run_test("Fail due to permissions", payload_fail_perms)
run_test("Fail due to no execution in history", payload_fail_not_executed)
run_test("Success case", payload_success)
