import { Challenge } from "../../types";

export const MOD1_CHALLENGES: Challenge[] = [
  {
    id: "m1_s1_l1",
    module: "Módulo 1: O Despertar do Shell",
    name: "O Primeiro Sinal de Vida",
    actName: "Ato I: O Despertar",
    difficulty: "easy",
    salary: 100,
    briefing: "A tela gráfica do computador sumiu. O terminal local aguarda resposta. Envie a mensagem 'Olá, AURA' para o console.",
    storySegment: "O Janela OS declarou seu equipamento obsoleto. Sendo um estudante de TI com pouco dinheiro e muita rebeldia, você optou pela autonomia: formatou o HD e instalou o terminal de código aberto. Agora você precisa reativar o núcleo de AURA-7, sua IA assistente corrompida, para começar os freelas e pagar as contas de energia solar do bunker...",
    validationType: "bash_script",
    liveSchematicType: "solar_power",
    hint: "Use o comando: echo \"Olá, AURA\" para interagir com o kernel e testar o terminal.",
    initialFS: {
      "/": {
        "boot_assist.sh": {
          type: "file",
          content: 'echo "Iniciando núcleo central AURA-7...\n# ADICIONE AS ASPAS CORRETAS SE HOUVER GLITCH',
          permissions: 755
        }
      }
    }
  },
  {
    id: "m1_s1_l10",
    module: "Módulo 1: O Despertar do Shell",
    name: "O Primeiro Diagnóstico",
    actName: "Ato I: O Despertar",
    difficulty: "medium",
    salary: 150,
    briefing: "O vizinho no Bunker 7 está sem oxigênio porque as ventoinhas travaram. Investigue o diretório oculto '.bunker_config', encontre o script de segurança e execute-o.",
    storySegment: "Primeiro chamado real. Vida ou morte em uma colônia subterrânea. A ventilação parou e os logs de temperatura dispararam. Encontre a rotina térmica do Bunker 7 e garanta a oxigenação.",
    validationType: "bash_script",
    liveSchematicType: "cpu_temperature",
    hint: "Use ls -la para ver diretórios ocultos, navegue até .bunker_config/sistema/scripts/ e execute ./ligar_coolers.sh após dar permissão com chmod +x.",
    initialFS: {
      "/": {
        ".bunker_config": {
          type: "dir",
          content: "",
          permissions: 755
        }
      },
      "/.bunker_config": {
        "sistema": {
          type: "dir",
          content: "",
          permissions: 755
        }
      },
      "/.bunker_config/sistema": {
        "scripts": {
          type: "dir",
          content: "",
          permissions: 755
        }
      },
      "/.bunker_config/sistema/scripts": {
        "ligar_coolers.sh": {
          type: "file",
          content: 'echo "⚙️ [SYSTEM] Ativando exaustores auxiliares do Bunker 7..."\necho "🌬️ [PNEUMA] Fluxo de O2 normalizado em 21%."',
          permissions: 644
        }
      }
    }
  }
];
