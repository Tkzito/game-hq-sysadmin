import time
import subprocess
import json

ORCHESTRATOR_PATH = "orchestrator/orchestrator.py"

def run_cmd(args):
    start = time.perf_counter()
    result = subprocess.run(["python3", ORCHESTRATOR_PATH] + args, capture_output=True, text=True)
    end = time.perf_counter()
    latency_ms = (end - start) * 1000
    return latency_ms, result.returncode, result.stdout, result.stderr

def run_benchmark():
    test_levels = [171, 181, 191, 201, 211, 221]
    results = []
    
    print("=== [ROOT ACCESS] INICIANDO BENCHMARK DE VALIDADORES NATIVOS ===")
    print("Verificando latência de inicialização, execução do validador e limpeza...\n")
    
    for lvl in test_levels:
        print(f"--- Testando Nível {lvl} ---")
        
        # 1. Measure start time (includes container build if needed + setup.sh run)
        start_lat, rc, stdout, stderr = run_cmd(["start", str(lvl)])
        print(f"  [START] Status: {'OK' if rc == 0 else 'FALHA'} | Latência: {start_lat:.2f} ms")
        
        # 2. Measure check validation latency (runs validator.sh inside container)
        check_lat, rc_chk, stdout_chk, stderr_chk = run_cmd(["check", str(lvl)])
        print(f"  [CHECK] Status: {'FAIL_EXPECTED' if rc_chk != 0 else 'SUCCESS'} | Latência: {check_lat:.2f} ms")
        print(f"  [CHECK OUTPUT] {stdout_chk.strip().replace(chr(10), ' | ')[:120]}...")
        
        # 3. Measure stop cleanup latency
        stop_lat, rc_stp, _, _ = run_cmd(["stop", str(lvl)])
        print(f"  [STOP] Status: {'OK' if rc_stp == 0 else 'FALHA'} | Latência: {stop_lat:.2f} ms\n")
        
        results.append({
            "level": lvl,
            "start_latency_ms": start_lat,
            "check_latency_ms": check_lat,
            "stop_latency_ms": stop_lat
        })
        
    print("=== RESUMO DO BENCHMARK ===")
    for r in results:
        print(f"Nível {r['level']}: Start = {r['start_latency_ms']:.1f}ms | Check (Validador) = {r['check_latency_ms']:.1f}ms | Stop = {r['stop_latency_ms']:.1f}ms")
    
    # Check if validator runs under 1.5 seconds (excluding initial docker load)
    avg_check = sum(r["check_latency_ms"] for r in results) / len(results)
    print(f"\nMédia de latência do validador (Check): {avg_check:.1f} ms")
    if avg_check < 1500:
        print(">> SUCESSO: Os validadores respondem de forma extremamente rápida, sem lentidão perceptível!")
    else:
        print(">> AVISO: Média de latência dos validadores acima do ideal (1500ms).")

if __name__ == "__main__":
    run_benchmark()
