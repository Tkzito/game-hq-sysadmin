import { Challenge } from "../../types";

export const MOD3_CHALLENGES: Challenge[] = [
  {
    id: "m3_l111",
    module: "Módulo 3: Monitoramento de Processos e Recursos",
    name: "Invasão Silenciosa (CPU Overload)",
    actName: "Ato II: O Profissional",
    difficulty: "medium",
    salary: 400,
    briefing: "Um malware espião clandestino descarregou scripts maliciosos em background que estão superaquecendo os chips do Bunker Server e sugando toda a banda solar. Use 'ps aux' ou 'ps' para listar os processos em execução, descubra o Process ID (PID) do processo sob o nome 'spyware.sh' e despache o sinal de aniquilação usando 'kill -9 <PID>' ou 'kill <PID>'.",
    storySegment: "Sua conta do SysAdmin-Jobs recebeu um alerta urgente do seu próprio cluster. Em uma varredura de rotina, AURA-7 notificou um gargalo crítico em sua usina fotovoltaica: os coolers e microcontroladores estão drenando o dobro Amperagem habitual de bateria. Invasores se infiltraram na sua máquina!",
    validationType: "bash_script",
    liveSchematicType: "cpu_temperature",
    hint: "Rode 'ps aux' para ver a lista de processos Simulados. Você verá um processo chamado 'spyware.sh' com o PID 1337. Interrompa o invasor rodando: 'kill 1337'."
  },
  {
    id: "m3_l120",
    module: "Módulo 3: Monitoramento de Processos e Recursos",
    name: "O Servidor da Clínica Dentária",
    actName: "Ato II: O Profissional",
    difficulty: "hard",
    salary: 450,
    briefing: "Diagnosticar o servidor com load average crítico. Identifique o processo culpado via htop/ps, encerre com sinal correto, libere espaço de logs antigos e reative o serviço principal.",
    storySegment: "O consultório odontológico está parado. Os relatórios de raio-X dos pacientes não carregam porque a fila de disco travou. Você precisa entrar sob estresse no sistema e sanar os gargalos de processos e logs.",
    validationType: "bash_script",
    liveSchematicType: "cpu_temperature",
    hint: "Use ps aux para ver processos pesados, mate com kill -9 e use du -sh e df -h para localizar arquivos grandes e liberar espaço."
  }
];
