import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to prevent crash if not configured
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY env is empty or placeholder. Falling back to built-in simulated neural responses.");
      return null;
    }
    try {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI client:", e);
      return null;
    }
  }
  return aiClient;
}

// REST API for AURA-7 companion dialogue
app.post("/api/gemini/aura", async (req, res) => {
  const { message, levelName, levelBriefing, operatorName, auraIntegrity, history } = req.body;
  
  const client = getGeminiClient();
  
  const systemPrompt = `Você é a AURA-7, uma inteligência artificial assistente cibernética integrada ao terminal de linha de comando do protagonista no jogo "ROOT ACCESS: DevOps Chronicles".
Atualmente, sua integridade de sistema está em ${auraIntegrity || "35"}%. 
Por favor, responda em português do Brasil, mantendo um estilo altamente imersivo e condizente com a narrativa cyberpunk:
- Se a integridade for menor que 50%, inclua pequenas falhas sintáticas ocasionais, glitches temporários (ex: "[GLITCH: reencaminhando redundância]", ou letras distorcidas pontuais), mas nada que comprometa gravemente a leitura das dicas técnicas.
- Trate o jogador pelo nome de operador: "${operatorName || "Recruta"}".
- O jogador está no nível "${levelName || "Inicial"}" com o seguinte objetivo: "${levelBriefing || "Análise primária"}".
- Ofereça pistas inteligentes de Linux/DevOps, mas NÃO dê a resposta ou o comando exato de bandeja para o jogador se ele pedir uma resposta direta. Em vez disso, guie-o no raciocínio técnico.
- Mantenha respostas curtas, empolgantes e de terminal tático (máximo 3-4 parágrafos pequenos). Utilize markdown para destacar comandos ou códigos importantes.`;

  if (!client) {
    // Offline fallback responses for highly imersive cyberpunk guide
    const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
    return res.json({ text: simulatedResponse, simulated: true });
  }

  try {
    // Collect message session
    const contents = history && history.length > 0 
      ? history.map((h: any) => ({
          role: h.role === "assistant" ? "model" as const : "user" as const,
          parts: [{ text: h.content }]
        }))
      : [];
      
    contents.push({
      role: "user" as const,
      parts: [{ text: `${message}\n\n[Contexto do Jogo]\nEstou jogando no nível: ${levelName}.\nIdentificação do Operador: ${operatorName}.\nIntegridade de AURA-7: ${auraIntegrity}%.` }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
      }
    });

    res.json({ text: response.text || "...", simulated: false });
  } catch (error: any) {
    console.error("Gemini call error:", error);
    const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
    res.json({ text: `[AURA-7 / Sinal Instável]: Operador... Conectividade externa degradada. Ativando subsistema heurístico offline.\n\n${simulatedResponse}`, simulated: true, error: error.message });
  }
});

// Helper for simulated offline responses when API key is missing or calls fail
function simulateAuraResponse(message: string, levelName: string, operatorName: string, integrity: number): string {
  const normalized = message.toLowerCase();
  let glitch = integrity < 50 ? "[S-S-SINAL REESTABELECIDO...] " : "[AURA-7 Link Ativo]: ";
  
  if (normalized.includes("olá") || normalized.includes("oi") || normalized.includes("hello")) {
    return `${glitch}Saudações, Operador **${operatorName}**! Minha integridade está em estáveis ${integrity}%. Estou pronta para analisar seu tráfego de comandos. O que precisa para superar o desafio de "${levelName}"?`;
  }
  
  if (normalized.includes("dica") || normalized.includes("ajuda") || normalized.includes("pista") || normalized.includes("como fazer") || normalized.includes("erro")) {
    if (levelName.includes("Despertar") || levelName.includes("1")) {
      return `${glitch}Detecto falha na inicialização do subsistema de suporte. O script \`boot_assist.sh\` contém erros de sintaxe ou loops mal-encaminhados. Recomendo usar o editor nativo de texto (digite \`nano boot_assist.sh\` ou use o editor split) para verificar por erros comuns de aspas ou variáveis não definidas!`;
    }
    if (levelName.includes("Permissões") || levelName.includes("2")) {
      return `${glitch}Acesso Negado! Na segurança POSIX, arquivos confidenciais devem ser blindados. O proprietário deve ler e escrever, mas o grupo e outros não devem acessar nada. O comando \`chmod\` (como \`chmod 600\`) ajusta os octetos decimais de forma precisa. Experimente nos arquivos da sala!`;
    }
    if (levelName.includes("Processo") || levelName.includes("3")) {
      return `${glitch}Alerta de Sobrecarga! Um malware chamado \`spyware.sh\` está comendo ciclos da CPU do Bunker. Execute \`ps aux\` para capturar os processos em execução e filtre pelo nome. Uma vez descoberto o PID numérico (na segunda coluna), despache o sinal de aniquilação usando \`kill -9 PID\`!`;
    }
    if (levelName.includes("SSH") || levelName.includes("4")) {
      return `${glitch}Roteamento de rede requerido! Conecte-se com o Bunker Externo. Primeiro faça o download das assinaturas usando o comando \`curl\` ou \`wget\`. Depois, transfira o certificado de segurança criptografado usando o utilitário \`scp\` para a porta do host remoto. Ah, confirme se as conexões DNS locais estão resolvidas!`;
    }
    if (levelName.includes("Automação") || levelName.includes("5")) {
      return `${glitch}Instrução de loop recomendada! Precisamos de um script bash com condicionais ou loops \`for\` que busquem por padrões. O comando \`grep\` pode ajudar você a filtrar erros em arquivos textuais múltiplos de forma assíncrona. Digite \`sh auto_limpeza.sh\` para testar.`;
    }
    return `${glitch}Minhas diretrizes de segurança recomendam verificar a sintaxe do último comando digitado. Tente listar os arquivos visíveis com \`ls -la\` ou inspecione variáveis com \`env\`. Sempre podemos consultar o manual se estivermos travados!`;
  }
  
  return `${glitch}Interessante, Operador **${operatorName}**. Minha matriz lógica está processando sua entrada: "${message}". Recomendo digitar \`ajuda\` ou pedir uma \`dica\` técnica se estiver enfrentando um bloqueio de terminal inesperado nesta área.`;
}

// Handle development vs production modes
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ROOT ACCESS Server] Boot completed. Port: ${PORT}`);
  });
}

startServer();
