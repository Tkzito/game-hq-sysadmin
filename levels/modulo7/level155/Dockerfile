FROM gamehq-compile-base:latest

# Install docker mock
RUN cat << 'EOF' > /usr/local/bin/docker
#!/usr/bin/env python3
import sys
import json
import os
import random

STATE_FILE = '/home/operator/.docker_state.json'
USAGE_FILE = '/home/operator/.docker_usage'

def load_state():
    if not os.path.exists(STATE_FILE):
        return {"containers": [], "images": []}
    try:
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    except:
        return {"containers": [], "images": []}

def save_state(state):
    try:
        with open(STATE_FILE, 'w') as f:
            json.dump(state, f, indent=2)
        os.chmod(STATE_FILE, 0o666)
    except:
        pass

def log_usage(cmd):
    try:
        with open(USAGE_FILE, 'a') as f:
            f.write(cmd + '\n')
        os.chmod(USAGE_FILE, 0o666)
    except:
        pass

def main():
    args = sys.argv[1:]
    is_compose = False
    
    if sys.argv[0].endswith('docker-compose'):
        is_compose = True
    elif args and args[0] == 'compose':
        is_compose = True
        args = args[1:]
        
    log_usage("docker " + " ".join(sys.argv[1:]))
    
    if is_compose:
        handle_compose(args)
        return

    if not args:
        print("Docker Mock Environment")
        return

    cmd = args[0]
    if cmd == 'run':
        handle_run(args[1:])
    elif cmd == 'ps':
        handle_ps(args[1:])
    elif cmd == 'images':
        handle_images(args[1:])
    elif cmd == 'rmi':
        handle_rmi(args[1:])
    elif cmd == 'stats':
        handle_stats(args[1:])
    elif cmd == 'logs':
        handle_logs(args[1:])
    else:
        print(f"Command '{cmd}' is simulated.")

def handle_run(args):
    name = None
    ports = ""
    volumes = []
    envs = {}
    image = None
    
    i = 0
    while i < len(args):
        arg = args[i]
        if arg == '--name' and i + 1 < len(args):
            name = args[i+1]
            i += 2
        elif arg == '-p' and i + 1 < len(args):
            ports = args[i+1]
            i += 2
        elif arg == '-v' and i + 1 < len(args):
            volumes.append(args[i+1])
            i += 2
        elif arg == '-e' and i + 1 < len(args):
            env_val = args[i+1]
            if '=' in env_val:
                k, v = env_val.split('=', 1)
                envs[k] = v
            else:
                envs[env_val] = ""
            i += 2
        elif arg.startswith('-'):
            i += 1
        else:
            image = arg
            i += 1
            
    if not image:
        print("Error: image not specified")
        sys.exit(1)
        
    if not name:
        name = f"simulated-{random.randint(1000, 9999)}"
        
    state = load_state()
    cid = "".join(random.choices("0123456789abcdef", k=12))
    
    state["containers"] = [c for c in state["containers"] if c["name"] != name]
    state["containers"].append({
        "id": cid,
        "name": name,
        "image": image,
        "status": "Up Less than a second",
        "ports": ports,
        "created": "Less than a second ago",
        "env": envs,
        "volumes": volumes
    })
    
    save_state(state)
    print(cid)

def handle_ps(args):
    state = load_state()
    print(f"{'CONTAINER ID':<15}{'IMAGE':<20}{'COMMAND':<25}{'CREATED':<20}{'STATUS':<20}{'PORTS':<20}{'NAMES'}")
    for c in state["containers"]:
        ports_str = c.get("ports", "")
        if ports_str:
            if ':' in ports_str:
                h, cnt = ports_str.split(':')
                ports_str = f"0.0.0.0:{h}->{cnt}/tcp"
            else:
                ports_str = f"{ports_str}/tcp"
        print(f"{c['id']:<15}{c['image']:<20}{'\"docker-entrypoint.s…\"':<25}{c['created']:<20}{c['status']:<20}{ports_str:<20}{c['name']}")

def handle_images(args):
    state = load_state()
    print(f"{'REPOSITORY':<25}{'TAG':<15}{'IMAGE ID':<15}{'CREATED':<20}{'SIZE'}")
    for img in state["images"]:
        print(f"{img['repository']:<25}{img['tag']:<15}{img['id']:<15}{'2 weeks ago':<20}{img.get('size', '100MB')}")

