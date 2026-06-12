import subprocess
import os
import tempfile
import shutil
import base64
import tarfile
import gzip
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
        rc, _, stderr = run_command(f"docker build -t {image_name} \"{path}\"", timeout=180)
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
        rc, _, stderr = run_command(f"docker build -t {image_name} \"{path}\"", timeout=180)
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

        # 2. Extract baseline filesystem in container (created by setup.sh)
        container_files = {}
        rc, stdout, stderr = run_command(f"docker exec -u root {container_name} find /home/operator -mindepth 1 -exec stat -c '%n:%F:%a' {{}} +")
        if rc == 0 and stdout:
            for line in stdout.split('\n'):
                line = line.strip()
                if not line:
                    continue
                parts_stat = line.split(':')
                if len(parts_stat) >= 3:
                    c_path = parts_stat[0]
                    c_type = "dir" if "directory" in parts_stat[1].lower() else "file"
                    c_perms = int(parts_stat[2]) if parts_stat[2].isdigit() else 755
                    container_files[c_path] = {
                        "type": c_type,
                        "permissions": c_perms
                    }

        # 3. Read content/gzip-text from baseline files to skip unmodified ones
        for c_path, info in container_files.items():
            if info["type"] == "file":
                if c_path.endswith(".gz"):
                    rc_z, stdout_z, _ = run_command(f"docker exec -u root {container_name} zcat \"{c_path}\"")
                    info["gzip_text"] = stdout_z if rc_z == 0 else ""
                else:
                    rc_c, stdout_c, _ = run_command(f"docker exec -u root {container_name} cat \"{c_path}\"")
                    info["content"] = stdout_c if rc_c == 0 else ""

        # 4. Flatten player's virtualFS
        player_files = {}
        for dir_path, dir_contents in virtual_fs.items():
            for filename, item in dir_contents.items():
                rel_path = os.path.join(dir_path, filename).replace("//", "/")
                abs_path = ("/home/operator" + rel_path).replace("//", "/")
                player_files[abs_path] = {
                    "type": item.get("type"),
                    "content": item.get("content", ""),
                    "permissions": item.get("permissions")
                }

        # 5. Build difference profile
        to_delete = []
        for c_path in container_files:
            if c_path not in player_files:
                to_delete.append(c_path)

        scratch_dir = "/app/scratch" if os.path.exists("/app/scratch") else "."
        temp_dir = tempfile.mkdtemp(dir=scratch_dir)
        try:
            copied_any = False
            for abs_path, p_item in player_files.items():
                rel_p = abs_path.replace("/home/operator", "").lstrip("/")
                local_path = os.path.join(temp_dir, rel_p)
                
                is_unmodified = False
                if abs_path in container_files:
                    c_info = container_files[abs_path]
                    if c_info["type"] == p_item["type"]:
                        if p_item["type"] == "dir":
                            if p_item.get("permissions") == c_info["permissions"]:
                                is_unmodified = True
                        else:
                            p_content = p_item.get("content", "")
                            if p_content.startswith("__GZIP_TEXT__:") and "gzip_text" in c_info:
                                uncompressed_p = p_content[len("__GZIP_TEXT__:"):]
                                if uncompressed_p == c_info["gzip_text"] and p_item.get("permissions") == c_info["permissions"]:
                                    is_unmodified = True
                            elif p_content == c_info.get("content") and p_item.get("permissions") == c_info["permissions"]:
                                is_unmodified = True

                if is_unmodified:
                    continue

                os.makedirs(os.path.dirname(local_path), exist_ok=True)
                if p_item["type"] == "dir":
                    os.makedirs(local_path, exist_ok=True)
                else:
                    content = p_item["content"]
                    if content.startswith("__BASE64__:"):
                        try:
                            b64_data = content[len("__BASE64__:"):]
                            binary_data = base64.b64decode(b64_data)
                            with open(local_path, 'wb') as f:
                                f.write(binary_data)
                        except Exception:
                            with open(local_path, 'wb') as f:
                                f.write(content.encode('utf-8', errors='replace'))
                    elif content.startswith("__TAR_GZ__:") or content.startswith("__GZIP__:"):
                        # Will be packed on host in step 6
                        with open(local_path, 'wb') as f:
                            f.write(content.encode('utf-8', errors='replace'))
                    else:
                        with open(local_path, 'wb') as f:
                            f.write(content.encode('utf-8', errors='replace'))

                    perms = p_item.get("permissions", 644)
                    try:
                        perm_str = str(perms)
                        if len(perm_str) == 3:
                            os.chmod(local_path, int(perm_str, 8))
                    except Exception:
                        pass
                copied_any = True

            # 6. Post-process archives on host
            for abs_path, p_item in player_files.items():
                if p_item["type"] == "file":
                    content = p_item["content"]
                    rel_p = abs_path.replace("/home/operator", "").lstrip("/")
                    local_path = os.path.join(temp_dir, rel_p)

                    if content.startswith("__TAR_GZ__:"):
                        files_to_pack = content[len("__TAR_GZ__:"):].split(",")
                        with tarfile.open(local_path, "w:gz") as tar:
                            for f in files_to_pack:
                                f = f.strip("/")
                                src_f_path = os.path.join(temp_dir, f)
                                if not os.path.exists(src_f_path):
                                    c_abs = ("/home/operator/" + f).replace("//", "/")
                                    if c_abs in container_files:
                                        rc_cat, stdout_cat, _ = run_command(f"docker exec -u root {container_name} cat \"{c_abs}\"")
                                        if rc_cat == 0:
                                            os.makedirs(os.path.dirname(src_f_path), exist_ok=True)
                                            with open(src_f_path, 'wb') as f_out:
                                                f_out.write(stdout_cat.encode('utf-8', errors='replace'))
                                
                                if os.path.exists(src_f_path):
                                    tar.add(src_f_path, arcname=f)
                    
                    elif content.startswith("__GZIP__:"):
                        src_rel = content[len("__GZIP__:"):].strip("/")
                        src_f_path = os.path.join(temp_dir, src_rel)
                        if not os.path.exists(src_f_path):
                            c_abs = ("/home/operator/" + src_rel).replace("//", "/")
                            if c_abs in container_files:
                                rc_cat, stdout_cat, _ = run_command(f"docker exec -u root {container_name} cat \"{c_abs}\"")
                                if rc_cat == 0:
                                    os.makedirs(os.path.dirname(src_f_path), exist_ok=True)
                                    with open(src_f_path, 'wb') as f_out:
                                        f_out.write(stdout_cat.encode('utf-8', errors='replace'))
                        
                        if os.path.exists(src_f_path):
                            with open(src_f_path, 'rb') as f_in:
                                with gzip.open(local_path, 'wb') as f_out:
                                    shutil.copyfileobj(f_in, f_out)

            # 7. Perform deletions
            for del_path in to_delete:
                run_command(f"docker exec -u root {container_name} rm -rf \"{del_path}\"")

            # 8. Copy to container
            if copied_any:
                rc_cp, _, stderr_cp = run_command(f"docker cp \"{temp_dir}/.\" {container_name}:/home/operator/")
                # Ensure correct ownership
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

