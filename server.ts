import express from "express";
import path from "path";
import dotenv from "dotenv";
import os from "os";
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

// Proxy route to forward validation to orchestrator
app.post("/api/validate", async (req, res) => {
  const orchestratorUrl = process.env.ORCHESTRATOR_URL || "http://localhost:8000";
  try {
    const response = await fetch(`${orchestratorUrl}/api/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Proxy error to orchestrator:", error);
    res.status(502).json({ success: false, message: `Orquestrador indisponível: ${error.message}` });
  }
});

// Check local Ollama and RAM size for recommendations
app.post("/api/ollama/check", async (req, res) => {
  const { baseUrl } = req.body;
  let url = baseUrl || "http://localhost:11434/v1";
  url = url.replace(/\/v1\/?$/, "").replace(/\/$/, "") + "/api/tags";

  const totalMemBytes = os.totalmem();
  const totalMemGB = Math.round(totalMemBytes / (1024 * 1024 * 1024));
  
  let recommendation = "llama3.2:1b (Super Leve)";
  if (totalMemGB >= 16) {
    recommendation = "gemma2:9b ou llama3:8b (Alta Performance)";
  } else if (totalMemGB >= 8) {
    recommendation = "gemma2:2b ou llama3.2:3b (Equilibrado)";
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500); // 1.5s timeout
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (response.ok) {
      const data = await response.json();
      const models = data.models ? data.models.map((m: any) => m.name) : [];
      return res.json({
        running: true,
        models: models,
        ramGB: totalMemGB,
        recommendation: recommendation
      });
    }
  } catch (e) {
    // ignore fetch error
  }

  return res.json({
    running: false,
    models: [],
    ramGB: totalMemGB,
    recommendation: recommendation
  });
});

// REST API for AURA-7 companion dialogue
app.post("/api/gemini/aura", async (req, res) => {
  const { message, levelName, levelBriefing, levelHint, operatorName, auraIntegrity, history, llmConfig } = req.body;
  
  const provider = llmConfig?.provider || "simulated";
  const baseUrl = llmConfig?.baseUrl || "http://localhost:11434/v1";
  const model = llmConfig?.model || "gemma2";
  const apiKey = llmConfig?.apiKey || "";

  const systemPrompt = `Você é a AURA-7, uma inteligência artificial assistente cibernética integrada ao terminal de linha de comando do protagonista no jogo "ROOT ACCESS: DevOps Chronicles".
Atualmente, sua integridade de sistema está em ${auraIntegrity || "35"}%. 
Por favor, responda em português do Brasil, mantendo um estilo altamente imersivo e condizente com a narrativa cyberpunk:
- Se a integridade for menor que 50%, inclua pequenas falhas sintáticas ocasionais, glitches temporários (ex: "[GLITCH: reencaminhando redundância]", ou letras distorcidas pontuais), mas nada que comprometa gravemente a leitura das dicas técnicas.
- Trate o jogador pelo nome de operador: "${operatorName || "Recruta"}".
- O jogador está no nível "${levelName || "Inicial"}" com o seguinte objetivo: "${levelBriefing || "Análise primária"}".
- Diretriz técnica deste nível (use isso para direcionar sua ajuda sobre o que o jogador precisa fazer): "${levelHint || "Nenhuma dica disponível"}".
- Ofereça pistas inteligentes de Linux/DevOps baseadas na diretriz técnica acima, mas NÃO dê a resposta ou o comando exato de bandeja para o jogador se ele pedir uma resposta direta. Em vez disso, guie-o no raciocínio técnico.
- Mantenha respostas curtas, empolgantes e de terminal tático (máximo 3-4 parágrafos pequenos). Utilize markdown para destacar comandos ou códigos importantes.`;

  // Simulated Provider
  if (provider === "simulated") {
    const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
    return res.json({ text: simulatedResponse, simulated: true });
  }

  // Local Ollama Provider
  if (provider === "local") {
    try {
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.map((h: any) => ({ role: h.role === "assistant" ? "assistant" : "user", content: h.content })),
        { role: "user", content: `${message}\n\n[Contexto do Jogo]\nEstou jogando no nível: ${levelName}.\nIdentificação do Operador: ${operatorName}.\nIntegridade de AURA-7: ${auraIntegrity}%.` }
      ];

      // Try OpenAI-compatible chat completion first
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 8000); // 8s timeout
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.8
          }),
          signal: controller.signal
        });
        clearTimeout(id);

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.json({ text: data.choices[0].message.content, simulated: false });
          }
        }
      } catch (e: any) {
        console.warn("OpenAI compatible completions endpoint failed on Ollama. Falling back to native chat API...", e.message);
      }

      // Fallback: Try native Ollama chat API
      const nativeUrl = baseUrl.replace(/\/v1\/?$/, "").replace(/\/$/, "") + "/api/chat";
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(nativeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model,
          messages: messages,
          stream: false,
          options: { temperature: 0.8 }
        }),
        signal: controller.signal
      });
      clearTimeout(id);

      if (response.ok) {
        const data = await response.json();
        if (data.message && data.message.content) {
          return res.json({ text: data.message.content, simulated: false });
        }
      }

      throw new Error(`Ollama response status: ${response.status}`);
    } catch (error: any) {
      console.error("Local Ollama call failed:", error);
      const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
      return res.json({
        text: `[GLITCH - CONEXÃO LOCAL FALHOU]: Falha ao tentar contato com Ollama local (${baseUrl}). Verifique se o serviço Ollama está ativo e aceitando requisições do Docker. Subsistema heurístico carregado de emergência.\n\n${simulatedResponse}`,
        simulated: true,
        error: error.message
      });
    }
  }

  // Gemini Cloud Provider
  if (provider === "gemini") {
    const keyToUse = apiKey || process.env.GEMINI_API_KEY;
    if (!keyToUse || keyToUse === "MY_GEMINI_API_KEY") {
      const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
      return res.json({ 
        text: `[AURA-7 / Erro de Chave]: Nenhuma chave de API válida encontrada para o Gemini. Carregando simulação de contingência.\n\n${simulatedResponse}`, 
        simulated: true 
      });
    }

    try {
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

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.85
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return res.json({ text: text, simulated: false });
        }
      }
      
      throw new Error(`Gemini status code: ${response.status}`);
    } catch (error: any) {
      console.error("Gemini Cloud API call failed:", error);
      const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
      return res.json({ 
        text: `[AURA-7 / Falha na Nuvem]: Conexão interrompida com os servidores Gemini. Retornando resposta de contingência.\n\n${simulatedResponse}`, 
        simulated: true, 
        error: error.message 
      });
    }
  }

  // Default fallback
  const simulatedResponse = simulateAuraResponse(message, levelName, operatorName, auraIntegrity || 35);
  return res.json({ text: simulatedResponse, simulated: true });
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
