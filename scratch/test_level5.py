import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste: Sucesso (Com o arquivo codigo_erro.txt contendo o codigo correto)
payload_success = {
    "levelId": "m1_s1_l5",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "tail -n 10 sistema.log\necho \"ERR-AUDIO-909\" > codigo_erro.txt\n",
                "permissions": 644
            },
            "sistema.log": {
                "type": "file",
                "content": "[INFO] Starting...\n[ERROR] Failed memory map: ERR-AUDIO-909\n",
                "permissions": 644
            },
            "codigo_erro.txt": {
                "type": "file",
                "content": "ERR-AUDIO-909\n",
                "permissions": 644
            }
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 5 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
