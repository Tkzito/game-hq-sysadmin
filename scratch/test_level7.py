import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste: Sucesso (Com o arquivo backup/firmware.bin criado e relatorio_final.txt criado na raiz e relatorio.txt removido de legado)
payload_success = {
    "levelId": "m1_s1_l7",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "mkdir backup\ncp legado/firmware.bin backup/\nmv legado/relatorio.txt relatorio_final.txt\n",
                "permissions": 644
            },
            "backup": {
                "type": "dir",
                "permissions": 755
            },
            "legado": {
                "type": "dir",
                "permissions": 755
            },
            "relatorio_final.txt": {
                "type": "file",
                "content": "dados antigos de relatorio",
                "permissions": 644
            }
        },
        "/backup": {
            "firmware.bin": {
                "type": "file",
                "content": "dados firmware",
                "permissions": 644
            }
        },
        "/legado": {
            "firmware.bin": {
                "type": "file",
                "content": "dados firmware",
                "permissions": 644
            }
            # relatorio.txt is deleted/removed
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 7 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
