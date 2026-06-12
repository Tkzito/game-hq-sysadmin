import os
import re

WORKSPACE_DIR = "/mnt/dados/workspaces/Game HQ"

def parse_and_generate_module(mod_num, mod_file_path):
    print(f"Parsing {mod_file_path}...")
    if not os.path.exists(mod_file_path):
        print(f"File not found: {mod_file_path}")
        return

    with open(mod_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by level definitions: e.g., "#### Nível 111 — ..." or "#### Nível 111 - ..."
    level_matches = list(re.finditer(r"#### Nível\s+(\d+)\s+[-—]\s+([^\n]+)", content))
    
    for i, match in enumerate(level_matches):
        lvl_num = int(match.group(1))
        lvl_title = match.group(2).strip()
        
        # Get start and end indices of the level text
        start_idx = match.end()
        end_idx = level_matches[i+1].start() if i + 1 < len(level_matches) else len(content)
        
        lvl_text = content[start_idx:end_idx].strip()
        
        # We will extract context, mission, command-key, dialogs, etc. and build a nice briefing.md
        briefing_content = f"# Nível {lvl_num} — {lvl_title}\n\n"
        
        # Extract sections using simple parsing
        context_m = re.search(r"-\s+\*\*Contexto:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
        mission_m = re.search(r"-\s+\*\*Missão:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
        cmd_m = re.search(r"-\s+\*\*Comando-Chave:\*\*\s*(.*?)(?=\n-\s+\*\*|\n\n|\Z)", lvl_text, re.DOTALL)
        
        if context_m:
            briefing_content += f"## 🎮 Contexto do Freela\n{context_m.group(1).strip()}\n\n"
        if mission_m:
            briefing_content += f"## 🛠️ Missão\n{mission_m.group(1).strip()}\n\n"
        if cmd_m:
            briefing_content += f"## 🎯 Comando-Chave\n`{cmd_m.group(1).strip()}`\n\n"
            
        briefing_content += f"## 🎯 Critério de Sucesso\n* Executar as tarefas descritas na missão com sucesso.\n"
        
        # Make module folder
        mod_dir = os.path.join(WORKSPACE_DIR, "levels", f"modulo{mod_num}")
        lvl_dir = os.path.join(mod_dir, f"level{lvl_num}")
        os.makedirs(lvl_dir, exist_ok=True)
        
        # Write briefing.md
        with open(os.path.join(lvl_dir, "briefing.md"), "w", encoding="utf-8") as f_out:
            f_out.write(briefing_content)
            
        # Write boilerplate Dockerfile
        docker_file = os.path.join(lvl_dir, "Dockerfile")
        if not os.path.exists(docker_file):
            with open(docker_file, "w", encoding="utf-8") as f_out:
                f_out.write("FROM gamehq-compile-base:latest\n")
                
        # Write boilerplate setup.sh
        setup_file = os.path.join(lvl_dir, "setup.sh")
        if not os.path.exists(setup_file):
            with open(setup_file, "w", encoding="utf-8") as f_out:
                f_out.write("#!/bin/bash\nset -euo pipefail\nchown -R operator:operator /home/operator\n")
            os.chmod(setup_file, 0o755)
            
        # Write boilerplate validator.sh
        val_file = os.path.join(lvl_dir, "validator.sh")
        if not os.path.exists(val_file):
            with open(val_file, "w", encoding="utf-8") as f_out:
                f_out.write("#!/bin/bash\nset -euo pipefail\n# TODO: Implement verification criteria\necho \"Sucesso\"\nexit 0\n")
            os.chmod(val_file, 0o755)
            
        print(f"Generated boilerplate for Module {mod_num} Level {lvl_num} in {lvl_dir}")

def run():
    for mod in range(3, 9):
        mod_file = os.path.join(WORKSPACE_DIR, f"modulo{mod}.md")
        parse_and_generate_module(mod, mod_file)

if __name__ == "__main__":
    run()
