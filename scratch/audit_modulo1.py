import os
import re

LEVELS_DIR = "/mnt/dados/workspaces/Game HQ/levels/modulo1"
APP_TSX_PATH = "/mnt/dados/workspaces/Game HQ/src/App.tsx"

def get_implemented_commands():
    if not os.path.exists(APP_TSX_PATH):
        return set()
    with open(APP_TSX_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to extract cases in switch(cmd.toLowerCase())
    # Looks for: case "commandName": or case 'commandName':
    cases = re.findall(r'case\s+["\']([^"\']+)["\']\s*:', content)
    return set(cases)

def audit_levels():
    implemented_commands = get_implemented_commands()
    report = []
    report.append(f"# Module 1 Levels Audit Report\n")
    report.append(f"Implemented commands in App.tsx: {sorted(list(implemented_commands))}\n")
    
    mismatches = []
    
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
            
            briefing_file = os.path.join(lvl_path, "briefing.md")
            setup_file = os.path.join(lvl_path, "setup.sh")
            validator_file = os.path.join(lvl_path, "validator.sh")
            
            briefing_content = ""
            if os.path.exists(briefing_file):
                with open(briefing_file, 'r', encoding='utf-8') as f:
                    briefing_content = f.read()
                    
            setup_content = ""
            if os.path.exists(setup_file):
                with open(setup_file, 'r', encoding='utf-8') as f:
                    setup_content = f.read()
                    
            validator_content = ""
            if os.path.exists(validator_file):
                with open(validator_file, 'r', encoding='utf-8') as f:
                    validator_content = f.read()
            
            briefing_cmds = set(re.findall(r'`([^`\s]+)[^`]*`', briefing_content))
            briefing_cmds = {cmd.split()[0] for cmd in briefing_cmds if cmd}
            
            history_checks = re.findall(r'grep\s+.*["\']([^"\']+)["\'].*\.bash_history', validator_content)
            history_checks += re.findall(r'\.bash_history.*["\']([^"\']+)["\']', validator_content)
            
            checked_files = re.findall(r'\/home\/operator\/([a-zA-Z0-9_\-\.\/]+)', validator_content)
            checked_files = {f for f in checked_files if not f.startswith("bash_history") and not f.endswith(".sh")}
            
            potential_cmds = {cmd for cmd in briefing_cmds if cmd.isalpha() and cmd not in ['sh', 'sudo', 'cd', 'ls', 'cat', 'nano', 'clear', 'status', 'briefing', 'reset']}
            
            missing_cmds = [cmd for cmd in potential_cmds if cmd not in implemented_commands]
            
            report.append(f"## Level {absolute_level_num}: m1_s{sub_num}_l{lvl_num} ({lvl})")
            if missing_cmds:
                report.append(f"- **Missing commands:** {', '.join(missing_cmds)}")
            if history_checks:
                report.append(f"- **History checks:** {history_checks}")
            if checked_files:
                report.append(f"- **Checked files in validator:** {list(checked_files)}")
            setup_files = re.findall(r'touch\s+([a-zA-Z0-9_\-\.\/]+)', setup_content) or re.findall(r'>\s*([a-zA-Z0-9_\-\.\/]+)', setup_content)
            if setup_files:
                report.append(f"- **Setup creates:** {setup_files}")
            
            # Extract briefing text briefly for verification
            # Report the briefing goal/description
            lines = briefing_content.split('\n')
            desc = ""
            for l in lines:
                if l.strip().startswith("#"):
                    desc = l.replace("#", "").strip()
                    break
            report.append(f"- **Briefing Title:** {desc}")
            report.append("")
                    
    with open("/mnt/dados/workspaces/Game HQ/scratch/audit_report.md", "w", encoding="utf-8") as f:
        f.write("\n".join(report))
    print("Report written to scratch/audit_report.md")

if __name__ == "__main__":
    audit_levels()
