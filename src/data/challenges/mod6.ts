import { Challenge } from "../../types";

export const MOD6_CHALLENGES: Challenge[] = [
  {
    id: "m6_l141",
    module: "Módulo 6: Versionamento e Pipeline CI/CD",
    name: "O Primeiro Commit",
    actName: "Ato III: O Especialista",
    difficulty: "easy",
    salary: 800,
    briefing: "A TechVanguard precisa iniciar o controle de versão de sua API de pagamentos. Inicialize o repositório Git no diretório raiz e configure o nome e e-mail padrão do operador.",
    storySegment: "Chega de deploys manuais via FTP que causam quedas. A infraestrutura a partir de agora é versionada e rastreável. A assinatura dos commits é fundamental para auditorias internas.",
    validationType: "bash_script",
    liveSchematicType: "shell_loop",
    hint: "Use git init para criar o repositório local e configure os parâmetros globais usando git config user.name e git config user.email."
  },
  {
    id: "m6_l150",
    module: "Módulo 6: Versionamento e Pipeline CI/CD",
    name: "A Pipeline Inquebrável",
    actName: "Ato III: O Especialista",
    difficulty: "hard",
    salary: 1000,
    briefing: "Resolva o conflito de merge pendente no arquivo de rotas, crie um hook pre-commit para bloquear arquivos que contenham chaves privadas e implemente o post-receive para deploy automatizado na pasta /var/www/html.",
    storySegment: "Vazamentos de credenciais corporativas no código e deploys quebrados causaram pânico. Você precisa consolidar a pipeline integrando travas automáticas contra vazamento de dados na origem.",
    validationType: "bash_script",
    liveSchematicType: "shell_loop",
    hint: "Limpe os marcadores de conflito de app.conf, crie o script .git/hooks/pre-commit e ative o hook post-receive clonando a master para a pasta de produção."
  }
];
