import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Test Nivel 2
payload = {
    "levelId": "m1_s1_l2",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "pwd\ncd estudos\n",
                "permissions": 644
            },
            "estudos": {
                "type": "dir",
                "permissions": 755
            }
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        status_code = response.getcode()
        body = response.read().decode('utf-8')
        print(f"Status Code: {status_code}")
        print("Response Body:")
        print(json.dumps(json.loads(body), indent=2))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Connection Error: {e}")
