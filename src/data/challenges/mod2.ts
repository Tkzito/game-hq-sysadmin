import { Challenge } from "../../types";

export const MOD2_CHALLENGES: Challenge[] = [
  {
    id: "m2_l101",
    module: "Módulo 2: Permissões, Usuários e Segurança POSIX",
    name: "Vazamento de Credenciais Confidenciais",
    actName: "Ato I: O Despertar",
    difficulty: "easy",
    salary: 250,
    briefing: "Muitos vizinhos confiam a você a segurança de suas pequenas mercearias. Seu software de varredura encontrou um arquivo crítico chamado 'backup_credenciais.db' exposto com permissões universais inseguras (777). Para estancar o vazamento e fechar a invasão, modifique o arquivo com 'chmod' de forma que APENAS o usuário proprietário possa ler e escrever (permissão RW: 600 ou u=rw,go=).",
    storySegment: "O Sr. Manoel da Mercearia do Bairro está desesperado. Um grupo de garotos descobriu o backup de logins do sistema de vendas dele e andou dando descontos indevidos em doces. Você descobriu que a pasta de logs foi exposta de forma pública na internet por negligência do antigo técnico. Tempo de dar privacidade ao Sr. Manoel!",
    validationType: "file_check",
    liveSchematicType: "security_mesh",
    hint: "Digite o comando: 'chmod 600 backup_credenciais.db' e em seguida verifique as permissões digitando 'ls -la'. Elas devem exibir '-rw-------'!"
  },
  {
    id: "m2_l110",
    module: "Módulo 2: Permissões, Usuários e Segurança POSIX",
    name: "A Constituição da Farmácia",
    actName: "Ato II: O Profissional",
    difficulty: "hard",
    salary: 350,
    briefing: "A farmácia precisa das regras de privilégios consolidadas e à prova de travamentos. Edite com segurança o arquivo '/etc/sudoers' usando o validador nativo, concedendo permissão para o grupo 'caixas' reiniciar o serviço de cupons.",
    storySegment: "O gerente de TI quer que os operadores de caixas comuns possam reiniciar o script de impressão de cupons sem precisar dar a senha de root. A regra deve ser escrita no local correto de forma estritamente blindada.",
    validationType: "file_check",
    liveSchematicType: "security_mesh",
    hint: "Use visudo para abrir o arquivo de privilégios e declare a regra: %caixas ALL=(ALL) NOPASSWD: /usr/sbin/service lp restart"
  }
];
