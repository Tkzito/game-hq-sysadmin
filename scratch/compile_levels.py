import os
import re
import json
import subprocess

LEVELS_DIR = "/mnt/dados/workspaces/Game HQ/levels/modulo1"
OUTPUT_FILE = "/mnt/dados/workspaces/Game HQ/src/data/challenges/mod1_generated.ts"

def run_command(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True)
    return result.stdout.decode('utf-8', errors='replace').strip()

import time

def run_command_verbose(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True)
    if result.returncode != 0:
        print(f"Command failed: {cmd}\nStderr: {result.stderr.decode('utf-8', errors='replace').strip()}", flush=True)
    return result.stdout.decode('utf-8', errors='replace').strip()

def get_fs_from_container(path):
    # Start temp container
    container_name = "level-fs-extractor"
    run_command("docker rm -f " + container_name)
    run_command_verbose(f"docker run -d -u root --name {container_name} gamehq-compile-base tail -f /dev/null")
    time.sleep(0.3)
    
    try:
        # Execute setup.sh if exists
        setup_path = os.path.join(path, "setup.sh")
        if os.path.exists(setup_path):
            run_command_verbose(f"docker cp \"{setup_path}\" {container_name}:/setup.sh")
            run_command_verbose(f"docker exec {container_name} chmod +x /setup.sh")
            run_command_verbose(f"docker exec {container_name} /setup.sh")
            
        # Scan /home/operator recursively
        # Find all files and dirs
        find_out = run_command_verbose(f"docker exec {container_name} find /home/operator -mindepth 1")
        if not find_out:
            return {}
            
        initial_fs = {}
        paths = find_out.split('\n')
        
        for p in paths:
            p = p.strip()
            if not p:
                continue
                
            # Get type
            ftype = run_command_verbose(f"docker exec {container_name} stat -c '%F' \"{p}\"")
            # Get permissions
            perms_str = run_command_verbose(f"docker exec {container_name} stat -c '%a' \"{p}\"")
            permissions = int(perms_str) if perms_str.isdigit() else 755
            
            # Map /home/operator to / in the virtualFS
            rel_p = p.replace("/home/operator", "")
            if not rel_p.startswith("/"):
                rel_p = "/" + rel_p
                
            dirname = os.path.dirname(rel_p)
            basename = os.path.basename(rel_p)
            
            if not dirname:
                dirname = "/"
                
            if dirname not in initial_fs:
                initial_fs[dirname] = {}
                
            if "directory" in ftype.lower():
                initial_fs[dirname][basename] = {
                    "type": "dir",
                    "permissions": permissions
                }
            else:
                is_binary = False
                content = ""
                if basename.endswith(".gz"):
                    zcat_out = run_command_verbose(f"docker exec {container_name} zcat \"{p}\"")
                    if zcat_out and not zcat_out.startswith("Command failed:"):
                        content = "__GZIP_TEXT__:" + zcat_out
                    else:
                        is_binary = True
                elif basename.endswith(".png") or basename.endswith(".bin") or basename.endswith(".tar.gz") or basename.endswith(".key") or basename.endswith(".db"):
                    is_binary = True
                else:
                    raw_content = run_command_verbose(f"docker exec {container_name} cat \"{p}\"")
                    # Simple heuristic for binary data detection
                    if "\x00" in raw_content or any(ord(c) > 127 for c in raw_content[:10]):
                        is_binary = True
                    else:
                        content = raw_content

                if is_binary:
                    b64_content = run_command_verbose(f"docker exec {container_name} base64 \"{p}\" | tr -d '\\r\\n'")
                    content = "__BASE64__:" + b64_content

                initial_fs[dirname][basename] = {
                    "type": "file",
                    "content": content,
                    "permissions": permissions
                }
                
        return initial_fs
    finally:
        run_command(f"docker rm -f {container_name}")

