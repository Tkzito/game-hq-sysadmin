import subprocess
import os
import tempfile
import shutil
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def run_command(cmd, timeout=15):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return result.returncode, result.stdout.strip(), result.stderr.strip()
    except Exception as e:
        return -1, "", str(e)

# Maps levelId to path, e.g. m1_s1_l2 -> levels/modulo1/sub1/level2
def get_level_path(level_id):
    parts = level_id.split('_')
    if len(parts) == 3 and parts[0].startswith('m') and parts[1].startswith('s') and parts[2].startswith('l'):
        module_num = parts[0][1:]
        sub_num = parts[1][1:]
        level_num = parts[2][1:]
        return f"levels/modulo{module_num}/sub{sub_num}/level{level_num}"
    elif len(parts) == 2 and parts[0].startswith('m') and parts[1].startswith('l'):
        module_num = parts[0][1:]
        level_num = parts[1][1:]
        return f"levels/modulo{module_num}/level{level_num}"
    return None

@app.route('/api/start', methods=['POST'])
def start_level():
    data = request.json
    level_id = data.get('level_id')
    path = get_level_path(level_id)
    
    if not path or not os.path.exists(path):
        return jsonify({"success": False, "error": f"Nível {level_id} não encontrado."})
    
    container_name = "game-active-sandbox"
    # Identify image name
    parts = level_id.split('_')
    if len(parts) == 3:
        image_name = f"gamehq/levels_modulo{parts[0][1:]}_sub{parts[1][1:]}_level{parts[2][1:]}:latest"
    else:
        image_name = f"gamehq/levels_modulo{parts[0][1:]}_level{parts[1][1:]}:latest"
    
    # Check if image exists, otherwise build it
    rc, stdout, _ = run_command(f"docker images -q {image_name}")
    if not stdout:
        rc, _, stderr = run_command(f"docker build -t {image_name} \"{path}\"")
        if rc != 0:
            return jsonify({"success": False, "error": f"Erro ao compilar imagem: {stderr}"})

    # Stop any previous sandbox to guarantee only one container runs at a time
    run_command(f"docker rm -f {container_name}")
    
    # Run with -t to keep container alive
    rc, _, stderr = run_command(f"docker run -d -t --name {container_name} --cpus=0.5 --memory=256m {image_name}")
    if rc != 0:
        return jsonify({"success": False, "error": f"Erro ao iniciar container: {stderr}"})
    
    return jsonify({"success": True, "message": f"Nível {level_id} montado e ativo."})

@app.route('/api/exec', methods=['POST'])
def execute():
    data = request.json
    command = data.get('command', '')
    container_name = "game-active-sandbox"
    
    # Executa o comando no container sandbox único ativo
    rc, stdout, stderr = run_command(f"docker exec -u operator {container_name} bash -c '{command}'")
    output = stdout if rc == 0 else (stderr if stderr else f"Exit code {rc}")
    return jsonify({"output": output})

@app.route('/api/validate', methods=['POST'])
def validate_level():
    data = request.json
    level_id = data.get('levelId')
    virtual_fs = data.get('virtualFS', {})
    
    path = get_level_path(level_id)
    if not path or not os.path.exists(path):
        return jsonify({"success": False, "message": f"Nível {level_id} não encontrado no backend."})
        
    container_name = "game-active-sandbox"
    parts = level_id.split('_')
    if len(parts) == 3:
        image_name = f"gamehq/levels_modulo{parts[0][1:]}_sub{parts[1][1:]}_level{parts[2][1:]}:latest"
    else:
        image_name = f"gamehq/levels_modulo{parts[0][1:]}_level{parts[1][1:]}:latest"
        
    # Check if image exists, otherwise build it
    rc, stdout, _ = run_command(f"docker images -q {image_name}")
    if not stdout:
        rc, _, stderr = run_command(f"docker build -t {image_name} \"{path}\"")
        if rc != 0:
            return jsonify({"success": False, "message": f"Erro ao compilar imagem do container: {stderr}"})
            
    # Clean up previous container to ensure only one runs at a time
    run_command(f"docker rm -f {container_name}")
    
    # Run container in background with resource limits
    rc, _, stderr = run_command(f"docker run -d -t --name {container_name} --cpus=0.5 --memory=256m {image_name}")
    if rc != 0:
        return jsonify({"success": False, "message": f"Erro ao iniciar container do sandbox: {stderr}"})
        
    try:
        # 1. Run setup.sh inside the container if it exists
        setup_path = os.path.join(path, "setup.sh")
        if os.path.exists(setup_path):
            rc, _, stderr = run_command(f"docker cp \"{setup_path}\" {container_name}:/setup.sh")
            if rc == 0:
                run_command(f"docker exec -u root {container_name} chmod +x /setup.sh")
                rc, _, stderr = run_command(f"docker exec -u root {container_name} /setup.sh")

        # 2. Rebuild and copy virtualFS files to /home/operator/ in the container
        scratch_dir = "/app/scratch" if os.path.exists("/app/scratch") else "."
        temp_dir = tempfile.mkdtemp(dir=scratch_dir)
        try:
            for dir_path, dir_contents in virtual_fs.items():
                local_dir = temp_dir + dir_path
                os.makedirs(local_dir, exist_ok=True)
                
                for filename, item in dir_contents.items():
                    if item.get("type") == "dir":
                        os.makedirs(os.path.join(local_dir, filename), exist_ok=True)
                    elif item.get("type") == "file":
                        file_path = os.path.join(local_dir, filename)
                        content = item.get("content", "")
                        with open(file_path, 'wb') as f:
                            f.write(content.encode('utf-8', errors='replace'))
                        
                        perms = item.get("permissions", 644)
                        try:
                            perm_str = str(perms)
                            if len(perm_str) == 3:
                                os.chmod(file_path, int(perm_str, 8))
                        except Exception:
                            pass

            # Copy virtualFS contents to container /home/operator/
            rc, _, stderr = run_command(f"docker cp \"{temp_dir}/.\" {container_name}:/home/operator/")
            # Set ownership to operator
            run_command(f"docker exec -u root {container_name} chown -R operator:operator /home/operator")
            
        finally:
            shutil.rmtree(temp_dir, ignore_errors=True)

        # 3. Copy validator.sh and execute it
        validator_path = os.path.join(path, "validator.sh")
        if not os.path.exists(validator_path):
            return jsonify({"success": False, "message": f"Nível {level_id} não possui validador."})
            
        rc, _, stderr = run_command(f"docker cp \"{validator_path}\" {container_name}:/validator.sh")
        if rc != 0:
            return jsonify({"success": False, "message": f"Erro ao copiar validador: {stderr}"})
            
        run_command(f"docker exec -u root {container_name} chmod +x /validator.sh")
        
        # Run validator as operator
        val_rc, val_stdout, val_stderr = run_command(f"docker exec -u operator {container_name} bash /validator.sh", timeout=12)
        
        success = (val_rc == 0)
        msg_parts = []
        if val_stdout:
            msg_parts.append(val_stdout)
        if val_stderr:
            msg_parts.append(val_stderr)
        message = "\n".join(msg_parts) if msg_parts else ("Sucesso!" if success else "Validação falhou.")
        
        return jsonify({
            "success": success,
            "message": message
        })
        
    finally:
        # Clean up immediately after verification
        run_command(f"docker rm -f {container_name}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