def handle_rmi(args):
    if not args:
        print("Error: No image specified")
        sys.exit(1)
    target = args[0]
    state = load_state()
    initial_count = len(state["images"])
    new_images = []
    for img in state["images"]:
        full_name = f"{img['repository']}:{img['tag']}"
        if img["id"] == target or img["repository"] == target or full_name == target:
            is_used = any(c["image"] == img["repository"] or c["image"] == full_name for c in state["containers"])
            if is_used:
                print(f"Error response from daemon: conflict: unable to delete {target} - image is being used")
                sys.exit(1)
            print(f"Untagged: {full_name}")
            print(f"Deleted: sha256:{img['id']}")
        else:
            new_images.append(img)
            
    if len(new_images) == initial_count:
        print(f"Error: No such image: {target}")
        sys.exit(1)
        
    state["images"] = new_images
    save_state(state)

def handle_stats(args):
    state = load_state()
    if not state["containers"]:
        print("No active containers to monitor.")
        return
    print(f"{'CONTAINER ID':<15}{'NAME':<20}{'CPU %':<10}{'MEM USAGE / LIMIT':<25}{'MEM %':<10}{'NET I/O':<15}{'BLOCK I/O':<15}{'PIDS'}")
    for c in state["containers"]:
        if c["name"] == "queue-worker":
            print(f"{c['id']:<15}{c['name']:<20}{'98.5%':<10}{'1.85GiB / 2.00GiB':<25}{'92.5%':<10}{'12kB/45kB':<15}{'0B/0B':<15}{'12'}")
        else:
            print(f"{c['id']:<15}{c['name']:<20}{'0.1%':<10}{'15.4MiB / 7.82GiB':<25}{'0.2%':<10}{'1.2kB/0.5kB':<15}{'0B/0B':<15}{'2'}")

def handle_logs(args):
    if not args:
        sys.exit(1)
    name = [a for a in args if not a.startswith('-')][0]
    state = load_state()
    container = next((c for c in state["containers"] if c["name"] == name or c["id"] == name), None)
    if not container:
        print(f"Error: No such container: {name}")
        sys.exit(1)
    if name == "queue-worker":
        print("[ERROR] Memory limit reached during job processing. Restarting...")
        print("[ERROR] Out of Memory: failed to allocate 512 bytes.")
    elif "redis" in container["image"]:
        print("1:M 12 Jun 2026 10:00:00.010 * Ready to accept connections")
    else:
        print("Service started successfully.")

def handle_compose(args):
    if not args:
        return
    subcmd = args[0]
    if subcmd == 'up':
        if not os.path.exists('docker-compose.yml'):
            print("Error: Can't find docker-compose.yml")
            sys.exit(1)
        print("Creating network \"app_default\" with the default driver")
        
        try:
            with open('docker-compose.yml', 'r') as f:
                lines = f.read()
        except:
            sys.exit(1)
            
        state = load_state()
        import re
        services = []
        in_services = False
        for line in lines.split('\n'):
            if line.startswith('services:'):
                in_services = True
                continue
            if in_services:
                match = re.match(r'^  ([a-zA-Z0-9_-]+):$', line)
                if match:
                    services.append(match.group(1))
                    
        for svc in services:
            print(f"Creating app_{svc}_1 ... done")
            cid = "".join(random.choices("0123456789abcdef", k=12))
            img = "unknown"
            svc_lines = re.findall(rf'  {svc}:.*?(?=(?:  [a-zA-Z0-9_-]+:|$))', lines, re.DOTALL)
            if svc_lines:
                img_match = re.search(r'image:\s*([^\s]+)', svc_lines[0])
                if img_match:
                    img = img_match.group(1)
            state["containers"] = [c for c in state["containers"] if c["name"] != f"app_{svc}_1"]
            state["containers"].append({
                "id": cid,
                "name": f"app_{svc}_1",
                "image": img,
                "status": "Up Less than a second",
                "ports": "",
                "created": "Less than a second ago",
                "env": {},
                "volumes": []
            })
        save_state(state)

if __name__ == '__main__':
    main()
EOF

RUN chmod +x /usr/local/bin/docker && ln -sf /usr/local/bin/docker /usr/local/bin/docker-compose
