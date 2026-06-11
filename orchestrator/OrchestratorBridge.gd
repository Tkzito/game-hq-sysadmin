extends RefCounted
class_name OrchestratorBridge

# Caminho relativo para o script orquestrador do Python a partir da raiz do projeto Godot
const ORCHESTRATOR_PATH = "res://orchestrator/orchestrator.py"

## Executa um comando do orquestrador via Python e retorna o resultado
static func _execute_orchestrator_cmd(command: String, level_id: int = -1) -> Dictionary:
	var global_script_path = ProjectSettings.globalize_path(ORCHESTRATOR_PATH)
	var args = [global_script_path, command]
	
	if level_id != -1:
		args.append(str(level_id))
		
	var output = []
	# Executa o Python de forma síncrona capturando stdout/stderr
	var exit_code = OS.execute("python3", args, output, true, false)
	
	var result_str = ""
	if output.size() > 0:
		result_str = output[0]
		
	return {
		"exit_code": exit_code,
		"output": result_str.strip_edges()
	}

## Compila a imagem Docker de um determinado nível
static func build_level(level_id: int) -> bool:
	var res = _execute_orchestrator_cmd("build", level_id)
	return res["exit_code"] == 0

## Inicia o nível (Briefing + Docker run com restrições)
static func start_level(level_id: int) -> String:
	var res = _execute_orchestrator_cmd("start", level_id)
	return res["output"]

## Encerra e limpa o container de um nível
static func stop_level(level_id: int) -> bool:
	var res = _execute_orchestrator_cmd("stop", level_id)
	return res["exit_code"] == 0

## Pede uma dica para a IA AURA-7 em tempo real
static func get_hint(level_id: int) -> String:
	var res = _execute_orchestrator_cmd("hint", level_id)
	return res["output"]

## Verifica se o objetivo da fase foi cumprido
static func check_level(level_id: int) -> Dictionary:
	var res = _execute_orchestrator_cmd("check", level_id)
	var is_success = "DESAFIO CONCLUÍDO COM SUCESSO" in res["output"]
	
	return {
		"success": is_success,
		"message": res["output"]
	}

## Abre um terminal externo rodando o shell do jogador (Ideal para rodar fora da Godot)
static func open_shell_in_external_terminal(level_id: int) -> void:
	var global_script_path = ProjectSettings.globalize_path(ORCHESTRATOR_PATH)
	
	# Detecta o sistema operacional para abrir o terminal correto
	var os_name = OS.get_name()
	if os_name == "Linux" or os_name == "FreeBSD":
		# Abre o terminal padrão do sistema (ex: xterm ou gnome-terminal) rodando o shell do game
		OS.create_process("x-terminal-emulator", ["-e", "python3 " + global_script_path + " shell " + str(level_id)])
	elif os_name == "macOS":
		OS.create_process("osascript", ["-e", 'tell app "Terminal" to do script "python3 ' + global_script_path + ' shell ' + str(level_id) + '"'])
	elif os_name == "Windows":
		OS.create_process("cmd.exe", ["/c", "start cmd.exe /k python " + global_script_path + " shell " + str(level_id)])
