import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste: Sucesso (Com o arquivo chave_ativacao.txt criado com o conteudo correto)
payload_success = {
    "levelId": "m1_s1_l3",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "ls -la\ncat .chave_bateria.txt\ncat .chave_bateria.txt > chave_ativacao.txt\n",
                "permissions": 644
            },
            ".chave_bateria.txt": {
                "type": "file",
                "content": "CHAVE-SOLAR-9982",
                "permissions": 600
            },
            "chave_ativacao.txt": {
                "type": "file",
                "content": "CHAVE-SOLAR-9982",
                "permissions": 644
            }
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 3 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