def compile_module(levels_dir, output_file, module_name, is_subdivided, module_id_prefix, module_number=2):
    challenges = []
    
    if is_subdivided:
        for sub in sorted(os.listdir(levels_dir)):
            sub_path = os.path.join(levels_dir, sub)
            if not os.path.isdir(sub_path) or not sub.startswith("sub"):
                continue
                
            sub_num = int(sub.replace("sub", ""))
            
            for lvl in sorted(os.listdir(sub_path), key=lambda x: int(x.replace("level", "")) if x.replace("level", "").isdigit() else 999):
                lvl_path = os.path.join(sub_path, lvl)
                if not os.path.isdir(lvl_path) or not lvl.startswith("level"):
                    continue
                    
                lvl_num = int(lvl.replace("level", ""))
                absolute_level_num = (sub_num - 1) * 10 + lvl_num
                
                # Skip levels 1 and 10 of sub1 since they are defined in mod1.ts
                if sub_num == 1 and (lvl_num == 1 or lvl_num == 10):
                    continue
                    
                print(f"Compiling Submódulo {sub_num}, Nível {lvl_num} (Nível Geral {absolute_level_num})...")
                
                briefing_file = os.path.join(lvl_path, "briefing.md")
                title = f"Nível {absolute_level_num}"
                briefing_content = ""
                
                if os.path.exists(briefing_file):
                    with open(briefing_file, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        if lines:
                            first_line = lines[0].strip()
                            if first_line.startswith("#"):
                                title = first_line.replace("#", "").strip()
                            briefing_content = "".join(lines[1:]).strip()
                
                initial_fs = get_fs_from_container(lvl_path)
                
                difficulty = "easy"
                if absolute_level_num > 40:
                    difficulty = "medium"
                if absolute_level_num > 80:
                    difficulty = "hard"
                    
                challenge = {
                    "id": f"{module_id_prefix}_s{sub_num}_l{lvl_num}",
                    "module": module_name,
                    "name": title,
                    "actName": "Ato I: O Despertar",
                    "difficulty": difficulty,
                    "salary": 100,
                    "briefing": briefing_content,
                    "storySegment": "",
                    "validationType": "bash_script",
                    "liveSchematicType": "telemetry_offline",
                    "hint": "",
                    "initialFS": initial_fs
                }
                challenges.append(challenge)
    else:
        # Calculate dynamic skip levels
        if module_number >= 9:
            skip_levels = []
        else:
            skip_levels = [10 * (module_number + 8) + 1, 10 * (module_number + 9)]
        
        # Calculate dynamic live schematic
        live_schematic = "security_mesh"
        if module_id_prefix == "m3":
            live_schematic = "cpu_temperature"
        elif module_id_prefix in ["m4", "m9"]:
            live_schematic = "ssh_routes"
        elif module_id_prefix in ["m5", "m6", "m11"]:
            live_schematic = "shell_loop"
        elif module_id_prefix in ["m7", "m8", "m14"]:
            live_schematic = "cluster_status"
        elif module_id_prefix == "m10":
            live_schematic = "security_mesh"
        elif module_id_prefix == "m12":
            live_schematic = "solar_power"
        elif module_id_prefix == "m13":
            live_schematic = "cpu_temperature"
            
        salaries_map = {
            2: (250, 350),
            3: (400, 450),
            4: (600, 700),
            5: (800, 950),
            6: (800, 1000),
            7: (1200, 1400),
            8: (1500, 2000),
            9: (2000, 2500),
            10: (2500, 3000),
            11: (3000, 3500),
            12: (3500, 4000),
            13: (4000, 4500),
            14: (5000, 6000)
        }
        base_sal, final_sal = salaries_map.get(module_number, (250, 350))

        for lvl in sorted(os.listdir(levels_dir), key=lambda x: int(x.replace("level", "")) if x.replace("level", "").isdigit() else 999):
            lvl_path = os.path.join(levels_dir, lvl)
            if not os.path.isdir(lvl_path) or not lvl.startswith("level"):
                continue
                
            lvl_num = int(lvl.replace("level", ""))
            
            if lvl_num in skip_levels:
                continue
                
            print(f"Compiling {module_name}, Nível {lvl_num}...")
            
            briefing_file = os.path.join(lvl_path, "briefing.md")
            title = f"Nível {lvl_num}"
            briefing_content = ""
            
            if os.path.exists(briefing_file):
                with open(briefing_file, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    if lines:
                        first_line = lines[0].strip()
                        if first_line.startswith("#"):
                            title = first_line.replace("#", "").strip()
                        briefing_content = "".join(lines[1:]).strip()
            
            initial_fs = get_fs_from_container(lvl_path)
            
            # Dynamic difficulty
            rel_num = lvl_num % 10
            if rel_num == 0:
                rel_num = 10
                
            difficulty = "easy"
            if rel_num >= 4:
                difficulty = "medium"
            if rel_num >= 8:
                difficulty = "hard"
            if rel_num == 10 and module_number == 8:
                difficulty = "legendary"
                
            # Dynamic salary
            salary = final_sal if lvl_num == 10 * (module_number + 9) else base_sal
            
            # Dynamic act name
            act_name = "Ato I: O Despertar"
            if lvl_num >= 110:
                act_name = "Ato II: O Profissional"
            if lvl_num >= 131:
                act_name = "Ato III: O Especialista"
            if lvl_num >= 160:
                act_name = "Ato IV: O Engenheiro"
                
            challenge = {
                "id": f"{module_id_prefix}_l{lvl_num}",
                "module": module_name,
                "name": title,
                "actName": act_name,
                "difficulty": difficulty,
                "salary": salary,
                "briefing": briefing_content,
                "storySegment": "",
                "validationType": "bash_script",
                "liveSchematicType": live_schematic,
                "hint": "",
                "initialFS": initial_fs
            }
            challenges.append(challenge)
            
    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('import { Challenge } from "../../types";\n\n')
        f.write(f'export const {module_id_prefix.upper()}_GENERATED: Challenge[] = ')
        f.write(json.dumps(challenges, indent=2, ensure_ascii=False))
        f.write(';\n')

def compile_all():
    # Compile Module 1
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo1",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod1_generated.ts",
        module_name="Módulo 1: O Despertar do Shell",
        is_subdivided=True,
        module_id_prefix="m1"
    )
    
    # Compile Module 2
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo2",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod2_generated.ts",
        module_name="Módulo 2: Permissões, Usuários e Segurança POSIX",
        is_subdivided=False,
        module_id_prefix="m2",
        module_number=2
    )

    # Compile Module 3
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo3",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod3_generated.ts",
        module_name="Módulo 3: Monitoramento de Processos e Recursos",
        is_subdivided=False,
        module_id_prefix="m3",
        module_number=3
    )

    # Compile Module 4
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo4",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod4_generated.ts",
        module_name="Módulo 4: Fundamentos de Redes e Acesso Remoto",
        is_subdivided=False,
        module_id_prefix="m4",
        module_number=4
    )

    # Compile Module 5
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo5",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod5_generated.ts",
        module_name="Módulo 5: Automação e Shell Scripting Avançado",
        is_subdivided=False,
        module_id_prefix="m5",
        module_number=5
    )

    # Compile Module 6
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo6",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod6_generated.ts",
        module_name="Módulo 6: Versionamento e Pipeline CI/CD",
        is_subdivided=False,
        module_id_prefix="m6",
        module_number=6
    )

    # Compile Module 7
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo7",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod7_generated.ts",
        module_name="Módulo 7: Conteinerização e Orquestração Local",
        is_subdivided=False,
        module_id_prefix="m7",
        module_number=7
    )

    # Compile Module 8
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo8",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod8_generated.ts",
        module_name="Módulo 8: SRE e Cibersegurança Internacional",
        is_subdivided=False,
        module_id_prefix="m8",
        module_number=8
    )

    # Compile Module 9
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo9",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod9_generated.ts",
        module_name="Módulo 9: Servidores Web, Proxies Reversos e SSL/TLS",
        is_subdivided=False,
        module_id_prefix="m9",
        module_number=9
    )

    # Compile Module 10
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo10",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod10_generated.ts",
        module_name="Módulo 10: Infraestrutura como Código (IaC) com Terraform",
        is_subdivided=False,
        module_id_prefix="m10",
        module_number=10
    )

    # Compile Module 11
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo11",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod11_generated.ts",
        module_name="Módulo 11: Provisionamento e Gerenciamento com Ansible",
        is_subdivided=False,
        module_id_prefix="m11",
        module_number=11
    )

    # Compile Module 12
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo12",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod12_generated.ts",
        module_name="Módulo 12: Arquitetura de Nuvem Pública (AWS)",
        is_subdivided=False,
        module_id_prefix="m12",
        module_number=12
    )

    # Compile Module 13
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo13",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod13_generated.ts",
        module_name="Módulo 13: Observabilidade, Métricas e Dashboards",
        is_subdivided=False,
        module_id_prefix="m13",
        module_number=13
    )

    # Compile Module 14
    compile_module(
        levels_dir="/mnt/dados/workspaces/Game HQ/levels/modulo14",
        output_file="/mnt/dados/workspaces/Game HQ/src/data/challenges/mod14_generated.ts",
        module_name="Módulo 14: Alta Disponibilidade de Bancos de Dados e Stateful Services",
        is_subdivided=False,
        module_id_prefix="m14",
        module_number=14
    )

if __name__ == "__main__":
    compile_all()