import sys

if __name__ == '__main__':
    if len(sys.argv) > 1:
        # Running in CLI mode
        cmd = sys.argv[1]
        
        # Support both integer levels (e.g. 171) or string IDs (e.g. m9_l171)
        level_arg = sys.argv[2] if len(sys.argv) > 2 else ""
        
        # Convert integer to string ID if needed
        def get_level_id_from_int(val_str):
            if not val_str.isdigit():
                return val_str
            val = int(val_str)
            if val <= 100:
                sub = (val - 1) // 10 + 1
                lvl = (val - 1) % 10 + 1
                return f"m1_s{sub}_l{lvl}"
            elif val <= 110:
                return f"m2_l{val}"
            elif val <= 120:
                return f"m3_l{val}"
            elif val <= 130:
                return f"m4_l{val}"
            elif val <= 140:
                return f"m5_l{val}"
            elif val <= 150:
                return f"m6_l{val}"
            elif val <= 160:
                return f"m7_l{val}"
            elif val <= 170:
                return f"m8_l{val}"
            elif val <= 180:
                return f"m9_l{val}"
            elif val <= 190:
                return f"m10_l{val}"
            elif val <= 200:
                return f"m11_l{val}"
            elif val <= 210:
                return f"m12_l{val}"
            elif val <= 220:
                return f"m13_l{val}"
            elif val <= 230:
                return f"m14_l{val}"
            return val_str

        level_id = get_level_id_from_int(level_arg) if level_arg else ""
        path = get_level_path(level_id) if level_id else None
        
        container_name = "game-active-sandbox"
        
        if cmd == "build":
            if not path or not os.path.exists(path):
                print(f"Erro: Nível {level_arg} não encontrado.")
                sys.exit(1)
            parts = level_id.split('_')
            if len(parts) == 3:
                image_name = f"gamehq/levels_modulo{parts[0][1:]}_sub{parts[1][1:]}_level{parts[2][1:]}:latest"
            else:
                image_name = f"gamehq/levels_modulo{parts[0][1:]}_level{parts[1][1:]}:latest"
            
            print(f"Compilando imagem {image_name}...")
            rc, stdout, stderr = run_command(f"docker build -t {image_name} \"{path}\"", timeout=180)
            if rc != 0:
                print(f"Erro ao compilar: {stderr}")
                sys.exit(1)
            print("Imagem compilada com sucesso.")
            sys.exit(0)
            
        elif cmd == "start":
            if not path or not os.path.exists(path):
                print(f"Erro: Nível {level_arg} não encontrado.")
                sys.exit(1)
            parts = level_id.split('_')
            if len(parts) == 3:
                image_name = f"gamehq/levels_modulo{parts[0][1:]}_sub{parts[1][1:]}_level{parts[2][1:]}:latest"
            else:
                image_name = f"gamehq/levels_modulo{parts[0][1:]}_level{parts[1][1:]}:latest"
            
            # Check if image exists, otherwise build it
            rc, stdout, _ = run_command(f"docker images -q {image_name}")
            if not stdout:
                print(f"Imagem não encontrada. Compilando...")
                rc, _, stderr = run_command(f"docker build -t {image_name} \"{path}\"", timeout=180)
                if rc != 0:
                    print(f"Erro ao compilar imagem: {stderr}")
                    sys.exit(1)
            
            # Stop any previous sandbox
            run_command(f"docker rm -f {container_name}")
            
            # Run container
            rc, _, stderr = run_command(f"docker run -d -t --name {container_name} --cpus=0.5 --memory=256m {image_name}")
            if rc != 0:
                print(f"Erro ao iniciar container: {stderr}")
                sys.exit(1)
                
            # Run setup.sh if exists
            setup_path = os.path.join(path, "setup.sh")
            if os.path.exists(setup_path):
                rc, _, stderr = run_command(f"docker cp \"{setup_path}\" {container_name}:/setup.sh")
                if rc == 0:
                    run_command(f"docker exec -u root {container_name} chmod +x /setup.sh")
                    rc, _, stderr = run_command(f"docker exec -u root {container_name} /setup.sh")
            
            run_command(f"docker exec -u root {container_name} chown -R operator:operator /home/operator")
            print(f"Nível {level_arg} montado e ativo.")
            sys.exit(0)
            
        elif cmd == "stop":
            print("Encerrando container sandbox...")
            run_command(f"docker rm -f {container_name}")
            print("Container encerrado.")
            sys.exit(0)
            
        elif cmd == "check":
            if not path or not os.path.exists(path):
                print(f"Erro: Nível {level_arg} não encontrado.")
                sys.exit(1)
                
            # Copy validator.sh and execute it
            validator_path = os.path.join(path, "validator.sh")
            if not os.path.exists(validator_path):
                print("Erro: Nível não possui validador.")
                sys.exit(1)
                
            rc, _, stderr = run_command(f"docker cp \"{validator_path}\" {container_name}:/validator.sh")
            if rc != 0:
                print(f"Erro ao copiar validador: {stderr}")
                sys.exit(1)
                
            run_command(f"docker exec -u root {container_name} chmod +x /validator.sh")
            val_rc, val_stdout, val_stderr = run_command(f"docker exec -u operator {container_name} bash /validator.sh", timeout=12)
            
            if val_rc == 0:
                print("DESAFIO CONCLUÍDO COM SUCESSO")
                if val_stdout:
                    print(val_stdout)
                sys.exit(0)
            else:
                print("FALHA NA VALIDAÇÃO")
                if val_stdout:
                    print(val_stdout)
                if val_stderr:
                    print(val_stderr)
                sys.exit(1)
                
        elif cmd == "hint":
            if not path or not os.path.exists(path):
                print(f"Erro: Nível {level_arg} não encontrado.")
                sys.exit(1)
            briefing_file = os.path.join(path, "briefing.md")
            if os.path.exists(briefing_file):
                with open(briefing_file, "r", encoding="utf-8") as f:
                    content = f.read()
                print(content)
            else:
                print("Nenhuma dica disponível para este nível.")
            sys.exit(0)
            
        elif cmd == "shell":
            os.system(f"docker exec -it -u operator {container_name} bash")
            sys.exit(0)
            
        else:
            print(f"Comando desconhecido: {cmd}")
            sys.exit(1)
    else:
        # Running in HTTP server mode (Flask)
        app.run(host='0.0.0.0', port=8000)
