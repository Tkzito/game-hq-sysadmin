import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste: Sucesso (Com o arquivo bytes.txt contendo o tamanho correto 23)
payload_success = {
    "levelId": "m1_s1_l6",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "wc --help\nwc -c dados_rede.txt\necho \"23\" > bytes.txt\n",
                "permissions": 644
            },
            "dados_rede.txt": {
                "type": "file",
                "content": "AURA-NET-ACCESS-GRANTED",
                "permissions": 644
            },
            "bytes.txt": {
                "type": "file",
                "content": "23\n",
                "permissions": 644
            }
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 6 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
