import { Challenge } from "../../types";

export const MOD8_CHALLENGES: Challenge[] = [
  {
    id: "m8_l161",
    module: "Módulo 8: SRE e Cibersegurança Internacional",
    name: "Infraestrutura Declarativa (Manifestos YAML)",
    actName: "Ato IV: O Engenheiro",
    difficulty: "medium",
    salary: 1500,
    briefing: "A EcoGrid precisa de uma implantação de monitoramento de usinas padronizada e imutável. Crie o manifesto declarativo de deploy 'deployment.yaml' contendo as especificações de imagem e réplicas desejadas.",
    storySegment: "A usina solar internacional precisa de sincronia constante. SREs gerenciam infraestruturas como código e não via comandos manuais ad-hoc. Desenvolva o manifesto de especificações.",
    validationType: "file_check",
    liveSchematicType: "cluster_status",
    hint: "Escreva deployment.yaml definindo apiVersion, kind: Deployment, metadata, e spec com replicas e template de pods."
  },
  {
    id: "m8_l170",
    module: "Módulo 8: SRE e Cibersegurança Internacional",
    name: "O Dia do Caos",
    actName: "Ato IV: O Engenheiro",
    difficulty: "legendary",
    salary: 2000,
    briefing: "Cenário extremo com 3 falhas simultâneas: mitigue um ataque DDoS de rede aplicando regras de firewall no gateway de segurança, remaneje a carga do nó de cluster acidentado alterando réplicas do deploy e limite o uso de memória do pod em loop infinito.",
    storySegment: "Apagão iminente. Hackers invadiram os clusters energéticos da EcoGrid. Três incidentes críticos de infraestrutura se sobrepõem e você tem 10 minutos para restaurar e salvar a rede elétrica continental.",
    validationType: "bash_script",
    liveSchematicType: "cluster_status",
    hint: "Bata o IP do DDoS via awk/uniq nos logs e bloqueie com ufw. Edite o deployment.yaml escalando réplicas saudáveis e inserindo limites de RAM para conter o memory leak."
  }
];
