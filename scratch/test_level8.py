import urllib.request
import json

url = "http://localhost:8000/api/validate"
headers = {"Content-Type": "application/json"}

# Test: Success (without cache.tmp and without cache_velho/)
payload_success = {
    "levelId": "m1_s1_l8",
    "virtualFS": {
        "/": {
            ".bash_history": {
                "type": "file",
                "content": "rm cache.tmp\nrm -rf cache_velho\n",
                "permissions": 644
            }
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(payload_success).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        body = response.read().decode('utf-8')
        print("--- Test Level 8 Success case ---")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print(f"Error running test: {e}")
