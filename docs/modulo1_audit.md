# Módulo 1 — Auditoria e Correções Automáticas

Data: 2026-06-11

## Resumo das ações executadas

1. Gerado arquivo de desafios adicionais:
   - src/data/challenges/mod1_generated.ts
     - Contém entradas automáticas para níveis detectados em `levels/modulo1/*/level*/briefing.md` que ainda não existiam em `src/data/challenges/mod1.ts`.

2. Criados placeholders de assets referenciados no roadmap:
   - assets/anim_status1_offline_d9995208.mp4
   - assets/anim_status2_online_8c037027.mp4
   - assets/status1_offline.gif
   - assets/status2_online.gif
   - assets/cap3_status1_desconectado.gif
   - assets/cap3_status2_conectado.gif
   - assets/cap4_status1_travada.gif
   - assets/cap4_status2_fluida.gif

3. Atualizado o index de desafios para incluir os desafios gerados:
   - src/data/challenges.ts (adicionado import e spread de MOD1_GENERATED)

4. Não foram alterados os Dockerfiles existentes sob levels/modulo1 — verificado que muitas fases já têm Dockerfile, setup.sh e validator.sh.

## Verificações realizadas

- Presença de Dockerfile: detectados Dockerfiles em múltiplas pastas de `levels/modulo1`, incluindo sub1..sub10 conforme o roadmap.
- Presença de scripts de validação: muitos níveis incluem `validator.sh` e `setup.sh`.
- Assets referenciados no roadmap faltavam no repositório; foram criados placeholders.
- Frontend (`src/data/challenges.ts`) agora inclui automaticamente os desafios gerados para sincronizar UI com conteúdo físico de `levels/`.

## Próximos passos recomendados (prioridade)

1. Substituir os arquivos placeholder em `assets/` por versões finais (GIF/MP4 otimizados).
2. Rodar o orquestrador local e testar a instanciação de 3 níveis (por exemplo: sub1/level1, sub1/level10, sub5/level1). Corrigir erros reportados pelos containers.
3. Implementar testes automatizados que:
   - Verifiquem que cada `levels/modulo1/**/level*/` possui Dockerfile, setup.sh e validator.sh.
   - Construam containers em modo CI (com limites de recursos) para validar runtime.
4. Revisar e humanizar os títulos/briefings nos arquivos gerados em `src/data/challenges/mod1_generated.ts` (atualmente baseados na primeira linha do briefing.md).

---

Se desejar, prossigo com: (a) rodar builds de container de amostra, (b) substituir placeholders por assets otimizados (se fornecer), (c) expandir validações CI.
