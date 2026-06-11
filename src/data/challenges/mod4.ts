import { Challenge } from "../../types";

export const MOD4_CHALLENGES: Challenge[] = [
  {
    id: "m4_l121",
    module: "Módulo 4: Fundamentos de Redes e Acesso Remoto",
    name: "Túnel Seguro & Backup Distribuído",
    actName: "Ato II: O Profissional",
    difficulty: "medium",
    salary: 600,
    briefing: "Sua missão é buscar uma chave de segurança gerada externamente no servidor local 'http://bunker-api.local/get-keys' e salvá-la localmente como 'chaves.key'. Em seguida, envie este arquivo criptografado de modo seguro para o servidor de custódia descentralizado na rede e IP '10.0.0.4' sob o usuário 'backup' usando o utilitário 'scp chaves.key backup@10.0.0.4:/backup'.",
    storySegment: "A cooperativa de produtores orgânicos do interior foi alvo de sabotagem. Os arquivos do balanço fiscal anual foram travados, mas um servidor redundante gerou uma contra-chave de restauração na intranet. Seu trabalho de SysAdmin júnior é recuperar essa chave via requisição de dados de rede e assegurar que ela seja enviada ao cofre criptográfico descentralizado.",
    validationType: "port_check",
    liveSchematicType: "ssh_routes",
    hint: "Primeiro, digite: 'curl -o chaves.key http://bunker-api.local/get-keys'. Isso criará o arquivo. Em seguida, transfira-o rodando: 'scp chaves.key backup@10.0.0.4:/backup'."
  },
  {
    id: "m4_l130",
    module: "Módulo 4: Fundamentos de Redes e Acesso Remoto",
    name: "A Filial Offline",
    actName: "Ato II: O Profissional",
    difficulty: "hard",
    salary: 700,
    briefing: "A filial da distribuidora regional não responde. Diagnostique conectividade via ping, estabeleça a rota, reconecte SSH, verifique os erros e libere a porta no firewall (UFW).",
    storySegment: "O sistema de entregas da Distribuidora São Luís parou de funcionar e o estoque não atualiza. O time de infra suspeita de regras de rede bloqueadas ou DNS incorreto nas filiais locais.",
    validationType: "port_check",
    liveSchematicType: "ssh_routes",
    hint: "Verifique a conectividade usando ping e dig, acesse a filial via SSH e use ufw allow para habilitar o tráfego de rede na porta do serviço."
  }
];
