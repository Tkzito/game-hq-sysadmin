import subprocess
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Função auxiliar para verificar se o nível existe no sistema de arquivos
def get_level_path(level_id):
    path = f"levels/level{level_id}"
    return path if os.path.exists(path) else None

def run_command(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
        return result.stdout.strip()
    except Exception as e:
        return str(e)

@app.route('/api/start', methods=['POST'])
def start_level():
    data = request.json
    level_id = data.get('level_id')
    path = get_level_path(level_id)
    
    if not path:
        return jsonify({"success": False, "error": f"Nível {level_id} não encontrado."})
    
    container_name = f"game-bunker7-level{level_id}"
    image_name = f"gamehq-level{level_id}"
    
    # Build e Run dinâmico
    run_command(f"docker build -t {image_name} {path}")
    run_command(f"docker rm -f {container_name}")
    run_command(f"docker run -d --name {container_name} {image_name}")
    
    return jsonify({"success": True, "message": f"Nível {level_id} montado e ativo."})

@app.route('/api/exec', methods=['POST'])
def execute():
    data = request.json
    level_id = data.get('level_id')
    command = data.get('command', '')
    container_name = f"game-bunker7-level{level_id}"
    
    # Executa o comando dentro do container do nível específico
    output = run_command(f"docker exec -u operator {container_name} bash -c '{command}'")
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
