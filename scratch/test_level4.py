import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Teste: Sucesso (Com as pastas 'sistema', 'sistema/config', 'sistema/scripts' e o arquivo 'sistema/config/aura.conf' criados)
payload_success = {
    "levelId": "m1_s1_l4",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "mkdir -p sistema/config sistema/scripts\ntouch sistema/config/aura.conf\n",
                "permissions": 644
            },
            "sistema": {
                "type": "dir",
                "permissions": 755
            }
        },
        "/sistema": {
            "config": {
                "type": "dir",
                "permissions": 755
            },
            "scripts": {
                "type": "dir",
                "permissions": 755
            }
        },
        "/sistema/config": {
            "aura.conf": {
                "type": "file",
                "content": "",
                "permissions": 644
            }
        },
        "/sistema/scripts": {}
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 4 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
