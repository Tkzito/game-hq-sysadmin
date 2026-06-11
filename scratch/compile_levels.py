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
    run_command_verbose(f"docker run -d --name {container_name} gamehq-compile-base tail -f /dev/null")
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
            ftype = run_command_verbose(f"docker exec {container_name} stat -c '%F' {p}")
            # Get permissions
            perms_str = run_command_verbose(f"docker exec {container_name} stat -c '%a' {p}")
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
                # Read content
                content = run_command_verbose(f"docker exec {container_name} cat {p}")
                initial_fs[dirname][basename] = {
                    "type": "file",
                    "content": content,
                    "permissions": permissions
                }
                
        return initial_fs
    finally:
        run_command(f"docker rm -f {container_name}")

def compile_all():
    challenges = []
    
    for sub in sorted(os.listdir(LEVELS_DIR)):
        sub_path = os.path.join(LEVELS_DIR, sub)
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
            
            # Map difficulty based on level number
            difficulty = "easy"
            if absolute_level_num > 40:
                difficulty = "medium"
            if absolute_level_num > 80:
                difficulty = "hard"
                
            challenge = {
                "id": f"m1_s{sub_num}_l{lvl_num}",
                "module": "Módulo 1: O Despertar do Shell",
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
            
    # Write to file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('import { Challenge } from "../../types";\n\n')
        f.write('export const MOD1_GENERATED: Challenge[] = ')
        f.write(json.dumps(challenges, indent=2, ensure_ascii=False))
        f.write(';\n')

if __name__ == "__main__":
    compile_all()
