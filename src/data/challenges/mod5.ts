import { Challenge } from "../../types";

export const MOD5_CHALLENGES: Challenge[] = [
  {
    id: "m5_l131",
    module: "Módulo 5: Automação e Shell Scripting Avançado",
    name: "Varredura Antivírus e Extração de Logs",
    actName: "Ato III: O Especialista",
    difficulty: "hard",
    salary: 800,
    briefing: "Uma infecção massiva em servidores industriais de IoT gerou milhares de logs. Você precisa isolar as linhas de ameaças. Escreva ou execute uma varredura: busque todas as ocorrências da palavra 'MALWARE' em todos os arquivos contidos na pasta '/temp_logs/' e redirecione todas essas ocorrências encontradas para um único arquivo chamado '/temp_logs/incidentes.log'.",
    storySegment: "O reservatório de saneamento municipal detectou logs de atividade anômala, suspeitando de um ataque direcionado ao firmware das comportas. Milhões de linhas estão divididas em múltiplos relatórios. Você precisa construir um extrator rápido de padrões para gerar o sumário de incidentes imediatamente.",
    validationType: "bash_script",
    liveSchematicType: "shell_loop",
    hint: "Você pode resolver isso em uma linha rodando: \ngrep \"MALWARE\" /temp_logs/* > /temp_logs/incidentes.log \nou criando e rodando seu script para fazer o mesmo isolamento."
  },
  {
    id: "m5_l140",
    module: "Módulo 5: Automação e Shell Scripting Avançado",
    name: "O Automatizador do FreshBox",
    actName: "Ato III: O Especialista",
    difficulty: "legendary",
    salary: 950,
    briefing: "Crie um script de automação completo que verifique a saúde de 3 endpoints HTTP, registre logs com timestamp e tente reiniciar o serviço automaticamente após 3 falhas consecutivas.",
    storySegment: "Larissa, a CTO da FreshBox, quer robustez. Seus servidores caem nas madrugadas. Escreva a rotina autônoma final de auto-recuperação e agende no Cron para rodar a cada 5 minutos.",
    validationType: "bash_script",
    liveSchematicType: "shell_loop",
    hint: "Use arrays para as URLs, construa um loop para o curl, verifique as falhas salvando o estado em /tmp e utilize systemctl restart se o limite de retries for ultrapassado."
  }
];
