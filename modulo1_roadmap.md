# 🗺️ Roadmap de Desenvolvimento: Módulo 1 (O Despertar do Shell)
Este documento detalha o progresso da codificação, mapeamento físico e consistência de assets reais do Módulo 1.

---

## 1. Status de Desenvolvimento dos Submódulos

| Submódulo | Níveis | Status | Validação (Docker) | Assets de Gameplay Verificados (`/assets`) |
| :--- | :--- | :--- | :--- | :--- |
| **Submódulo 1.1: O Despertar do Shell** | 1–10 | ✅ Concluído | ✅ Validado no Sandbox | `status1_offline.gif`, `status2_online.gif`, `anim_status1_offline_d9995208.mp4`, `anim_status2_online_8c037027.mp4` |
| **Submódulo 1.2: Programas vs. Scripts** | 11–20 | ✅ Concluído | ✅ Validado no Sandbox | `cap3_status1_desconectado.gif`, `cap3_status2_conectado.gif` |
| **Submódulo 1.3: Manipulação de Arquivos** | 21–30 | ✅ Concluído | ✅ Validado no Sandbox | `cap4_status1_travada.gif`, `cap4_status2_fluida.gif` |
| **Submódulo 1.4: Depuração e Diagnósticos** | 31–40 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.5: Argumentos e Opções CLI** | 41–50 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.6: Expressões Regulares** | 51–60 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.7: Arquivos de Configuração** | 61–70 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.8: Redirecionamentos e Pipes** | 71–80 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.9: Banco de Dados Textual** | 81–90 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |
| **Submódulo 1.10: Interfaces Dialog & CGI** | 91–100 | ✅ Concluído | ✅ Validado no Sandbox | ✅ Carregado / OK |

---

## 2. Checklist de Próximas Implementações

### Submódulo 1.1 (Estabilização):
- [x] Mover os arquivos de `levels/level1` até `level5` para a nova estrutura de caminhos relativos: `levels/modulo1/sub1/levelX`.
- [x] Detalhar briefing do Nível 10 (Desafio Integrado do Oxigênio no Bunker 7).
- [x] Integrar os vídeos mp4 e os GIFs reais de status (`anim_status1_offline_d9995208.mp4`) na renderização do Live Feed da interface React.

### Submódulo 1.2 (Programas vs. Scripts):
- [x] Criar a árvore física de diretórios: `mkdir -p levels/modulo1/sub2/level{11..20}`.
- [x] Vincular as animações `cap3_status1_desconectado.gif` e `cap3_status2_conectado.gif` ao feed visual do console durante a auditoria de scripts do colega.

### Submódulo 1.3 (Manipulação de Arquivos):
- [x] Criar a árvore física de diretórios: `mkdir -p levels/modulo1/sub3/level{21..30}`.
- [x] Estruturar o cenário de arquivos fiscais antigos simulando a papelaria local do bairro utilizando os assets de tela travada/fluida (`cap4_status1_travada.gif`).

### Submódulo 1.4 (Depuração):
- [x] Mapear o script de cálculo de frete com erro de loop no peso zero para o Submódulo 1.4.

### Submódulo 1.5 (Argumentos):
- [x] Configurar cenário de validações de flags POSIX para a ferramenta CLI de RPG.

### Submódulo 1.6 (Regex):
- [x] Desenhar arquivo bruto sujo de cadastro de pacientes para o consultório odontológico.

### Submódulo 1.7 (Configuração):
- [x] Criar arquivos de mixer `.conf` para simular os perfis de áudio do estúdio de gravação.

### Submódulo 1.8 (Redirecionamento):
- [x] Implementar os descritores de canais de erro (`2> erros.log`) simulando as maquininhas de cartão do mercado.

### Submódulo 1.9 (Banco Textual):
- [x] Codificar rotina atômica de criação de diretório de lock (`mkdir /tmp/estoque.lock`) para exclusão mútua concorrida.

### Submódulo 1.10 (Dialog):
- [x] Configurar os containers para empacotar o utilitário `dialog` (Alpine/Debian base) para renderização da TUI final (Zuserd).
