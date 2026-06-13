/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, 
  Cpu, 
  Shield, 
  HelpCircle, 
  CheckCircle, 
  RefreshCw, 
  Folder, 
  FileText, 
  Volume2, 
  VolumeX, 
  User, 
  CpuIcon, 
  Zap, 
  Share2, 
  Search, 
  Briefcase, 
  Send, 
  Activity, 
  AlertTriangle, 
  Database,
  Lock,
  Unlock,
  Key,
  Settings
} from "lucide-react";
import { CHALLENGES } from "./data/challenges";
import TerminalView from "./components/TerminalView";
import AnimationPlayer from "./components/AnimationPlayer";
import animations from "./data/animations.json";

import { SaveState, VirtualFS, TerminalLine, ChatMessage, FSItem } from "./types";

import { translations, levelTranslations } from "./data/translations";

// Helper for vintage retro sounds
function playAudioTone(freq: number, duration: number, type: "sine" | "square" | "sawtooth" = "sine", volume = 0.05) {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio Context blocked or unsupported
  }
}

export default function App() {
  const getAsset = (levelId: string, type: "challenge" | "success") => {
    const mod = levelId.slice(0, 2);
    const sub = levelId.slice(3, 5);
    const lvl = levelId.slice(6, 8);
    const modMap = (animations.modules as any)[mod];
    const subMap = (animations.submodules as any)[sub];
    const lvlMap = (animations.levels as any)[lvl];
    return type === "challenge"
      ? (lvlMap?.challenge ?? subMap?.challenge ?? modMap?.challenge ?? "lock.svg")
      : (lvlMap?.success ?? subMap?.success ?? modMap?.success ?? "spark.svg");
  };
  // Check localStorage for player save state
  const [saveState, setSaveState] = useState<SaveState>(() => {
    const saved = localStorage.getItem("root_access_save");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      playerName: "",
      currentLevelId: "m1_s1_l1",
      credits: 0,
      completedLevels: [],
      auraIntegrity: 35,
      registered: false,
      llmConfig: {
        provider: "simulated",
        baseUrl: "http://localhost:11434/v1",
        model: "gemma2",
        apiKey: ""
      }
    };
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings modal states
  const [configProvider, setConfigProvider] = useState<"simulated" | "gemini" | "local">("simulated");
  const [configBaseUrl, setConfigBaseUrl] = useState("http://localhost:11434/v1");
  const [configModel, setConfigModel] = useState("gemma2");
  const [configApiKey, setConfigApiKey] = useState("");

  const [autocheckResult, setAutocheckResult] = useState<{
    checked: boolean;
    running: boolean;
    models: string[];
    ramGB: number;
    recommendation: string;
  } | null>(null);
  const [checkingOllama, setCheckingOllama] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    triggerBeep(880, 0.05, "sine");
    setTimeout(() => {
      setCopiedIdx(null);
    }, 2000);
  };

  const handleCheckOllama = async (baseUrl: string) => {
    setCheckingOllama(true);
    try {
      const response = await fetch("/api/ollama/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseUrl })
      });
      const data = await response.json();
      setAutocheckResult({
        checked: true,
        running: data.running,
        models: data.models || [],
        ramGB: data.ramGB || 8,
        recommendation: data.recommendation || "Llama 3.2 1B"
      });
    } catch (e) {
      setAutocheckResult({
        checked: true,
        running: false,
        models: [],
        ramGB: 8,
        recommendation: "Llama 3.2 1b (Super Leve)"
      });
    } finally {
      setCheckingOllama(false);
    }
  };

  // Sync settings states with saveState when it loads or opens
  useEffect(() => {
    if (saveState.llmConfig) {
      setConfigProvider(saveState.llmConfig.provider);
      setConfigBaseUrl(saveState.llmConfig.baseUrl || "http://localhost:11434/v1");
      setConfigModel(saveState.llmConfig.model || "gemma2");
      setConfigApiKey(saveState.llmConfig.apiKey || "");
    }
  }, [saveState.llmConfig, settingsOpen]);

  // i18n support
  const [lang, setLang] = useState<"pt" | "en">("pt");

  const localizedChallenges = CHALLENGES.map(lvl => {
    if (lang === "en" && levelTranslations[lvl.id]) {
      return {
        ...lvl,
        name: levelTranslations[lvl.id].name,
        briefing: levelTranslations[lvl.id].briefing,
        hint: levelTranslations[lvl.id].hint || lvl.hint
      };
    }
    return lvl;
  });

  const t = (key: keyof typeof translations["pt"], params?: Record<string, string | number>) => {
    let str = translations[lang]?.[key] || translations["pt"]?.[key] || "";
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };

  const currentChallenge = localizedChallenges.find(c => c.id === saveState.currentLevelId) || localizedChallenges[0];

  // Virtual Filesystem State - initialized from the current challenge config
  const [virtualFS, setVirtualFS] = useState<VirtualFS>({});
  const [currentPath, setCurrentPath] = useState<string>("/");
  
  // Variables or flags for custom command outcomes (e.g. ranBootAssist, killedPID, scpTransferred, etc.)
  const [variables, setVariables] = useState<Record<string, any>>({});

  // Input controller
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Nano Editor Modal State
  const [editingFile, setEditingFile] = useState<{ path: string; name: string } | null>(null);
  const [nanoContent, setNanoContent] = useState("");

  // AURA-7 Dialogue Chat
  const [auraChat, setAuraChat] = useState<ChatMessage[]>([]);
  const [auraMessage, setAuraMessage] = useState("");
  const [auraLoading, setAuraLoading] = useState(false);

  // Audio configuration
  const [soundOn, setSoundOn] = useState(true);

  // Interface controls
  const [terminalFocus, setTerminalFocus] = useState(true);
  const [activeTab, setActiveTab] = useState<"terminal" | "jobs" | "manual">("terminal");
  const [showAnimation, setShowAnimation] = useState<{
    type: "challenge" | "success";
    asset: string;
  } | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" | null }>({ text: "", type: null });

  // References
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const auraChatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load level initial FS when current level changes
  useEffect(() => {
    if (currentChallenge) {
      // Setup Initial Filesystem Deep Copy
      const initial: VirtualFS = {};
      if (currentChallenge.initialFS) {
        Object.keys(currentChallenge.initialFS).forEach(dir => {
          initial[dir] = {};
          Object.keys(currentChallenge.initialFS[dir]).forEach(file => {
            const original = currentChallenge.initialFS![dir][file];
            initial[dir][file] = {
              name: file,
              type: original.type,
              content: original.content,
              permissions: original.permissions
            };
          });
        });
      }
      setVirtualFS(initial);
      setCurrentPath("/");
      setVariables({});
      
      // Trigger challenge animation
      const challengeAsset = getAsset(saveState.currentLevelId, "challenge");
      setShowAnimation({ type: "challenge", asset: challengeAsset });

      const timer = setTimeout(() => {
        // Welcome terminal lines for this level
        setTerminalLines([
          {
            id: `${Date.now()}-boot`,
            text: `--- SECTOR BOOTING: LEVEL ${currentChallenge.id} ---`,
            type: "system",
            timestamp: new Date().toLocaleTimeString()
          },
          {
            id: `${Date.now()}-desc`,
            text: `CONTRATO: ${currentChallenge.name} [R$: ${currentChallenge.salary} CRÉDITOS]`,
            type: "warning",
            timestamp: new Date().toLocaleTimeString()
          },
          {
            id: `${Date.now()}-instruction`,
            text: `Digite 'briefing' para rever as metas ou use 'ajuda' para listar comandos.`,
            type: "output",
            timestamp: new Date().toLocaleTimeString()
          }
        ]);

        // Set initial AURA greetings
        setAuraChat([
          {
            role: "assistant",
            content: `[AURA-7 // Integridade: ${saveState.auraIntegrity}%]: Operador ${saveState.playerName || "Recruta"}, estou com capacidade parcial. Desafio atual: "${currentChallenge.name}". O que podemos listar para iniciar? Peça uma "dica" ou relate um "ajuda" para que eu auxilie sua progressão de linha de comando.`,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        setShowAnimation(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveState.currentLevelId]);

  // Persist saveState
  useEffect(() => {
    localStorage.setItem("root_access_save", JSON.stringify(saveState));
  }, [saveState]);

  // Auto Scroll Terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines]);

  // Auto Scroll Chat
  useEffect(() => {
    if (auraChatBottomRef.current) {
      auraChatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [auraChat]);

  // Simulated system time ticking
  const [systime, setSystime] = useState("12:00:26");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystime(now.toTimeString().split(" ")[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // System beep helper
  const triggerBeep = (freq: number, duration: number, type: "sine" | "square" | "sawtooth" = "sine", vol = 0.05) => {
    if (soundOn) {
      playAudioTone(freq, duration, type, vol);
    }
  };

  // Helper code to handle operators registering name at start
  const handleRegisterName = (e: React.FormEvent) => {
    e.preventDefault();
    const nameInput = (e.currentTarget as HTMLFormElement).elements.namedItem("playerName") as HTMLInputElement;
    const providerSelect = (e.currentTarget as HTMLFormElement).elements.namedItem("llmProvider") as HTMLSelectElement;
    const baseUrlInput = (e.currentTarget as HTMLFormElement).elements.namedItem("llmBaseUrl") as HTMLInputElement;
    const modelInput = (e.currentTarget as HTMLFormElement).elements.namedItem("llmModel") as HTMLInputElement;
    const apiKeyInput = (e.currentTarget as HTMLFormElement).elements.namedItem("llmApiKey") as HTMLInputElement;

    if (nameInput && nameInput.value.trim()) {
      const pName = nameInput.value.trim();
      const provider = (providerSelect?.value || "simulated") as "simulated" | "gemini" | "local";
      const baseUrl = baseUrlInput?.value || "http://localhost:11434/v1";
      const model = modelInput?.value || "gemma2";
      const apiKey = apiKeyInput?.value || "";

      triggerBeep(600, 0.15, "sine");
      setSaveState(prev => ({
        ...prev,
        playerName: pName,
        registered: true,
        llmConfig: {
          provider,
          baseUrl,
          model,
          apiKey
        }
      }));
    }
  };

  const handleResetGame = () => {
    if (confirm("Deseja deletar seu progresso e reiniciar da primeira tarefa?")) {
      const fresh = {
        playerName: saveState.playerName,
        currentLevelId: "m1_s1_l1",
        credits: 0,
        completedLevels: [],
        auraIntegrity: 35,
        registered: saveState.registered
      };
      setSaveState(fresh);
      triggerBeep(200, 0.4, "sawtooth");
    }
  };

  // Check victory condition
  const handleVerifyChallenge = () => {
    // Validação real passa a ser uma requisição HTTP para o Orquestrador local.
    // Para manter compatibilidade com o modo offline/demonstração simulado, criamos um fallback.
    
    // Simulação temporária de requisição HTTP para /api/validate
    fetch(`/api/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        levelId: currentChallenge.id,
        virtualFS: virtualFS,
        variables: variables
      })
    })
    .then(res => res.json())
    .then(data => {
      processValidationResult(data);
    })
    .catch(() => {
      // Fallback offline caso o orquestrador não esteja rodando (mock local)
      let mockSuccess = false;
      let mockMsg = "Ambiente offline. Simulando sucesso no console.";
      
      if (currentChallenge.id === "m1_s1_l1") {
        mockSuccess = variables.ranBootAssist === true;
        mockMsg = mockSuccess ? "Canal neural conectado com sucesso!" : "O script boot_assist.sh não foi executado ou possui erro de sintaxe.";
      } else {
        mockSuccess = true; // Permite passar no sandbox puramente local
      }
      processValidationResult({ success: mockSuccess, message: mockMsg });
    });
  };

  const processValidationResult = (check: { success: boolean; message?: string }) => {
    if (check.success) {
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } else {
      triggerBeep(180, 0.4, "square", 0.07);
      setFeedbackMsg({
        text: check.message || "O sistema ainda detecta irregularidades ou inconsistências pendentes.",
        type: "error"
      });
      // Append failure line
      setTerminalLines(prev => [
        ...prev,
        {
          id: `${Date.now()}-fail`,
          text: `[X] VALIDAÇÃO FALHOU: ${check.message || "Meta não cumprida."}`,
          type: "error",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  // Skip Level for debugging convenience
  const handleSkipLevel = (lvlId: string) => {
    triggerBeep(330, 0.1, "sine");
    setSaveState(prev => ({
      ...prev,
      currentLevelId: lvlId
    }));
    setFeedbackMsg({ text: `Setor redirecionado ao Nível ${lvlId}.`, type: "success" });
  };

  // Commands Parser Engine
  const executeTerminalCommand = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Add to history list
    const newHistory = [...commandHistory, trimmed];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    // Sync commands to virtualFS as .bash_history for backend container validation
    setVirtualFS(prev => {
      const rootDir = prev["/"] || {};
      return {
        ...prev,
        "/": {
          ...rootDir,
          ".bash_history": {
            name: ".bash_history",
            type: "file" as const,
            content: newHistory.join("\n") + "\n",
            permissions: 644
          }
        }
      };
    });

    // Tone for key press enter
    triggerBeep(450, 0.05, "sine");

    // Output visual echoback
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLines(prev => [
      ...prev,
      {
        id: `${Date.now()}-cmd`,
        text: `${saveState.playerName || "rodrigo"}@bunker-shell:${currentPath}$ ${trimmed}`,
        type: "input",
        timestamp
      }
    ]);

    // Helpers to resolve paths
    const getTargetDirectory = (p: string) => {
      if (p === "/" || !p) return "/";
      if (p.startsWith("/")) return p;
      // build path
      let full = currentPath;
      if (!full.endsWith("/")) full += "/";
      return (full + p).replace(/\/\//g, "/");
    };

    const cleanHomePath = (p: string) => {
      if (!p) return "/";
      return p
        .replace(/^\/home\/operator/, "")
        .replace(/^\/home\/operador/, "")
        .replace(/^~/, "");
    };

    const resolveVirtualPath = (rawPath: string) => {
      const cleaned = cleanHomePath(rawPath);
      const absPath = getTargetDirectory(cleaned);
      let normalized = absPath.replace(/\/\//g, "/");
      if (normalized.endsWith("/") && normalized !== "/") {
        normalized = normalized.substring(0, normalized.length - 1);
      }
      const lastSlashIdx = normalized.lastIndexOf("/");
      const parentDir = normalized.substring(0, lastSlashIdx) || "/";
      const name = normalized.substring(lastSlashIdx + 1);
      return { parentDir, name, fullPath: normalized };
    };

    // Global redirection parser
    let redirectFile = "";
    let isAppend = false;
    let commandToRun = trimmed;

    const appendMatch = commandToRun.match(/\s+>>\s+(.+)$/);
    const overwriteMatch = commandToRun.match(/\s+>\s+(.+)$/);

    if (appendMatch) {
      isAppend = true;
      redirectFile = appendMatch[1].trim();
      commandToRun = commandToRun.substring(0, appendMatch.index).trim();
    } else if (overwriteMatch) {
      redirectFile = overwriteMatch[1].trim();
      commandToRun = commandToRun.substring(0, overwriteMatch.index).trim();
    }

    const parts = commandToRun.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const handleRedirectOrPrint = (lines: { text: string; type: "output" | "error" | "system" | "success" | "warning" }[]) => {
      const timestamp = new Date().toLocaleTimeString();
      if (redirectFile) {
        const stdout = lines
          .filter(l => l.type === "output")
          .map(l => l.text)
          .join("\n");
        const nonStdout = lines.filter(l => l.type !== "output");
        
        // Write to virtualFS
        const resolved = resolveVirtualPath(redirectFile);
        setVirtualFS(prev => {
          const dirContents = { ...prev[resolved.parentDir] };
          const existingFile = dirContents[resolved.name];
          let newContent = stdout;
          if (isAppend && existingFile && existingFile.type === "file") {
            newContent = (existingFile.content || "") + (existingFile.content && !existingFile.content.endsWith("\n") ? "\n" : "") + stdout;
          }
          dirContents[resolved.name] = {
            name: resolved.name,
            type: "file",
            content: newContent,
            permissions: 644
          };
          return {
            ...prev,
            [resolved.parentDir]: dirContents
          };
        });

        // Print non-stdout lines (errors, warnings) to terminal
        if (nonStdout.length > 0) {
          setTerminalLines(prev => [
            ...prev,
            ...nonStdout.map(l => ({
              id: `${Date.now()}-${Math.random()}`,
              text: l.text,
              type: l.type,
              timestamp
            }))
          ]);
        }
      } else {
        // Print all lines
        setTerminalLines(prev => [
          ...prev,
          ...lines.map(l => ({
            id: `${Date.now()}-${Math.random()}`,
            text: l.text,
            type: l.type,
            timestamp
          }))
        ]);
      }
    };

    // Check if it's a script execution (starts with ./ or is the sh command)
    let isScriptExecution = false;
    let scriptName = "";
    
    if (cmd.startsWith("./")) {
      isScriptExecution = true;
      scriptName = cmd.substring(2);
    } else if (cmd === "sh" && args.length > 0) {
      isScriptExecution = true;
      scriptName = args[0].startsWith("./") ? args[0].substring(2) : args[0];
    }

    if (isScriptExecution) {
      const curDir = virtualFS[currentPath] || {};
      const file = curDir[scriptName];
      
      if (!file) {
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-sh-err`,
            text: `sh: script '${scriptName}' indisponível ou permissões de execução negadas.`,
            type: "error",
            timestamp
          }
        ]);
        triggerBeep(150, 0.4, "sawtooth");
        return;
      }
      
      if (file.type !== "file") {
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-sh-err-dir`,
            text: `sh: ${scriptName}: é um diretório`,
            type: "error",
            timestamp
          }
        ]);
        triggerBeep(150, 0.4, "sawtooth");
        return;
      }
      
      // Check execute permission
      const hasExecutePerm = file.permissions === 755;
      if (cmd.startsWith("./") && !hasExecutePerm) {
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-sh-perm-err`,
            text: `bash: ./${scriptName}: Permissão negada`,
            type: "error",
            timestamp
          }
        ]);
        triggerBeep(150, 0.4, "sawtooth");
        return;
      }
      
      // Special case: boot_assist.sh (level 1)
      if (scriptName === "boot_assist.sh") {
        setVariables(prev => ({ ...prev, ranBootAssist: true }));
        const fileContent = file.content || "";
        const isClosed = fileContent.includes('echo "Iniciando núcleo central AURA-7..."') || 
                         (!/echo\\s+"Iniciando [^"\\n]*$/.test(fileContent) && fileContent.includes('"') && fileContent.match(/"/g)?.length === 8);
        if (isClosed) {
          setTerminalLines(prev => [
            ...prev,
            { id: `${Date.now()}-sh-run`, text: `Executando rotina shell boot_assist.sh...`, type: "system", timestamp },
            { id: `${Date.now()}-sh-out1`, text: `Iniciando núcleo central AURA-7...`, type: "output", timestamp },
            { id: `${Date.now()}-sh-out2`, text: `RESTAURAÇÃO COMPLETA: SISTEMA OPERANTE`, type: "success", timestamp },
            { id: `${Date.now()}-sh-out3`, text: `Sinal de link neural online.`, type: "output", timestamp }
          ]);
          triggerBeep(520, 0.25, "sine");
        } else {
          setTerminalLines(prev => [
            ...prev,
            { id: `${Date.now()}-sh-err1`, text: `boot_assist.sh: linha 4: erro de sintaxe: fim prematuro de string (unterminated string)`, type: "error", timestamp },
            { id: `${Date.now()}-sh-err2`, text: `[ALERTA DE SEGURANÇA BASH] Execução abortada pelo compilador de firmware.`, type: "error", timestamp }
          ]);
          triggerBeep(150, 0.4, "sawtooth");
        }
        return;
      }
      
      // Generic script execution!
      const lines = (file.content || "").split("\n");
      const scriptOutputLines: TerminalLine[] = [
        {
          id: `${Date.now()}-sh-start`,
          text: `Executando rotina shell ${scriptName}...`,
          type: "system",
          timestamp
        }
      ];
      
      lines.forEach((l, lIdx) => {
        const trimmedLine = l.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) return;
        
        if (trimmedLine.startsWith("echo ")) {
          const echoVal = trimmedLine.substring(5).replace(/^["']|["']$/g, "");
          scriptOutputLines.push({
            id: `${Date.now()}-sh-out-${lIdx}`,
            text: echoVal,
            type: "output",
            timestamp
          });
        }
      });
      
      setTerminalLines(prev => [...prev, ...scriptOutputLines]);
      triggerBeep(520, 0.15, "sine");
      return;
    }

    switch (cmd.toLowerCase()) {
      case "help":
      case "ajuda":
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-hlp1`,
            text: `Manual de Operador Unix - Comandos Disponíveis:`,
            type: "system",
            timestamp
          },
          {
            id: `${Date.now()}-hlp2`,
            text: `  ls [-la]              - Lista arquivos e propriedades no diretório atual.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_pwd`,
            text: `  pwd                   - Exibe o diretório de trabalho atual (caminho absoluto).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_cd`,
            text: `  cd <dir>              - Altera o diretório atual de trabalho.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_mkdir`,
            text: `  mkdir [-p] <dir>      - Cria um novo diretório (ou estrutura de diretórios com -p).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_touch`,
            text: `  touch <arquivo>       - Cria um arquivo vazio ou atualiza sua data.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp3`,
            text: `  cat <arquivo>         - Lê e imprime o conteúdo de um arquivo em texto puro.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_tail`,
            text: `  tail [-n N] <arq>     - Exibe as últimas N linhas do arquivo (padrão 10).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_head`,
            text: `  head [-n N] <arq>     - Exibe as primeiras N linhas do arquivo (padrão 10).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_less`,
            text: `  less <arquivo>        - Visualiza o arquivo com navegação simplificada.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp4`,
            text: `  nano <arquivo>        - Abre o editor tático imersivo de códigos.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp5`,
            text: `  chmod <modo> <arq>    - Altera permissões POSIX (ex: chmod 600 backup_credenciais.db).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_file`,
            text: `  file <arquivo>        - Determina o tipo do arquivo (ASCII, PNG, gzip, data).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_wc`,
            text: `  wc [-l -w -c] <arq>   - Conta quebras de linha (-l), palavras (-w) ou bytes (-c).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp6`,
            text: `  ps [aux]              - Mostra os processos monitorados sob este Bunker Server.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp7`,
            text: `  kill [-9] <PID>       - Cancela a operação de um ID de processo de CPU.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp8`,
            text: `  curl -o <arq> <url>   - Baixa assinaturas remotas de servidores da rede local.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp9`,
            text: `  scp <origem> <dest>   - Transfeire arquivos por criptografia SCP para outro host remoto.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_cp`,
            text: `  cp [-r] <orig> <dest> - Copia arquivos ou diretórios (recursivamente com -r).`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp_mv`,
            text: `  mv <origem> <destino> - Move ou renomeia arquivos ou diretórios.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp10`,
            text: `  docker build -t <t> . - Compila um Dockerfile customizado local para isolamento.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp11`,
            text: `  sh <script.sh>        - Executa scripts compilados ou rotinas de inicialização.`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-hlp12`,
            text: `  clear, status, briefing, reset - Controle operacional geral.`,
            type: "output",
            timestamp
          }
        ]);
        break;

      case "clear":
      case "cls":
        setTerminalLines([]);
        break;

      case "briefing":
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-brf1`,
            text: `[Dossiê do Contrato] - ${currentChallenge.name}`,
            type: "warning",
            timestamp
          },
          {
            id: `${Date.now()}-brf2`,
            text: currentChallenge.briefing,
            type: "output",
            timestamp
          }
        ]);
        break;

      case "status":
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-st1`,
            text: `[STATUS SUBSISTEMA]`,
            type: "system",
            timestamp
          },
          {
            id: `${Date.now()}-st2`,
            text: `AURA-7 Core Sincronizado: ${saveState.auraIntegrity}% Integridade Neural.`,
            type: saveState.auraIntegrity < 50 ? "warning" : "success",
            timestamp
          },
          {
            id: `${Date.now()}-st3`,
            text: `Nível Atual: ${saveState.currentLevelId} | Créditos Acumulados: R$ ${saveState.credits}`,
            type: "output",
            timestamp
          },
          {
            id: `${Date.now()}-st4`,
            text: `Arquitetura: Sandbox Clustered Docker (v1.0.4) em US-WEST-02`,
            type: "output",
            timestamp
          }
        ]);
        break;

      case "reset":
        // Reset current level local directory
        const initial: VirtualFS = {};
        if (currentChallenge.initialFS) {
          Object.keys(currentChallenge.initialFS).forEach(dir => {
            initial[dir] = {};
            Object.keys(currentChallenge.initialFS[dir]).forEach(file => {
              const original = currentChallenge.initialFS![dir][file];
              initial[dir][file] = {
                name: file,
                type: original.type,
                content: original.content,
                permissions: original.permissions
              };
            });
          });
        }
        setVirtualFS(initial);
        setVariables({});
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-rst`,
            text: `[!] Sandbox do diretório residencial resetado para as configurações iniciais da fase.`,
            type: "warning",
            timestamp
          }
        ]);
        triggerBeep(260, 0.3, "square");
        break;

      case "ls": {
        const isLong = args.includes("-la") || args.includes("-l") || args.includes("-a");
        const dir = virtualFS[currentPath] || {};
        const items = Object.keys(dir);
        const outLines: { text: string; type: "output" | "system" | "warning" | "error" }[] = [];

        if (items.length === 0) {
          outLines.push({ text: "(diretório vazio)", type: "output" });
        } else {
          if (isLong) {
            outLines.push({ text: `total ${items.length * 4}`, type: "system" });
            items.forEach(k => {
              const f = dir[k];
              const typeChar = f.type === "dir" ? "d" : "-";
              const permInt = f.permissions || 644;
              const r1 = (permInt & 400) ? "r" : (permInt === 755 || permInt === 777 ? "r" : "-");
              const w1 = (permInt & 200) || permInt === 600 || permInt === 755 || permInt === 777 ? "w" : "-";
              const x1 = permInt === 755 || permInt === 777 ? "x" : "-";
              const r2 = permInt === 777 || permInt === 755 || permInt === 644 ? "r" : "-";
              const w2 = permInt === 777 ? "w" : "-";
              const x2 = permInt === 777 || permInt === 755 ? "x" : "-";

              const permStr = `${typeChar}r${w1}${x1}${r2}${w2}${x2}r--`;
              const size = f.content?.length || 1024;
              const owner = f.permissions === 600 ? "operator" : "root";

              outLines.push({
                text: `${permStr}  1 ${owner}  staff  ${size} Jun 10 12:00  ${f.name}${f.type === "dir" ? "/" : ""}`,
                type: f.type === "dir" ? "warning" : "output"
              });
            });
          } else {
            const textLine = items.map(k => {
              const f = dir[k];
              return f.type === "dir" ? `${k}/` : k;
            }).join("    ");
            outLines.push({ text: textLine, type: "output" });
          }
        }
        handleRedirectOrPrint(outLines);
        break;
      }

      case "cd":
        // change directory within virtualFS
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cd-err`, text: "cd: diretório não informado.", type: "error", timestamp }]);
          break;
        }
        const target = args[0];
        const normalize = (base: string, targ: string) => {
          if (!targ) return base;
          let p = targ.startsWith("/") ? targ : (base === "/" ? `/${targ}` : `${base}/${targ}`);
          // normalize ., ..
          const parts = p.split('/').filter(Boolean);
          const stack: string[] = [];
          parts.forEach(part => {
            if (part === '.') return;
            if (part === '..') { stack.pop(); return; }
            stack.push(part);
          });
          return '/' + stack.join('/');
        };
        const newPath = normalize(currentPath, target);
        // check two styles: directory entry in parent, or separate mapping for path
        const parentDir = virtualFS[currentPath] || {};
        const entry = parentDir[target];
        if (virtualFS[newPath] && typeof virtualFS[newPath] === 'object') {
          setCurrentPath(newPath === '/' ? '/' : newPath);
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cd-ok`, text: `Diretório alterado para ${newPath}`, type: "output", timestamp }]);
        } else if (entry && entry.type === 'dir') {
          // ensure mapping exists for that path
          const fullPath = (currentPath === '/' ? `/${target}` : `${currentPath}/${target}`);
          setCurrentPath(fullPath);
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cd-ok2`, text: `Diretório alterado para ${fullPath}`, type: "output", timestamp }]);
        } else {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cd-no`, text: `cd: ${target}: Diretório não encontrado.`, type: "error", timestamp }]);
        }
        break;

      case "pwd":
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-pwd`,
            text: currentPath,
            type: "output",
            timestamp
          }
        ]);
        break;

      case "mkdir": {
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-mkdir-err`, text: "mkdir: diretório não informado.", type: "error", timestamp }]);
          break;
        }
        
        const hasP = args.includes("-p") || args.some(arg => arg.startsWith("-") && arg.includes("p"));
        const pathsToCreate = args.filter(arg => !arg.startsWith("-"));
        
        if (pathsToCreate.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-mkdir-err-path`, text: "mkdir: informe o nome do diretório.", type: "error", timestamp }]);
          break;
        }
        
        let success = true;
        const tempFS = { ...virtualFS };
        
        for (const rawPath of pathsToCreate) {
          const targetDir = getTargetDirectory(rawPath);
          const pathParts = targetDir.split("/").filter(Boolean);
          
          let currentTrack = "/";
          for (let i = 0; i < pathParts.length; i++) {
            const nextPart = pathParts[i];
            const parentKey = currentTrack;
            currentTrack = currentTrack === "/" ? `/${nextPart}` : `${currentTrack}/${nextPart}`;
            
            const parentDirContents = tempFS[parentKey] || {};
            
            if (parentDirContents[nextPart]) {
              if (parentDirContents[nextPart].type === "file") {
                setTerminalLines(prev => [...prev, { id: `${Date.now()}-mkdir-exists-file`, text: `mkdir: não foi possível criar o diretório '${rawPath}': Arquivo existe`, type: "error", timestamp }]);
                success = false;
                break;
              }
            } else {
              if (!hasP && i < pathParts.length - 1) {
                setTerminalLines(prev => [...prev, { id: `${Date.now()}-mkdir-no-parent`, text: `mkdir: não foi possível criar o diretório '${rawPath}': Arquivo ou diretório não encontrado`, type: "error", timestamp }]);
                success = false;
                break;
              }
              
              tempFS[parentKey] = {
                ...parentDirContents,
                [nextPart]: {
                  name: nextPart,
                  type: "dir",
                  permissions: 755
                }
              };
              
              tempFS[currentTrack] = tempFS[currentTrack] || {};
            }
          }
          if (!success) break;
        }
        
        if (success) {
          setVirtualFS(tempFS);
        }
        break;
      }

      case "touch": {
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-touch-err`, text: "touch: arquivo não informado.", type: "error", timestamp }]);
          break;
        }
        
        const filesToTouch = args.filter(arg => !arg.startsWith("-"));
        if (filesToTouch.length === 0) {
          break;
        }
        
        setVirtualFS(prev => {
          const newFS = { ...prev };
          let success = true;
          
          filesToTouch.forEach(rawFile => {
            let dirPath = currentPath;
            let filename = rawFile;
            
            if (rawFile.includes("/")) {
              const lastSlashIdx = rawFile.lastIndexOf("/");
              const rawDir = rawFile.substring(0, lastSlashIdx);
              filename = rawFile.substring(lastSlashIdx + 1);
              dirPath = getTargetDirectory(rawDir);
            }
            
            if (!newFS[dirPath]) {
              setTerminalLines(prevLns => [...prevLns, { id: `${Date.now()}-touch-err-dir`, text: `touch: não foi possível tocar '${rawFile}': Arquivo ou diretório não encontrado`, type: "error", timestamp }]);
              success = false;
              return;
            }
            
            const dirContents = { ...newFS[dirPath] };
            if (!dirContents[filename]) {
              dirContents[filename] = {
                name: filename,
                type: "file",
                content: "",
                permissions: 644
              };
              newFS[dirPath] = dirContents;
            }
          });
          
          return success ? newFS : prev;
        });
        break;
      }

      case "tree":
        // simple recursive print of virtualFS
        const walk = (pathKey: string, prefix = ''): string[] => {
          const items = virtualFS[pathKey] ? Object.keys(virtualFS[pathKey]) : [];
          let out: string[] = [];
          items.forEach(name => {
            const it = virtualFS[pathKey][name];
            out.push(`${prefix}${name}${it.type === 'dir' ? '/' : ''}`);
            const childPath = (pathKey === '/' ? `/${name}` : `${pathKey}/${name}`);
            if (it.type === 'dir' && virtualFS[childPath]) {
              out = out.concat(walk(childPath, prefix + '  '));
            }
          });
          return out;
        };
        const treeLines = walk(currentPath);
        if (treeLines.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-tree-empty`, text: '(diretório vazio)', type: 'output', timestamp }]);
        } else {
          setTerminalLines(prev => [...prev, ...treeLines.map(l => ({ id: `${Date.now()}-tree-${Math.random()}`, text: l, type: 'output', timestamp }))]);
        }
        break;


      case "cat": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "cat: arquivo não especificado.", type: "error" }]);
          break;
        }

        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];

        if (!targetFileItem) {
          handleRedirectOrPrint([{ text: `cat: ${fileTarget}: Arquivo ou diretório não encontrado.`, type: "error" }]);
        } else if (targetFileItem.type === "dir") {
          handleRedirectOrPrint([{ text: `cat: ${fileTarget}: É um diretório.`, type: "error" }]);
        } else {
          let content = targetFileItem.content || "";
          if (content.startsWith("__GZIP_TEXT__:")) {
            content = content.substring("__GZIP_TEXT__:".length);
          }
          handleRedirectOrPrint([{ text: content || "(arquivo vazio)", type: "output" }]);
        }
        break;
      }

      case "tail": {
        let linesCount = 10;
        let fileTarget = "";
        
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-n" && i + 1 < args.length) {
            linesCount = parseInt(args[i + 1], 10) || 10;
            i++;
          } else if (args[i].startsWith("-n") && args[i].length > 2) {
            linesCount = parseInt(args[i].substring(2), 10) || 10;
          } else if (!args[i].startsWith("-")) {
            fileTarget = args[i];
          }
        }
        
        if (!fileTarget) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-tail-err`, text: "tail: especifique o arquivo.", type: "error", timestamp }]);
          break;
        }
        
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];
        
        if (!targetFileItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-tail-no`, text: `tail: ${fileTarget}: Arquivo ou diretório não encontrado.`, type: "error", timestamp }]);
        } else if (targetFileItem.type === "dir") {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-tail-dir`, text: `tail: ${fileTarget}: É um diretório.`, type: "error", timestamp }]);
        } else {
          const fileLines = (targetFileItem.content || "").split("\n");
          const lastLines = fileLines.slice(-linesCount);
          setTerminalLines(prev => [
            ...prev,
            ...lastLines.map((l, idx) => ({
              id: `${Date.now()}-tail-out-${idx}`,
              text: l,
              type: "output" as const,
              timestamp
            }))
          ]);
        }
        break;
      }

      case "head": {
        let linesCount = 10;
        let fileTarget = "";
        
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-n" && i + 1 < args.length) {
            linesCount = parseInt(args[i + 1], 10) || 10;
            i++;
          } else if (args[i].startsWith("-n") && args[i].length > 2) {
            linesCount = parseInt(args[i].substring(2), 10) || 10;
          } else if (!args[i].startsWith("-")) {
            fileTarget = args[i];
          }
        }
        
        if (!fileTarget) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-head-err`, text: "head: especifique o arquivo.", type: "error", timestamp }]);
          break;
        }
        
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];
        
        if (!targetFileItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-head-no`, text: `head: ${fileTarget}: Arquivo ou diretório não encontrado.`, type: "error", timestamp }]);
        } else if (targetFileItem.type === "dir") {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-head-dir`, text: `head: ${fileTarget}: É um diretório.`, type: "error", timestamp }]);
        } else {
          const fileLines = (targetFileItem.content || "").split("\n");
          const firstLines = fileLines.slice(0, linesCount);
          setTerminalLines(prev => [
            ...prev,
            ...firstLines.map((l, idx) => ({
              id: `${Date.now()}-head-out-${idx}`,
              text: l,
              type: "output" as const,
              timestamp
            }))
          ]);
        }
        break;
      }

      case "less": {
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-less-err`, text: "less: arquivo não especificado.", type: "error", timestamp }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];
        
        if (!targetFileItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-less-no`, text: `less: ${fileTarget}: Arquivo ou diretório não encontrado.`, type: "error", timestamp }]);
        } else if (targetFileItem.type === "dir") {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-less-dir`, text: `less: ${fileTarget}: É um diretório.`, type: "error", timestamp }]);
        } else {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-less-start`,
              text: `=== Visualizando ${fileTarget} === (Pressione Q no terminal real se estivesse em SSH)`,
              type: "system",
              timestamp
            },
            ...((targetFileItem.content || "").split("\n").map((l, idx) => ({
              id: `${Date.now()}-less-out-${idx}`,
              text: l,
              type: "output" as const,
              timestamp
            })))
          ]);
        }
        break;
      }

      case "file": {
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-file-err`, text: "file: especifique o arquivo.", type: "error", timestamp }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];
        
        if (!targetFileItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-file-no`, text: `${fileTarget}: cannot open \`${fileTarget}' (No such file or directory)`, type: "error", timestamp }]);
        } else if (targetFileItem.type === "dir") {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-file-dir`, text: `${fileTarget}: directory`, type: "output", timestamp }]);
        } else {
          let fileTypeInfo = "ASCII text";
          const content = targetFileItem.content || "";
          
          if (content.startsWith("PNG") || content.includes("PNG")) {
            fileTypeInfo = "PNG image data, 800 x 600, 8-bit/color RGBA, non-interlaced";
          } else if (content.startsWith("\b") || content.startsWith("\x1f\x8b")) {
            fileTypeInfo = "gzip compressed data, max compression, from Unix";
          } else if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(content)) {
            fileTypeInfo = "data";
          }
          
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-file-out`,
              text: `${fileTarget}: ${fileTypeInfo}`,
              type: "output",
              timestamp
            }
          ]);
        }
        break;
      }

      case "wc": {
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-wc-err`, text: "wc: especifique o arquivo.", type: "error", timestamp }]);
          break;
        }

        if (args.includes("--help") || args.includes("-h")) {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-wc-help-1`,
              text: "Uso: wc [OPÇÃO]... [ARQUIVO]...",
              type: "output",
              timestamp
            },
            {
              id: `${Date.now()}-wc-help-2`,
              text: "Exibe a contagem de quebras de linha, palavras e bytes de cada ARQUIVO.",
              type: "output",
              timestamp
            },
            {
              id: `${Date.now()}-wc-help-3`,
              text: "  -c, --bytes            exibe a contagem de bytes",
              type: "output",
              timestamp
            },
            {
              id: `${Date.now()}-wc-help-4`,
              text: "  -l, --lines            exibe a contagem de quebras de linha",
              type: "output",
              timestamp
            },
            {
              id: `${Date.now()}-wc-help-5`,
              text: "  -w, --words            exibe a contagem de palavras",
              type: "output",
              timestamp
            },
            {
              id: `${Date.now()}-wc-help-6`,
              text: "      --help     exibe esta ajuda e sai",
              type: "output",
              timestamp
            }
          ]);
          break;
        }
        
        const optL = args.includes("-l");
        const optW = args.includes("-w");
        const optC = args.includes("-c");
        const noOpts = !optL && !optW && !optC;
        
        const filesToCount = args.filter(arg => !arg.startsWith("-"));
        if (filesToCount.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-wc-err-file`, text: "wc: informe o arquivo.", type: "error", timestamp }]);
          break;
        }
        
        const activeDir = virtualFS[currentPath] || {};
        const wcLines: TerminalLine[] = [];
        
        filesToCount.forEach(fileTarget => {
          const targetFileItem = activeDir[fileTarget];
          if (!targetFileItem) {
            wcLines.push({ id: `${Date.now()}-wc-no-${fileTarget}`, text: `wc: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error", timestamp });
            return;
          }
          
          if (targetFileItem.type === "dir") {
            wcLines.push({ id: `${Date.now()}-wc-dir-${fileTarget}`, text: `wc: ${fileTarget}: É um diretório`, type: "error", timestamp });
            return;
          }
          
          const content = targetFileItem.content || "";
          const lines = content === "" ? 0 : content.split("\n").length;
          const words = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
          const bytes = content.length;
          
          let outputText = "";
          if (noOpts) {
            outputText = `      ${lines}      ${words}     ${bytes} ${fileTarget}`;
          } else {
            const parts: string[] = [];
            if (optL) parts.push(`      ${lines}`);
            if (optW) parts.push(`      ${words}`);
            if (optC) parts.push(`      ${bytes}`);
            outputText = `${parts.join("")} ${fileTarget}`;
          }
          
          wcLines.push({
            id: `${Date.now()}-wc-out-${fileTarget}`,
            text: outputText,
            type: "output",
            timestamp
          });
        });
        
        setTerminalLines(prev => [...prev, ...wcLines]);
        break;
      }

      case "cp": {
        const isRecursive = args.includes("-r") || args.some(arg => arg.startsWith("-") && arg.includes("r"));
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-"));
        
        if (nonFlagArgs.length < 2) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cp-err`, text: "cp: argumentos de origem e/ou destino ausentes.", type: "error", timestamp }]);
          break;
        }
        
        const src = nonFlagArgs[0];
        const dest = nonFlagArgs[1];
        
        const srcInfo = resolveVirtualPath(src);
        const destInfo = resolveVirtualPath(dest);
        
        const srcParent = virtualFS[srcInfo.parentDir] || {};
        const srcItem = srcParent[srcInfo.name];
        
        if (!srcItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cp-no-src`, text: `cp: '${src}': Arquivo ou diretório não encontrado`, type: "error", timestamp }]);
          break;
        }
        
        if (srcItem.type === "dir" && !isRecursive) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cp-dir-flag`, text: `cp: omitindo o diretório '${src}' (especifique -r para copiar recursivamente)`, type: "error", timestamp }]);
          break;
        }
        
        const destDirContents = virtualFS[destInfo.fullPath];
        const destIsExistingDir = destDirContents && typeof destDirContents === "object";
        
        setVirtualFS(prev => {
          const newFS = { ...prev };
          
          if (srcItem.type === "file") {
            const fileContent = srcItem.content || "";
            const filePerms = srcItem.permissions || 644;
            
            if (destIsExistingDir) {
              const targetDirPath = destInfo.fullPath;
              newFS[targetDirPath] = {
                ...newFS[targetDirPath],
                [srcInfo.name]: {
                  name: srcInfo.name,
                  type: "file",
                  content: fileContent,
                  permissions: filePerms
                }
              };
            } else {
              const targetParentPath = destInfo.parentDir;
              if (newFS[targetParentPath]) {
                newFS[targetParentPath] = {
                  ...newFS[targetParentPath],
                  [destInfo.name]: {
                    name: destInfo.name,
                    type: "file",
                    content: fileContent,
                    permissions: filePerms
                  }
                };
              } else {
                setTerminalLines(prevLns => [...prevLns, { id: `${Date.now()}-cp-err-parent`, text: `cp: não foi possível copiar para '${dest}': Diretório pai não encontrado`, type: "error", timestamp }]);
              }
            }
          } else if (srcItem.type === "dir" && isRecursive) {
            const srcPrefix = srcInfo.fullPath === "/" ? "/" : srcInfo.fullPath + "/";
            const targetBasePath = destIsExistingDir 
              ? (destInfo.fullPath === "/" ? `/${srcInfo.name}` : `${destInfo.fullPath}/${srcInfo.name}`)
              : destInfo.fullPath;
            
            const targetBaseInfo = resolveVirtualPath(targetBasePath);
            if (newFS[targetBaseInfo.parentDir]) {
              newFS[targetBaseInfo.parentDir] = {
                ...newFS[targetBaseInfo.parentDir],
                [targetBaseInfo.name]: {
                  name: targetBaseInfo.name,
                  type: "dir",
                  permissions: srcItem.permissions || 755
                }
              };
              
              newFS[targetBasePath] = { ...newFS[srcInfo.fullPath] };
              
              Object.keys(newFS).forEach(k => {
                if (k.startsWith(srcPrefix)) {
                  const relativeSubPath = k.substring(srcPrefix.length);
                  const subTargetPath = `${targetBasePath}/${relativeSubPath}`;
                  newFS[subTargetPath] = { ...newFS[k] };
                }
              });
            }
          }
          
          return newFS;
        });
        break;
      }

      case "mv": {
        if (args.length < 2) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-mv-err`, text: "mv: argumentos de origem e/ou destino ausentes.", type: "error", timestamp }]);
          break;
        }
        
        const src = args[0];
        const dest = args[1];
        
        const srcInfo = resolveVirtualPath(src);
        const destInfo = resolveVirtualPath(dest);
        
        const srcParent = virtualFS[srcInfo.parentDir] || {};
        const srcItem = srcParent[srcInfo.name];
        
        if (!srcItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-mv-no-src`, text: `mv: '${src}': Arquivo ou diretório não encontrado`, type: "error", timestamp }]);
          break;
        }
        
        const destDirContents = virtualFS[destInfo.fullPath];
        const destIsExistingDir = destDirContents && typeof destDirContents === "object";
        
        setVirtualFS(prev => {
          const newFS = { ...prev };
          
          const updatedSrcParent = { ...newFS[srcInfo.parentDir] };
          delete updatedSrcParent[srcInfo.name];
          newFS[srcInfo.parentDir] = updatedSrcParent;
          
          if (srcItem.type === "file") {
            if (destIsExistingDir) {
              const targetDirPath = destInfo.fullPath;
              newFS[targetDirPath] = {
                ...newFS[targetDirPath],
                [srcInfo.name]: srcItem
              };
            } else {
              const targetParentPath = destInfo.parentDir;
              newFS[targetParentPath] = {
                ...newFS[targetParentPath],
                [destInfo.name]: {
                  ...srcItem,
                  name: destInfo.name
                }
              };
            }
          } else {
            const targetBasePath = destIsExistingDir
              ? (destInfo.fullPath === "/" ? `/${srcInfo.name}` : `${destInfo.fullPath}/${srcInfo.name}`)
              : destInfo.fullPath;
            
            const targetBaseInfo = resolveVirtualPath(targetBasePath);
            newFS[targetBaseInfo.parentDir] = {
              ...newFS[targetBaseInfo.parentDir],
              [targetBaseInfo.name]: {
                ...srcItem,
                name: targetBaseInfo.name
              }
            };
            
            newFS[targetBasePath] = newFS[srcInfo.fullPath];
            delete newFS[srcInfo.fullPath];
            
            const srcPrefix = srcInfo.fullPath === "/" ? "/" : srcInfo.fullPath + "/";
            Object.keys(newFS).forEach(k => {
              if (k.startsWith(srcPrefix)) {
                const relativeSubPath = k.substring(srcPrefix.length);
                const subTargetPath = `${targetBasePath}/${relativeSubPath}`;
                newFS[subTargetPath] = newFS[k];
                delete newFS[k];
              }
            });
          }
          
          return newFS;
        });
        break;
      }

      case "nano":
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-nano-err`, text: "nano: especifique o arquivo que deseja abrir e editar.", type: "error", timestamp }]);
          break;
        }
        const nanoFile = args[0];
        const dirObj = virtualFS[currentPath] || {};
        let fileToEdit = dirObj[nanoFile];

        if (!fileToEdit) {
          // Create file if it doesn't exist
          const newFile: FSItem = {
            name: nanoFile,
            type: "file",
            content: "",
            permissions: 644
          };
          setVirtualFS(prev => ({
            ...prev,
            [currentPath]: {
              ...prev[currentPath],
              [nanoFile]: newFile
            }
          }));
          setEditingFile({ path: currentPath, name: nanoFile });
          setNanoContent("");
        } else {
          setEditingFile({ path: currentPath, name: nanoFile });
          setNanoContent(fileToEdit.content || "");
        }
        triggerBeep(350, 0.1, "sine");
        break;

      case "chmod":
        if (args.length < 2) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-chmod-err`, text: "Uso: chmod <modo> <arquivo>  (ex: chmod 755 boot_assist.sh ou chmod +x arquivo)", type: "error", timestamp }]);
          break;
        }
        const modeArg = args[0];
        const permFile = args[1];
        const curD = virtualFS[currentPath] || {};
        if (!curD[permFile]) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-chmod-no`, text: `chmod: não pôde aplicar segurança ao arquivo '${permFile}': Arquivo não encontrado.`, type: "error", timestamp }]);
        } else {
          let permMode = curD[permFile].permissions || 644;
          if (modeArg === "+x" || modeArg === "755" || modeArg === "777") {
            permMode = 755;
          } else {
            const parsed = parseInt(modeArg, 10);
            permMode = isNaN(parsed) ? 644 : parsed;
          }
          setVirtualFS(prev => {
            const next = { ...prev };
            // ensure the directory object is cloned so React notices nested changes
            const dirCopy = { ...(next[currentPath] || {}) };
            dirCopy[permFile] = {
              ...(dirCopy[permFile] || {}),
              permissions: permMode
            };
            next[currentPath] = dirCopy;
            return next;
          });
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-chmod-ok`, text: `Permissões POSIX do arquivo '${permFile}' modificadas com sucesso para ${permMode}.`, type: "success", timestamp }]);
          triggerBeep(520, 0.12, "sine");
        }
        break;

      case "ps":
        setTerminalLines(prev => {
          const lns = [...prev];
          lns.push({
            id: `${Date.now()}-ps-h`,
            text: `USER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND`,
            type: "system",
            timestamp
          });
          
          lns.push({
            id: `${Date.now()}-ps-1`,
            text: `root         1   0.0  0.1  18231  2210 tty1     S    11:53   0:00 /bin/init`,
            type: "output",
            timestamp
          });
          
          lns.push({
            id: `${Date.now()}-ps-2`,
            text: `operator     8   0.1  0.8 122144  8400 tty1     S    11:53   0:01 /bin/bash`,
            type: "output",
            timestamp
          });

          if (saveState.currentLevelId === 3 && variables?.killedPID !== 1337) {
            // Spyware process in level 3
            lns.push({
              id: `${Date.now()}-ps-spy`,
              text: `spyware_u 1337  94.2  8.2 245388 21450 ?        R    11:58   0:44 /usr/bin/spyware.sh`,
              type: "error", // highlight malware!
              timestamp
            });
          }
          
          return lns;
        });
        break;

      case "kill":
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-kill-err`, text: "kill: especifique o PID numérico.", type: "error", timestamp }]);
          break;
        }

        const rawPID = args.includes("-9") ? args[args.indexOf("-9") + 1] : args[0];
        const pidInt = parseInt(rawPID, 10);

        if (saveState.currentLevelId === 3 && pidInt === 1337) {
          setVariables(prev => ({ ...prev, killedPID: 1337, killedProcess: "spyware.sh" }));
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-kill-success`,
              text: `[SINAL EMITIDO] kill -SIGKILL 1337: Célula de malware suspensa. Limpeza de pilha efetuada.`,
              type: "success",
              timestamp
            }
          ]);
          triggerBeep(300, 0.15, "sine");
          triggerBeep(150, 0.12, "sine");
        } else {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-kill-miss`,
              text: `kill: falha ao enviar sinal ao PID ${rawPID}: ID de processo inoperante ou acesso não concedido.`,
              type: "error",
              timestamp
            }
          ]);
        }
        break;

      case "curl":
        // e.g. curl -o chaves.key http://bunker-api.local/get-keys
        if (args.length < 3 || !args.includes("-o")) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-curl-err`, text: "Uso: curl -o <nome-destino> <url-remota>  (ex: curl -o chaves.key http://bunker-api.local/get-keys)", type: "error", timestamp }]);
          break;
        }

        const outIndex = args.indexOf("-o");
        const outFilename = args[outIndex + 1];
        const remoteURL = args.find((val, idx) => idx !== outIndex && idx !== (outIndex + 1));

        if (saveState.currentLevelId === 4 && remoteURL === "http://bunker-api.local/get-keys") {
          // Success download
          setVirtualFS(prev => ({
            ...prev,
            [currentPath]: {
              ...prev[currentPath],
              [outFilename]: {
                name: outFilename,
                type: "file",
                content: "=== CRYPTO KEY PAIR SIGNATURE v2 ===\nbunker_sign:fcfc998a4422da88e0",
                permissions: 644
              }
            }
          }));

          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-curl-net`,
              text: `Conectando em bunker-api.local (10.0.0.12) na porta 80... conectado.`,
              type: "system",
              timestamp
            },
            {
              id: `${Date.now()}-curl-ok`,
              text: `Requisição GET HTTP Efetuada. Salvo como '${outFilename}' [102 bytes].`,
              type: "success",
              timestamp
            }
          ]);
          triggerBeep(440, 0.2, "sine");
        } else {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-curl-fail`,
              text: `curl: fahrenheit-network erro 404: DNS não resolvido ou link de rede fora do cluster local para ${remoteURL || "URL"}.`,
              type: "error",
              timestamp
            }
          ]);
        }
        break;

      case "scp":
        // e.g. scp chaves.key backup@10.0.0.4:/backup
        if (args.length < 2) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-scp-err`, text: "Uso: scp <arquivo-local> <usuario>@<ip>:<caminho>  (ex: scp chaves.key backup@10.0.0.4:/backup)", type: "error", timestamp }]);
          break;
        }

        const sourceFile = args[0];
        const targetHost = args[1]; // e.g. backup@10.0.0.4:/backup

        const localDir = virtualFS[currentPath] || {};
        if (!localDir[sourceFile]) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-scp-no`, text: `scp: ${sourceFile}: Arquivo local inexistente.`, type: "error", timestamp }]);
        } else if (saveState.currentLevelId === 4 && targetHost === "backup@10.0.0.4:/backup") {
          setVariables(prev => ({ ...prev, scpTransferred: true, scpTarget: targetHost }));
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-scp-sys`,
              text: `Iniciando SSH Handshake encriptado... SSHv2 AES-256-GCM Sincronizado.`,
              type: "system",
              timestamp
            },
            {
              id: `${Date.now()}-scp-ok`,
              text: `Enviando '${sourceFile}' para backup@10.0.0.4:/backup. Concluido (100%).`,
              type: "success",
              timestamp
            }
          ]);
          triggerBeep(520, 0.15, "sine");
        } else {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-scp-timeout`,
              text: `scp: Conexão esgotada por SSH Timeout ao tentar contatar host '${targetHost}'. Confirme as metas de rede local do bunker no briefing.`,
              type: "error",
              timestamp
            }
          ]);
        }
        break;

      case "docker":
        // e.g. docker build -t app:v1 .
        if (args[0] === "build") {
          const tagIndex = args.indexOf("-t");
          const tagValue = args[tagIndex + 1];
          const hasDot = args.includes(".");

          if (tagValue === "app:v1" && hasDot) {
            setVariables(prev => ({ ...prev, dockerBuilt: true }));
            setTerminalLines(prev => [
              ...prev,
              {
                id: `${Date.now()}-doc-1`,
                text: `Sending build context to Docker daemon  4.096kB`,
                type: "system",
                timestamp
              },
              {
                id: `${Date.now()}-doc-2`,
                text: `Step 1/3 : FROM alpine  --->  fcfc998ad44a`,
                type: "output",
                timestamp
              },
              {
                id: `${Date.now()}-doc-3`,
                text: `Step 2/3 : COPY . /app --->  Using cache`,
                type: "output",
                timestamp
              },
              {
                id: `${Date.now()}-doc-4`,
                text: `Step 3/3 : EXPOSE 3000 ---> Running in e092efba88c`,
                type: "output",
                timestamp
              },
              {
                id: `${Date.now()}-doc-5`,
                text: `Successfully built image app:v1`,
                type: "success",
                timestamp
              }
            ]);
            triggerBeep(300, 0.1, "sine");
            triggerBeep(450, 0.1, "sine");
            triggerBeep(600, 0.12, "sine");
          } else {
            setTerminalLines(prev => [
              ...prev,
              {
                id: `${Date.now()}-doc-e`,
                text: `docker: Falha ao compilar dockerfile. Certifique-se de usar a imagem recomendada com o comando: 'docker build -t app:v1 .'`,
                type: "error",
                timestamp
              }
            ]);
          }
        } else {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-doc-no-cmd`, text: `docker: comando '${args[0]}' desconhecido no sandbox.`, type: "error", timestamp }]);
        }
        break;

      case "echo": {
        const echoText = args.join(" ").replace(/^["']/g, "").replace(/["']$/g, "");
        handleRedirectOrPrint([{ text: echoText, type: "output" }]);
        break;
      }
      case "sh":
        setTerminalLines(prev => [...prev, { id: `${Date.now()}-sh-empty`, text: "sh: nome de script requerido", type: "error", timestamp }]);
        break;

      case "rm": {
        const isRecursive = args.includes("-r") || args.includes("-R") || args.some(arg => arg.startsWith("-") && (arg.includes("r") || arg.includes("R")));
        const force = args.includes("-f") || args.some(arg => arg.startsWith("-") && arg.includes("f"));
        const targets = args.filter(arg => !arg.startsWith("-"));
        
        if (targets.length === 0) {
          if (!force) {
            handleRedirectOrPrint([{ text: "rm: falta operando", type: "error" }]);
          }
          break;
        }
        
        let success = true;
        const outLines: { text: string; type: "output" | "error" }[] = [];
        
        setVirtualFS(prev => {
          const next = { ...prev };
          targets.forEach(rawPath => {
            const resolved = resolveVirtualPath(rawPath);
            const parentDir = next[resolved.parentDir];
            if (!parentDir || !parentDir[resolved.name]) {
              if (!force) {
                outLines.push({ text: `rm: não foi possível remover '${rawPath}': Arquivo ou diretório não encontrado`, type: "error" });
                success = false;
              }
              return;
            }
            
            const item = parentDir[resolved.name];
            if (item.type === "dir" && !isRecursive) {
              outLines.push({ text: `rm: não foi possível remover '${rawPath}': É um diretório`, type: "error" });
              success = false;
              return;
            }
            
            const updatedParent = { ...parentDir };
            delete updatedParent[resolved.name];
            next[resolved.parentDir] = updatedParent;
            
            if (item.type === "dir") {
              const prefix = resolved.fullPath === "/" ? "/" : resolved.fullPath + "/";
              Object.keys(next).forEach(k => {
                if (k === resolved.fullPath || k.startsWith(prefix)) {
                  delete next[k];
                }
              });
            }
          });
          return success ? next : prev;
        });
        
        if (outLines.length > 0) {
          handleRedirectOrPrint(outLines);
        }
        break;
      }

      case "rmdir": {
        const targets = args.filter(arg => !arg.startsWith("-"));
        if (targets.length === 0) {
          handleRedirectOrPrint([{ text: "rmdir: falta operando", type: "error" }]);
          break;
        }
        
        let success = true;
        const outLines: { text: string; type: "output" | "error" }[] = [];
        
        setVirtualFS(prev => {
          const next = { ...prev };
          targets.forEach(rawPath => {
            const resolved = resolveVirtualPath(rawPath);
            const parentDir = next[resolved.parentDir];
            if (!parentDir || !parentDir[resolved.name]) {
              outLines.push({ text: `rmdir: falha ao remover '${rawPath}': Arquivo ou diretório não encontrado`, type: "error" });
              success = false;
              return;
            }
            const item = parentDir[resolved.name];
            if (item.type !== "dir") {
              outLines.push({ text: `rmdir: falha ao remover '${rawPath}': Não é um diretório`, type: "error" });
              success = false;
              return;
            }
            const dirContents = next[resolved.fullPath] || {};
            if (Object.keys(dirContents).length > 0) {
              outLines.push({ text: `rmdir: falha ao remover '${rawPath}': O diretório não está vazio`, type: "error" });
              success = false;
              return;
            }
            
            const updatedParent = { ...parentDir };
            delete updatedParent[resolved.name];
            next[resolved.parentDir] = updatedParent;
            delete next[resolved.fullPath];
          });
          return success ? next : prev;
        });
        
        if (outLines.length > 0) {
          handleRedirectOrPrint(outLines);
        }
        break;
      }

      case "grep":
      case "egrep":
      case "zgrep": {
        const optV = args.includes("-v");
        const optI = args.includes("-i");
        const optO = args.includes("-o");
        const optC = args.includes("-c");
        const optE = args.includes("-E") || cmd === "egrep";
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-"));
        
        if (nonFlagArgs.length < 1) {
          handleRedirectOrPrint([{ text: "grep: padrão de busca ausente", type: "error" }]);
          break;
        }
        
        const pattern = nonFlagArgs[0];
        const files = nonFlagArgs.slice(1);
        
        if (files.length === 0) {
          handleRedirectOrPrint([{ text: "grep: informe o arquivo para busca", type: "error" }]);
          break;
        }
        
        const outLines: { text: string; type: "output" | "error" }[] = [];
        const activeDir = virtualFS[currentPath] || {};
        
        files.forEach(fileTarget => {
          const item = activeDir[fileTarget];
          if (!item) {
            outLines.push({ text: `grep: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" });
            return;
          }
          if (item.type === "dir") {
            outLines.push({ text: `grep: ${fileTarget}: É um diretório`, type: "error" });
            return;
          }
          
          let content = item.content || "";
          if (content.startsWith("__GZIP_TEXT__:")) {
            content = content.substring("__GZIP_TEXT__:".length);
          } else if (content.startsWith("__GZIP__:")) {
            content = "SECRET_ACCESS_KEY=\"KEY_DEC_8891_AURA_SECURE\"";
          }
          
          const fileLines = content.split("\n");
          let matchCount = 0;
          
          let regex: RegExp;
          try {
            const flags = optI ? "i" : "";
            regex = new RegExp(optE ? pattern : pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
          } catch (e) {
            outLines.push({ text: `grep: expressão regular inválida: ${pattern}`, type: "error" });
            return;
          }
          
          fileLines.forEach(l => {
            const isMatch = regex.test(l);
            const shouldPrint = optV ? !isMatch : isMatch;
            
            if (shouldPrint) {
              matchCount++;
              if (!optC) {
                if (optO && isMatch) {
                  const matches = l.match(regex);
                  if (matches) {
                    matches.forEach(m => outLines.push({ text: m, type: "output" }));
                  }
                } else {
                  outLines.push({ text: l, type: "output" });
                }
              }
            }
          });
          
          if (optC) {
            outLines.push({ text: String(matchCount), type: "output" });
          }
        });
        
        handleRedirectOrPrint(outLines);
        break;
      }

      case "sed": {
        const optI = args.includes("-i");
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-"));
        
        if (nonFlagArgs.length < 1) {
          handleRedirectOrPrint([{ text: "sed: comando ausente", type: "error" }]);
          break;
        }
        
        const sedCmd = nonFlagArgs[0];
        const fileTarget = nonFlagArgs[1];
        
        if (!fileTarget) {
          handleRedirectOrPrint([{ text: "sed: arquivo não informado", type: "error" }]);
          break;
        }
        
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        
        if (!item) {
          handleRedirectOrPrint([{ text: `sed: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        if (item.type === "dir") {
          handleRedirectOrPrint([{ text: `sed: ${fileTarget}: É um diretório`, type: "error" }]);
          break;
        }
        
        const match = sedCmd.match(/^s(.)(.+?)\1(.*)\1([gI]*)$/);
        if (!match) {
          handleRedirectOrPrint([{ text: `sed: expressão não suportada: ${sedCmd}`, type: "error" }]);
          break;
        }
        
        const delimiter = match[1];
        const pattern = match[2];
        const replacement = match[3];
        const flags = match[4];
        
        let jsFlags = "";
        if (flags.includes("g")) jsFlags += "g";
        if (flags.includes("I")) jsFlags += "i";
        
        let regex: RegExp;
        try {
          regex = new RegExp(pattern, jsFlags);
        } catch (e) {
          handleRedirectOrPrint([{ text: `sed: expressão regular inválida: ${pattern}`, type: "error" }]);
          break;
        }
        
        const lines = (item.content || "").split("\n");
        const processedLines = lines.map(line => line.replace(regex, replacement));
        const newContent = processedLines.join("\n");
        
        if (optI) {
          setVirtualFS(prev => {
            const nextDir = { ...prev[currentPath] };
            nextDir[fileTarget] = {
              ...nextDir[fileTarget],
              content: newContent
            };
            return {
              ...prev,
              [currentPath]: nextDir
            };
          });
        } else {
          handleRedirectOrPrint(processedLines.map(l => ({ text: l, type: "output" })));
        }
        break;
      }

      case "find": {
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-") && arg !== ";" && arg !== "{}");
        const nameIdx = args.indexOf("-name");
        const sizeIdx = args.indexOf("-size");
        const execIdx = args.indexOf("-exec");
        
        const targetDir = nonFlagArgs[0] || ".";
        const targetName = nameIdx !== -1 ? args[nameIdx + 1] : "";
        const targetSize = sizeIdx !== -1 ? args[sizeIdx + 1] : "";
        
        let execCmd = "";
        let execArgs: string[] = [];
        if (execIdx !== -1) {
          const execSlice = args.slice(execIdx + 1);
          const semiIdx = execSlice.indexOf(";");
          const endIdx = semiIdx !== -1 ? semiIdx : execSlice.length;
          execCmd = execSlice[0];
          execArgs = execSlice.slice(1, endIdx);
        }
        
        const resolvedBase = getTargetDirectory(cleanHomePath(targetDir));
        const outLines: { text: string; type: "output" | "error" }[] = [];
        
        const matchesName = (filename: string, pattern: string) => {
          if (!pattern) return true;
          const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\\\*/g, '.*');
          return new RegExp(`^${escapedPattern}$`).test(filename);
        };
        
        const matchesSize = (contentLength: number, sizeExpr: string) => {
          if (!sizeExpr) return true;
          const match = sizeExpr.match(/^([+-]?)(\d+)([kMG]?)$/);
          if (!match) return true;
          
          const sign = match[1];
          let val = parseInt(match[2], 10);
          const unit = match[3];
          
          if (unit === "k") val *= 1024;
          if (unit === "M") val *= 1024 * 1024;
          if (unit === "G") val *= 1024 * 1024 * 1024;
          
          if (sign === "+") return contentLength > val;
          if (sign === "-") return contentLength < val;
          return contentLength === val;
        };
        
        const matchesList: string[] = [];
        
        Object.keys(virtualFS).forEach(dirPath => {
          if (dirPath === resolvedBase || dirPath.startsWith(resolvedBase === "/" ? "/" : resolvedBase + "/")) {
            const contents = virtualFS[dirPath] || {};
            Object.keys(contents).forEach(filename => {
              const item = contents[filename];
              const relativePath = (dirPath === "/" ? `/${filename}` : `${dirPath}/${filename}`).replace("//", "/");
              let relativeToSearch = relativePath;
              if (targetDir === ".") {
                relativeToSearch = relativePath.replace(resolvedBase === "/" ? "/" : resolvedBase, ".").replace("//", "/");
                if (relativeToSearch.startsWith("/.")) relativeToSearch = relativeToSearch.substring(1);
              }
              
              if (matchesName(filename, targetName) && matchesSize((item.content || "").length, targetSize)) {
                matchesList.push(relativeToSearch);
              }
            });
          }
        });
        
        if (execCmd) {
          matchesList.forEach(m => {
            const finalArgs = execArgs.map(arg => arg === "{}" ? m : arg);
            const cmdLine = `${execCmd} ${finalArgs.join(" ")}`;
            executeTerminalCommand(cmdLine);
          });
        } else {
          matchesList.forEach(m => outLines.push({ text: m, type: "output" }));
          handleRedirectOrPrint(outLines);
        }
        break;
      }

      case "tar": {
        const czfIdx = args.findIndex(arg => arg.includes("c") && arg.includes("z") && arg.includes("f"));
        const xzfIdx = args.findIndex(arg => arg.includes("x") && arg.includes("z") && arg.includes("f"));
        const tzfIdx = args.findIndex(arg => arg.includes("t") && arg.includes("z") && arg.includes("f"));
        const tfIdx = args.findIndex(arg => arg.includes("t") && arg.includes("f"));
        const cfIdx = args.findIndex(arg => arg.includes("c") && arg.includes("f"));
        const xfIdx = args.findIndex(arg => arg.includes("x") && arg.includes("f"));
        
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-"));
        
        if (czfIdx !== -1 || cfIdx !== -1) {
          if (nonFlagArgs.length < 2) {
            handleRedirectOrPrint([{ text: "tar: arquivo destino e/ou origem ausentes", type: "error" }]);
            break;
          }
          const tarball = nonFlagArgs[0];
          const source = nonFlagArgs[1];
          
          const resolvedSrc = getTargetDirectory(cleanHomePath(source));
          const filesToPack: string[] = [];
          
          Object.keys(virtualFS).forEach(dirPath => {
            if (dirPath === resolvedSrc || dirPath.startsWith(resolvedSrc === "/" ? "/" : resolvedSrc + "/")) {
              const contents = virtualFS[dirPath] || {};
              Object.keys(contents).forEach(filename => {
                const item = contents[filename];
                if (item.type === "file") {
                  const rel = (dirPath.replace(resolvedSrc, source) + "/" + filename).replace("//", "/");
                  filesToPack.push(rel);
                }
              });
            }
          });
          
          if (filesToPack.length === 0) {
            const resolvedSrcInfo = resolveVirtualPath(source);
            const parent = virtualFS[resolvedSrcInfo.parentDir] || {};
            if (parent[resolvedSrcInfo.name] && parent[resolvedSrcInfo.name].type === "file") {
              filesToPack.push(source);
            } else {
              handleRedirectOrPrint([{ text: `tar: ${source}: Arquivo ou diretório não encontrado`, type: "error" }]);
              break;
            }
          }
          
          const tarballInfo = resolveVirtualPath(tarball);
          setVirtualFS(prev => {
            const dirContents = { ...prev[tarballInfo.parentDir] };
            dirContents[tarballInfo.name] = {
              name: tarballInfo.name,
              type: "file",
              content: `__TAR_GZ__:${filesToPack.join(",")}`,
              permissions: 644
            };
            return {
              ...prev,
              [tarballInfo.parentDir]: dirContents
            };
          });
          break;
        } else if (xzfIdx !== -1 || xfIdx !== -1) {
          if (nonFlagArgs.length < 1) {
            handleRedirectOrPrint([{ text: "tar: informe o arquivo a ser extraído", type: "error" }]);
            break;
          }
          const tarball = nonFlagArgs[0];
          const resolvedTarball = resolveVirtualPath(tarball);
          const dirObj = virtualFS[resolvedTarball.parentDir] || {};
          const item = dirObj[resolvedTarball.name];
          
          if (!item || !item.content?.startsWith("__TAR_GZ__:")) {
            handleRedirectOrPrint([{ text: `tar: ${tarball}: Não é um arquivo tar/gzip válido`, type: "error" }]);
            break;
          }
          
          const files = item.content.substring("__TAR_GZ__:".length).split(",");
          setVirtualFS(prev => {
            const next = { ...prev };
            files.forEach(f => {
              const filename = f.split('/').pop() || "";
              const dirContents = { ...next[currentPath] };
              dirContents[filename] = {
                name: filename,
                type: "file",
                content: `Extraído de ${f}`,
                permissions: 644
              };
              next[currentPath] = dirContents;
            });
            return next;
          });
          break;
        } else if (tzfIdx !== -1 || tfIdx !== -1) {
          if (nonFlagArgs.length < 1) {
            handleRedirectOrPrint([{ text: "tar: informe o arquivo para listagem", type: "error" }]);
            break;
          }
          const tarball = nonFlagArgs[0];
          const resolvedTarball = resolveVirtualPath(tarball);
          const dirObj = virtualFS[resolvedTarball.parentDir] || {};
          const item = dirObj[resolvedTarball.name];
          
          if (!item || !item.content?.startsWith("__TAR_GZ__:")) {
            handleRedirectOrPrint([{ text: `tar: ${tarball}: Não é um arquivo tar/gzip válido`, type: "error" }]);
            break;
          }
          
          const files = item.content.substring("__TAR_GZ__:".length).split(",");
          handleRedirectOrPrint(files.map(f => ({ text: f, type: "output" })));
          break;
        }
        break;
      }

      case "gzip": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "gzip: especifique o arquivo", type: "error" }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        
        if (!item) {
          handleRedirectOrPrint([{ text: `gzip: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        if (item.type === "dir") {
          handleRedirectOrPrint([{ text: `gzip: ${fileTarget}: É um diretório`, type: "error" }]);
          break;
        }
        
        const gzipFilename = `${fileTarget}.gz`;
        setVirtualFS(prev => {
          const nextDir = { ...prev[currentPath] };
          delete nextDir[fileTarget];
          nextDir[gzipFilename] = {
            name: gzipFilename,
            type: "file",
            content: `__GZIP__:${fileTarget}`,
            permissions: 644
          };
          return {
            ...prev,
            [currentPath]: nextDir
          };
        });
        break;
      }

      case "gunzip": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "gunzip: especifique o arquivo", type: "error" }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        
        if (!item) {
          handleRedirectOrPrint([{ text: `gunzip: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        if (!fileTarget.endsWith(".gz") || !item.content?.startsWith("__GZIP__:")) {
          handleRedirectOrPrint([{ text: `gunzip: ${fileTarget}: Formato desconhecido`, type: "error" }]);
          break;
        }
        
        const origFilename = fileTarget.substring(0, fileTarget.length - 3);
        setVirtualFS(prev => {
          const nextDir = { ...prev[currentPath] };
          delete nextDir[fileTarget];
          nextDir[origFilename] = {
            name: origFilename,
            type: "file",
            content: `Descompactado de ${fileTarget}`,
            permissions: 644
          };
          return {
            ...prev,
            [currentPath]: nextDir
          };
        });
        break;
      }

      case "zcat": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "zcat: especifique o arquivo", type: "error" }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        
        if (!item) {
          handleRedirectOrPrint([{ text: `zcat: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        let content = item.content || "";
        if (content.startsWith("__GZIP_TEXT__:")) {
          content = content.substring("__GZIP_TEXT__:".length);
        } else if (content.startsWith("__GZIP__:")) {
          content = "SECRET_ACCESS_KEY=\"KEY_DEC_8891_AURA_SECURE\"";
        }
        
        handleRedirectOrPrint(content.split("\n").map(l => ({ text: l, type: "output" })));
        break;
      }

      case "sort": {
        const fileTarget = args.filter(arg => !arg.startsWith("-"))[0];
        if (!fileTarget) {
          handleRedirectOrPrint([{ text: "sort: especifique o arquivo", type: "error" }]);
          break;
        }
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        if (!item) {
          handleRedirectOrPrint([{ text: `sort: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        const lines = (item.content || "").split("\n").filter(Boolean);
        lines.sort();
        handleRedirectOrPrint(lines.map(l => ({ text: l, type: "output" })));
        break;
      }

      case "uniq": {
        const optC = args.includes("-c");
        const fileTarget = args.filter(arg => !arg.startsWith("-"))[0];
        if (!fileTarget) {
          handleRedirectOrPrint([{ text: "uniq: especifique o arquivo", type: "error" }]);
          break;
        }
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        if (!item) {
          handleRedirectOrPrint([{ text: `uniq: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        const lines = (item.content || "").split("\n").filter(Boolean);
        const uniqueLines: { text: string; count: number }[] = [];
        
        lines.forEach(l => {
          if (uniqueLines.length === 0 || uniqueLines[uniqueLines.length - 1].text !== l) {
            uniqueLines.push({ text: l, count: 1 });
          } else {
            uniqueLines[uniqueLines.length - 1].count++;
          }
        });
        
        const out = uniqueLines.map(ul => ({
          text: optC ? `      ${ul.count} ${ul.text}` : ul.text,
          type: "output" as const
        }));
        handleRedirectOrPrint(out);
        break;
      }

      case "cut": {
        const dIdx = args.indexOf("-d");
        const fIdx = args.indexOf("-f");
        const delimiter = dIdx !== -1 ? args[dIdx + 1] : "\t";
        const fieldsStr = fIdx !== -1 ? args[fIdx + 1] : "1";
        const fields = fieldsStr.split(",").map(n => parseInt(n, 10) - 1);
        
        const fileTarget = args.filter(arg => !arg.startsWith("-") && arg !== delimiter && arg !== fieldsStr)[0];
        if (!fileTarget) {
          handleRedirectOrPrint([{ text: "cut: especifique o arquivo", type: "error" }]);
          break;
        }
        
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        if (!item) {
          handleRedirectOrPrint([{ text: `cut: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        const lines = (item.content || "").split("\n");
        const out = lines.map(line => {
          const parts = line.split(delimiter);
          const cutParts = fields.map(f => parts[f] || "").join(delimiter);
          return { text: cutParts, type: "output" as const };
        });
        handleRedirectOrPrint(out);
        break;
      }

      case "awk": {
        const fIdx = args.indexOf("-F");
        const delimiter = fIdx !== -1 ? args[fIdx + 1] : " ";
        const nonFlagArgs = args.filter(arg => !arg.startsWith("-") && arg !== delimiter);
        
        if (nonFlagArgs.length < 2) {
          handleRedirectOrPrint([{ text: "awk: uso incorreto do comando", type: "error" }]);
          break;
        }
        
        const expression = nonFlagArgs[0];
        const fileTarget = nonFlagArgs[1];
        
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        if (!item) {
          handleRedirectOrPrint([{ text: `awk: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        const printMatch = expression.match(/print\s+(.+)$/);
        const fields: number[] = [];
        if (printMatch) {
          const rawFields = printMatch[1].replace(/[{}]/g, "").split(",");
          rawFields.forEach(f => {
            const num = parseInt(f.trim().replace("$", ""), 10);
            if (!isNaN(num)) fields.push(num - 1);
          });
        }
        
        const lines = (item.content || "").split("\n");
        const out = lines.map(line => {
          const parts = line.split(delimiter);
          const awkParts = fields.map(f => parts[f] || "").join(" ");
          return { text: awkParts, type: "output" as const };
        });
        handleRedirectOrPrint(out);
        break;
      }

      case "stat": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "stat: especifique o arquivo", type: "error" }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const item = activeDir[fileTarget];
        
        if (!item) {
          handleRedirectOrPrint([{ text: `stat: ${fileTarget}: Arquivo ou diretório não encontrado`, type: "error" }]);
          break;
        }
        
        const size = (item.content || "").length;
        const type = item.type === "dir" ? "directory" : "regular file";
        const perms = item.permissions || (item.type === "dir" ? 755 : 644);
        
        handleRedirectOrPrint([
          { text: `  File: ${fileTarget}`, type: "output" },
          { text: `  Size: ${size}        Blocks: 8          IO Block: 4096   ${type}`, type: "output" },
          { text: `Access: (${perms})  Uid: ( 1000/operator)   Gid: ( 1000/operator)`, type: "output" },
          { text: "Modify: 2023-01-01 12:00:00.000000000 -0300", type: "output" }
        ]);
        break;
      }

      case "dialog": {
        const msgboxIdx = args.indexOf("--msgbox");
        const yesnoIdx = args.indexOf("--yesno");
        const inputboxIdx = args.indexOf("--inputbox");
        const menuIdx = args.indexOf("--menu");
        const titleIdx = args.indexOf("--title");
        const title = titleIdx !== -1 ? args[titleIdx + 1] : "dialog";
        
        if (msgboxIdx !== -1) {
          const text = args[msgboxIdx + 1];
          const width = parseInt(args[msgboxIdx + 3], 10) || 50;
          
          const border = "+".padEnd(width - 1, "-") + "+";
          const titleLine = `| ${title.toUpperCase()} |`.padStart(Math.floor((width + title.length) / 2), " ").padEnd(width - 1, " ") + "|";
          const textLine = `| ${text} |`.padStart(Math.floor((width + text.length) / 2), " ").padEnd(width - 1, " ") + "|";
          const okLine = "| [  OK  ] |".padStart(Math.floor((width + 8) / 2), " ").padEnd(width - 1, " ") + "|";
          
          handleRedirectOrPrint([
            { text: border, type: "output" },
            { text: titleLine, type: "output" },
            { text: "|".padEnd(width - 1, " ") + "|", type: "output" },
            { text: textLine, type: "output" },
            { text: "|".padEnd(width - 1, " ") + "|", type: "output" },
            { text: okLine, type: "output" },
            { text: border, type: "output" }
          ]);
        } else if (yesnoIdx !== -1) {
          const text = args[yesnoIdx + 1];
          const width = parseInt(args[yesnoIdx + 3], 10) || 50;
          
          const border = "+".padEnd(width - 1, "-") + "+";
          const textLine = `| ${text} |`.padStart(Math.floor((width + text.length) / 2), " ").padEnd(width - 1, " ") + "|";
          const btnLine = "|  < Sim >    < Não >  |".padStart(Math.floor((width + 22) / 2), " ").padEnd(width - 1, " ") + "|";
          
          handleRedirectOrPrint([
            { text: border, type: "output" },
            { text: textLine, type: "output" },
            { text: "|".padEnd(width - 1, " ") + "|", type: "output" },
            { text: btnLine, type: "output" },
            { text: border, type: "output" }
          ]);
        } else if (inputboxIdx !== -1) {
          const text = args[inputboxIdx + 1];
          const width = parseInt(args[inputboxIdx + 3], 10) || 50;
          
          const border = "+".padEnd(width - 1, "-") + "+";
          const textLine = `| ${text} |`.padStart(Math.floor((width + text.length) / 2), " ").padEnd(width - 1, " ") + "|";
          const inputLine = "| [__________________________] |".padStart(Math.floor((width + 30) / 2), " ").padEnd(width - 1, " ") + "|";
          
          handleRedirectOrPrint([
            { text: border, type: "output" },
            { text: textLine, type: "output" },
            { text: "|".padEnd(width - 1, " ") + "|", type: "output" },
            { text: inputLine, type: "output" },
            { text: border, type: "output" }
          ]);
        } else if (menuIdx !== -1) {
          const text = args[menuIdx + 1];
          const width = parseInt(args[menuIdx + 3], 10) || 50;
          
          const border = "+".padEnd(width - 1, "-") + "+";
          handleRedirectOrPrint([
            { text: border, type: "output" },
            { text: `| ${text} |`, type: "output" },
            { text: "| 1. Iniciar Diagnóstico |", type: "output" },
            { text: "| 2. Visualizar Logs     |", type: "output" },
            { text: border, type: "output" }
          ]);
        }
        break;
      }

      case "df": {
        handleRedirectOrPrint([
          { text: "Filesystem      Size  Used Avail Use% Mounted on", type: "output" },
          { text: "/dev/sda1        50G   12G   38G  24% /", type: "output" },
          { text: "tmpfs           2.0G     0  2.0G   0% /dev/shm", type: "output" }
        ]);
        break;
      }

      case "free": {
        handleRedirectOrPrint([
          { text: "              total        used        free      shared  buff/cache   available", type: "output" },
          { text: "Mem:        2048000      782100     1265900           0      300000     1100000", type: "output" },
          { text: "Swap:       1024000           0     1024000", type: "output" }
        ]);
        break;
      }

      case "uptime": {
        handleRedirectOrPrint([{ text: " 19:35:00 up 2:44,  1 user,  load average: 0.12, 0.08, 0.05", type: "output" }]);
        break;
      }

      case "ip":
      case "ifconfig": {
        handleRedirectOrPrint([
          { text: "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", type: "output" },
          { text: "        inet 10.0.0.15  netmask 255.255.255.0  broadcast 10.0.0.255", type: "output" },
          { text: "        ether 02:42:0a:00:00:0f  txqueuelen 1000  (Ethernet)", type: "output" }
        ]);
        break;
      }

      case "env":
      case "printenv": {
        handleRedirectOrPrint([
          { text: "USER=operator", type: "output" },
          { text: "HOME=/home/operator", type: "output" },
          { text: "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin", type: "output" },
          { text: "SHELL=/bin/bash", type: "output" },
          { text: "COMPARTIMENTO=Beta-4", type: "output" }
        ]);
        break;
      }

      case "pgrep": {
        const procName = args[0];
        if (procName === "spyware.sh") {
          handleRedirectOrPrint([{ text: "1337", type: "output" }]);
        } else {
          handleRedirectOrPrint([]);
        }
        break;
      }

      case "sleep": {
        break;
      }

      case "flock": {
        const cIdx = args.indexOf("-c");
        if (cIdx !== -1 && cIdx + 1 < args.length) {
          const commandToRun = args.slice(cIdx + 1).join(" ").replace(/^["']|["']$/g, "");
          executeTerminalCommand(commandToRun);
        }
        break;
      }

      case "vim": {
        if (args.length === 0) {
          handleRedirectOrPrint([{ text: "vim: especifique o arquivo que deseja abrir e editar.", type: "error" }]);
          break;
        }
        const vimFile = args[0];
        const dirObj = virtualFS[currentPath] || {};
        let fileToEdit = dirObj[vimFile];

        if (!fileToEdit) {
          const newFile: FSItem = {
            name: vimFile,
            type: "file",
            content: "",
            permissions: 644
          };
          setVirtualFS(prev => ({
            ...prev,
            [currentPath]: {
              ...prev[currentPath],
              [vimFile]: newFile
            }
          }));
          setEditingFile({ path: currentPath, name: vimFile });
          setNanoContent("");
        } else {
          setEditingFile({ path: currentPath, name: vimFile });
          setNanoContent(fileToEdit.content || "");
        }
        triggerBeep(350, 0.1, "sine");
        break;
      }

      default:
        // Typo simulation or command not found
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-no-cmd-err`,
            text: `bunker-shell: ${cmd}: comando não reconhecido. Digite 'ajuda' para verificar as instruções.`,
            type: "error",
            timestamp
          }
        ]);
        triggerBeep(180, 0.2, "square");
        break;
    }

    setTerminalInput("");
  };

  // Chat with AURA-7 via Gemini server-side route
  const handleSendAuraMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auraMessage.trim() || auraLoading) return;

    const userText = auraMessage.trim();
    setAuraMessage("");
    triggerBeep(450, 0.05, "sine");

    const time = new Date().toLocaleTimeString();
    
    // Add player message
    const updatedChat = [
      ...auraChat,
      { role: "user" as const, content: userText, timestamp: time }
    ];
    setAuraChat(updatedChat);
    setAuraLoading(true);

    try {
      const response = await fetch("/api/gemini/aura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          levelName: currentChallenge.name,
          levelBriefing: currentChallenge.briefing,
          levelHint: currentChallenge.hint,
          operatorName: saveState.playerName || "Rodrigo",
          auraIntegrity: saveState.auraIntegrity,
          history: updatedChat.slice(-6).map(m => ({ role: m.role, content: m.content })),
          llmConfig: saveState.llmConfig
        })
      });

      const data = await response.json();
      setAuraLoading(false);
      triggerBeep(600, 0.15, "sine");
      
      setAuraChat(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "...",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (e) {
      setAuraLoading(false);
      triggerBeep(200, 0.3, "square");
      setAuraChat(prev => [
        ...prev,
        {
          role: "assistant",
          content: "[AURA-7 / Sinal Degradado]: Inconsistência de protocolo de emparelhamento por satélite temporária. Mas continuo alerta. Recomendo usar 'ls' e resolver o arquivo da fase!",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  // Keyboard Navigation through Command History
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeTerminalCommand(terminalInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setTerminalInput(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? -1 : historyIndex + 1;
      if (nextIdx >= commandHistory.length || nextIdx === -1) {
        setHistoryIndex(-1);
        setTerminalInput("");
      } else {
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[nextIdx]);
      }
    }
  };

  // Nano Edit Save
  const saveNanoFile = () => {
    if (!editingFile) return;
    setVirtualFS(prev => {
      const dirContents = { ...prev[editingFile.path] };
      dirContents[editingFile.name] = {
        ...dirContents[editingFile.name],
        content: nanoContent
      };
      
      return {
        ...prev,
        [editingFile.path]: dirContents
      };
    });
    setEditingFile(null);
    triggerBeep(880, 0.1, "sine");
    
    // Add success message in terminal logs
    setTerminalLines(prev => [
      ...prev,
      {
        id: `${Date.now()}-nano-commit`,
        text: `[NANO] Código escrito e gravado na CPU local com sucesso.`,
        type: "success",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  // Easy direct file clicking from the sidebar view
  const openFileFromExplorer = (name: string, item: FSItem) => {
    if (item.type === "dir") {
      setTerminalLines(prev => [
        ...prev,
        {
          id: `${Date.now()}-cd-explorer`,
          text: `Navegando via explorador para: ${name}/`,
          type: "system",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      // simple mock path change if exists
      // as our mock filesystem is simple, we keep it in currentPath
    } else {
      triggerBeep(450, 0.08, "sine");
      setEditingFile({ path: currentPath, name });
      setNanoContent(item.content || "");
    }
  };

  // Return live schematic elements based on the Level's diagnostic profile
  const renderLiveFeedTelemetry = () => {
    switch (currentChallenge.liveSchematicType) {
      case "solar_power":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 relative h-full">
            <div className="text-[10px] text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 w-full rounded py-1 tracking-wider uppercase">
              GRID FOTOVOLTAICO - BUNKER NÚCLEO
            </div>
            
            <div className="flex-1 w-full flex items-center justify-around my-4">
              <div className="flex flex-col items-center">
                <Zap className="w-8 h-8 text-[#ff9d00] animate-pulse" />
                <span className="text-[9px] mt-1 text-[#ff9d00]">MICRO-GERAÇÃO</span>
                <span className="text-sm font-bold text-white">4.8 kW/h</span>
              </div>
              <div className="h-10 w-[2px] bg-[#00ff41]/20"></div>
              <div className="flex flex-col items-center">
                <BatteryRing value={saveState.auraIntegrity} color={saveState.auraIntegrity < 50 ? "#ff9d00" : "#00ff41"} />
                <span className="text-[8px] mt-1">CARGA BATERIAS</span>
                <span className="text-xs font-semibold text-white">{saveState.auraIntegrity}%</span>
              </div>
            </div>

            {/* Pulsing visual graph */}
            <div className="w-full h-12 bg-black border border-[#00ff41]/20 rounded relative overflow-hidden flex items-end">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="text-[8px]">SINAL NAVE RECEPTORA</span>
              </div>
              <div className="w-full flex items-end justify-between h-8 px-1">
                <div className="w-2 h-3 bg-[#00ff41]" />
                <div className="w-2 h-5 bg-[#00ff41]" />
                <div className="w-2 h-7 bg-[#00ff41] animate-pulse" />
                <div className="w-2 h-4 bg-[#00ff41]" />
                <div className="w-2 h-6 bg-[#00ff41]" />
                <div className="w-2 h-8 bg-[#00ff41]" />
                <div className="w-2 h-3 bg-[#00ff41]" />
                <div className="w-2 h-7 bg-[#00ff41]" />
              </div>
            </div>
            <div className="text-[8px] text-[#00d4ff] mt-2">SYS_STATUS: LINK NEURAL REQUER ROTINA SH</div>
          </div>
        );

      case "security_mesh":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 h-full">
            <div className="text-[10px] text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/30 w-full rounded py-1 tracking-wider uppercase">
              MANTAS DE SEGURANÇA POSIX - MERCEARIA
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center w-full gap-2 py-4">
              {/* File status visually represented */}
              <div className="flex items-center gap-4 bg-black/60 p-3 border border-[#00ff41]/10 rounded w-full">
                <Lock className="w-7 h-7 text-[#ff9d00]" />
                <div className="text-left flex-1">
                  <div className="text-xs text-white uppercase font-bold text-[#ff9d00]">backup_credenciais.db</div>
                  <div className="text-[11px] font-mono text-gray-400">
                    Permissões: {virtualFS["/"]?.["backup_credenciais.db"]?.permissions || 777}
                  </div>
                  <div className="text-[9px] text-[#00ff41] mt-0.5">
                    {virtualFS["/"]?.["backup_credenciais.db"]?.permissions === 600 ? "Isolado (Operação Segura)" : "Exposto (Universal)"}
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between items-center text-[10px]">
                <span className="opacity-60">Status Subrede:</span>
                <span className={virtualFS["/"]?.["backup_credenciais.db"]?.permissions === 600 ? "text-[#00ff41]" : "text-[#ff9d00] animate-pulse"}>
                  {virtualFS["/"]?.["backup_credenciais.db"]?.permissions === 600 ? "SEGURO" : "AVISO DE VAZAMENTO"}
                </span>
              </div>
            </div>
            
            <div className="text-[8px] text-gray-500">UTILITÁRIO CHMOD 600 NECESSÁRIO</div>
          </div>
        );

      case "cpu_temperature":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 h-full">
            <div className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/30 w-full rounded py-1 tracking-wider uppercase">
              INDICADOR TÉRMICO DE CLUSTER CPU
            </div>
            
            <div className="flex-1 w-full flex flex-col justify-center gap-2 py-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400">FREQUÊNCIA CORE:</span>
                <span className="text-xs text-red-400 font-mono font-bold animate-pulse">4.92 GHz</span>
              </div>

              <div className="w-full flex items-center justify-between bg-black/60 border border-red-500/20 p-2 rounded">
                <Cpu className="w-8 h-8 text-red-500 animate-bounce" />
                <div className="text-left pl-2 flex-1">
                  <span className="text-[9px] block text-red-400">TEMPERATURA GERAL</span>
                  <span className="text-lg font-bold text-white">
                    {variables?.killedPID === 1337 ? "42 °C" : "94 °C"}
                  </span>
                </div>
                <div className="h-6 w-10 bg-red-500/10 rounded flex items-center justify-center text-xs text-red-400">
                  {variables?.killedPID === 1337 ? "ESTÁVEL" : "PERIGO"}
                </div>
              </div>

              {/* Malware process monitor */}
              <div className="text-[9px] bg-black/80 rounded border p-2 text-left text-red-400 border-red-500/30">
                <p className="font-bold">Malware Alocado:</p>
                <p className="font-mono text-[9px] text-[#ff9d00]">
                  {variables?.killedPID === 1337 ? "[X] spyware.sh (Interrompido)" : "● Pro_ID 1337: /usr/bin/spyware.sh"}
                </p>
              </div>
            </div>
            <div className="text-[8px] text-gray-500">BASH COMANDO REQUERIDO: kill 1337</div>
          </div>
        );

      case "ssh_routes":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 h-full">
            <div className="text-[10px] text-blue-400 bg-blue-400/10 border border-blue-400/30 w-full rounded py-1 tracking-wider uppercase">
              Roteamento e Links SCP
            </div>
            
            <div className="flex-1 w-full py-4 flex flex-col justify-center gap-2">
              <div className="flex justify-between items-center text-[10px]">
                <span>Status da Chave Local:</span>
                <span className={virtualFS["/"]?.["chaves.key"] ? "text-[#00ff41]" : "text-[#ff9d00]"}>
                  {virtualFS["/"]?.["chaves.key"] ? "SALVO (OK)" : "PENDENTE (CURL)"}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span>Transferência Host Externo:</span>
                <span className={variables?.scpTransferred ? "text-[#00ff41]" : "text-[#ff9d00]"}>
                  {variables?.scpTransferred ? "TRANSFERIDO" : "NÃO INICIADO"}
                </span>
              </div>

              {/* Visual mini-tunnel */}
              <div className="h-10 bg-black/80 rounded border border-blue-500/10 flex items-center justify-between px-3 text-xs">
                <span className="text-[#00ff41]">bunker-local</span>
                <span className="text-gray-500 tracking-widest animate-pulse">======&gt;</span>
                <span className="text-red-400">10.0.0.4</span>
              </div>
            </div>
            
            <div className="text-[8px] text-gray-500">CURL + SCP - REPORTE DE INFRAESTRUTURA</div>
          </div>
        );

      case "shell_loop":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 h-full">
            <div className="text-[10px] text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 w-full rounded py-1 tracking-wider uppercase">
              PARSER DE INCIDENTES TEXTUAIS
            </div>
            
            <div className="flex-1 w-full py-4 flex flex-col justify-center gap-2">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-black/60 border border-gray-800 p-1 rounded text-left">
                  <p className="opacity-50 font-bold">log1.txt:</p>
                  <p className="text-red-400 text-[9px]">MALWARE ALERT</p>
                </div>
                <div className="bg-black/60 border border-gray-800 p-1 rounded text-left">
                  <p className="opacity-50 font-bold">log2.txt:</p>
                  <p className="text-red-400 text-[9px]">MALWARE INFECTION</p>
                </div>
              </div>

              <div className="bg-black border border-dashed border-[#00ff41]/20 p-2 rounded text-left text-[10px]">
                <p className="font-bold text-white">temp_logs/incidentes.log:</p>
                <p className="font-mono text-gray-500 text-[9px] truncate">
                  {virtualFS["/temp_logs"]?.["incidentes.log"]?.content || "(vazio - requer filtragem)"}
                </p>
              </div>
            </div>
            
            <div className="text-[8px] text-[#00d4ff]">GREP FILTRO REDIRECIONADO (&gt;)</div>
          </div>
        );

      case "cluster_status":
        return (
          <div className="flex-1 flex flex-col justify-between items-center text-center p-2 h-full">
            <div className="text-[10px] text-purple-400 bg-purple-400/10 border border-purple-400/30 w-full rounded py-1 tracking-wider uppercase">
              CONTEINERIZAÇÃO DOCKER NÓ
            </div>
            
            <div className="flex-1 w-full py-4 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2 bg-black/60 p-2 border border-purple-500/20 rounded">
                <Database className="w-6 h-6 text-purple-400" />
                <div className="text-left flex-1">
                  <span className="text-[9px] text-gray-400 block">Dockerfile Configurado:</span>
                  <span className="text-xs font-bold font-mono text-white">
                    {virtualFS["/"]?.["Dockerfile"] ? "SALVO (alpine)" : "Vazio / Inexistente"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/60 p-2 border border-purple-500/20 rounded">
                <Activity className="w-6 h-6 text-purple-400" />
                <div className="text-left flex-1">
                  <span className="text-[9px] text-gray-400 block">Image status:</span>
                  <span className="text-xs font-bold text-white">
                    {variables?.dockerBuilt ? "compilado (app:v1)" : "não construído"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-[8px] text-gray-500">BASH REQUER: docker build -t app:v1 .</div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <span className="text-[10px] text-gray-500">TELEMETRIA OFFLINE</span>
          </div>
        );
    }
  };

  // Login panel render before actual screen loads
  if (!saveState.registered) {
    return (
      <div className="w-full min-h-screen bg-[#060608] text-[#00ff41] font-mono flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
        {/* Vintage scanline/crt effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5 z-50 animate-pulse" 
             style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 4px, 3px 100%" }}></div>
        
        <div className="w-full max-w-md border border-[#00ff41] bg-black/85 p-6 rounded shadow-[0_0_30px_rgba(0,255,65,0.15)] relative">
          <div className="flex items-center justify-between border-b border-[#00ff41] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00ff41]" />
              <h1 className="text-sm font-bold uppercase tracking-widest text-[#00ff41]">{t("loginTitle")}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[9px] text-[#ff9d00] font-bold">{t("loginBooting")}</div>
              <button 
                type="button"
                onClick={() => { 
                  const nextLang = lang === "pt" ? "en" : "pt"; 
                  setLang(nextLang); 
                  triggerBeep(440, 0.08, "sine"); 
                }}
                className="px-1.5 py-0.5 border border-[#00ff41]/40 rounded hover:border-[#00ff41] font-mono text-[9px] font-bold text-[#00ff41] hover:bg-[#00ff41]/10 flex items-center justify-center min-w-[32px] h-5 cursor-pointer"
                title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
              >
                {lang.toUpperCase()}
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed">
            <p className="text-[#00d4ff] font-bold">{t("loginSeq")}</p>
            <p>{t("loginAuraDegraded")}</p>
            <p className="text-gray-400">{t("loginRegister")}</p>

            <form onSubmit={handleRegisterName} className="mt-6 space-y-4 border-t border-[#00ff41]/20 pt-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                  {t("loginLabel")}
                </label>
                <input
                  type="text"
                  name="playerName"
                  required
                  placeholder={lang === "pt" ? "Ex: rodrigo" : "e.g., rodrigo"}
                  className="w-full bg-black border border-[#00ff41]/50 px-3 py-2 text-sm text-[#00ff41] focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] uppercase placeholder-emerald-950 font-bold mb-4"
                />
              </div>

              <div className="border-t border-[#00ff41]/10 pt-4">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-3">
                  {lang === "pt" ? "Configuração da IA AURA-7:" : "AURA-7 AI Configuration:"}
                </label>
                
                <input type="hidden" name="llmProvider" value={configProvider} />
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => { setConfigProvider("simulated"); triggerBeep(440, 0.08, "sine"); }}
                    className={`p-2 border flex flex-col items-center justify-between gap-1 rounded text-center transition-all cursor-pointer h-20 ${
                      configProvider === "simulated"
                        ? "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)] font-bold"
                        : "border-[#00ff41]/20 bg-black text-gray-500 hover:border-[#00ff41]/50 hover:text-emerald-400"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider leading-none">{lang === "pt" ? "Simulada" : "Simulated"}</span>
                    <span className="text-[7px] opacity-70 block leading-tight">Offline</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setConfigProvider("local"); triggerBeep(440, 0.08, "sine"); }}
                    className={`p-2 border flex flex-col items-center justify-between gap-1 rounded text-center transition-all cursor-pointer h-20 ${
                      configProvider === "local"
                        ? "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)] font-bold"
                        : "border-[#00ff41]/20 bg-black text-gray-500 hover:border-[#00ff41]/50 hover:text-emerald-400"
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider leading-none">Ollama</span>
                    <span className="text-[7px] opacity-70 block leading-tight">Local</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setConfigProvider("gemini"); triggerBeep(440, 0.08, "sine"); }}
                    className={`p-2 border flex flex-col items-center justify-between gap-1 rounded text-center transition-all cursor-pointer h-20 ${
                      configProvider === "gemini"
                        ? "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)] font-bold"
                        : "border-[#00ff41]/20 bg-black text-gray-500 hover:border-[#00ff41]/50 hover:text-emerald-400"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider leading-none">Gemini</span>
                    <span className="text-[7px] opacity-70 block leading-tight">{lang === "pt" ? "Nuvem API" : "Cloud API"}</span>
                  </button>
                </div>

                {configProvider === "simulated" && (
                  <div className="p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded mb-3 text-[9px] text-gray-400 leading-normal text-left">
                    <span className="text-[#00ff41] font-bold">{t("settingsMode")}</span> {t("settingsOfflineDesc")}
                  </div>
                )}

                {configProvider === "local" && (
                  <div className="space-y-2.5 p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded mb-3 animate-fadeIn text-left">
                    <div>
                      <label className="block text-[8px] uppercase font-bold text-gray-500 mb-1">{lang === "pt" ? "URL Base do Ollama:" : "Ollama Base URL:"}</label>
                      <input
                        type="text"
                        name="llmBaseUrl"
                        value={configBaseUrl}
                        onChange={(e) => setConfigBaseUrl(e.target.value)}
                        className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase font-bold text-gray-500 mb-1">{lang === "pt" ? "Modelo de Linguagem:" : "Language Model:"}</label>
                      <input
                        type="text"
                        name="llmModel"
                        value={configModel}
                        onChange={(e) => setConfigModel(e.target.value)}
                        className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleCheckOllama(configBaseUrl)}
                      disabled={checkingOllama}
                      className="w-full bg-black border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 py-1 rounded text-[8px] font-bold uppercase tracking-wider cursor-pointer mt-1"
                    >
                      {checkingOllama ? (lang === "pt" ? "Verificando..." : "Checking...") : (lang === "pt" ? "Autochecar Conexão e Hardware" : "Autocheck Connection & Hardware")}
                    </button>

                    {autocheckResult && autocheckResult.checked && (
                      <div className="text-[9px] space-y-1 bg-black/60 p-2 border border-[#00ff41]/10 rounded leading-normal text-gray-300">
                        <p>Status: <span className={autocheckResult.running ? "text-[#00ff41]" : "text-red-400"}>{autocheckResult.running ? "ONLINE" : "OFFLINE"}</span></p>
                        <p>RAM: {autocheckResult.ramGB} GB | {lang === "pt" ? "Recomendado" : "Recommended"}: {autocheckResult.recommendation}</p>
                        {autocheckResult.running && (
                          <p className="text-[8px] truncate">{lang === "pt" ? "Instalados:" : "Installed:"} {autocheckResult.models.join(", ") || (lang === "pt" ? "nenhum" : "none")}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {configProvider === "gemini" && (
                  <div className="p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded mb-3 animate-fadeIn text-left">
                    <label className="block text-[8px] uppercase font-bold text-gray-500 mb-1">{t("settingsKeyLabel")}</label>
                    <input
                      type="password"
                      name="llmApiKey"
                      value={configApiKey}
                      onChange={(e) => setConfigApiKey(e.target.value)}
                      placeholder={lang === "pt" ? "Cole sua GEMINI_API_KEY" : "Paste your GEMINI_API_KEY"}
                      className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#00ff41] text-black py-2.5 font-bold hover:bg-emerald-400 cursor-pointer text-xs uppercase tracking-widest transition-all duration-150"
                >
                  {t("loginBtn")}
                </button>
              </div>
            </form>
          </div>

          <div className="absolute bottom-2 right-4 text-[8px] opacity-40">CWD: PROTOCOL_DOCKER_NATIVE</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#07070a] text-[#00ff41] font-mono flex flex-col items-center justify-center p-4 overflow-x-hidden relative select-none">
      
      {/* Dynamic Vintage Scanline / CRT overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-50 pointer-events-none" 
           style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.05))", backgroundSize: "100% 4.5px, 3.5px 100%" }}></div>

      {/* Main Interactive Interface Block with Geometric Balance */}
      <div className="w-full max-w-6xl bg-[#0a0a0c] border border-[#00ff41] p-4 flex flex-col relative rounded shadow-[0_0_40px_rgba(0,255,65,0.12)]">
        
        {/* Top Header Bar */}
        <div id="game-header-row" className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#00ff41] pb-3 mb-4 gap-4 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-[#00ff41] text-[#0a0a0c] font-black text-xs uppercase tracking-widest animate-pulse flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Root Access: DevOps Chronicles
            </div>
            <div className="text-[10px] opacity-80 uppercase tracking-tight flex items-center gap-2">
              <span>Status:</span>
              <span>{lang === "pt" ? "ONLINE" : "ONLINE"}</span>
              <span className="text-gray-600">|</span>
              <span>{lang === "pt" ? "Integridade AURA:" : "AURA Integrity:"}</span>
              <span className="text-[#ff9d00] font-bold">{saveState.auraIntegrity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px]">
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">{t("operatorBunker")}</p>
              <p className="font-bold text-white uppercase">{saveState.playerName}@bunker-shell</p>
            </div>
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">{t("credits")}</p>
              <p className="font-bold text-[#ff9d00]">{lang === "pt" ? "R$" : "$"} {saveState.credits}</p>
            </div>
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">{t("systemClock")}</p>
              <p className="font-mono text-[11px] text-[#00d4ff]">{systime}</p>
            </div>
            
            {/* Language toggle button */}
            <button 
              onClick={() => { 
                const nextLang = lang === "pt" ? "en" : "pt"; 
                setLang(nextLang); 
                triggerBeep(440, 0.08, "sine"); 
              }}
              className="px-1.5 py-0.5 border border-[#00ff41]/40 rounded hover:border-[#00ff41] font-mono text-[9px] font-bold text-[#00ff41] hover:bg-[#00ff41]/10 flex items-center justify-center min-w-[32px] h-6 cursor-pointer"
              title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
              id="lang-toggle-btn"
            >
              {lang.toUpperCase()}
            </button>

            {/* Sound synthesizer toggle switch */}
            <button 
              onClick={() => { setSoundOn(!soundOn); triggerBeep(440, 0.08, "sine"); }}
              className="p-1 border border-[#00ff41]/40 rounded hover:border-[#00ff41]"
              title="Toggle retro feedback audio"
              id="sound-toggle-btn"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#00ff41]" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
            </button>

            {/* settings toggle button */}
            <button 
              onClick={() => { setSettingsOpen(true); triggerBeep(440, 0.08, "sine"); }}
              className="p-1 border border-[#00ff41]/40 rounded hover:border-[#00ff41]"
              title="Configurações neurais da AURA-7"
              id="settings-toggle-btn"
            >
              <Settings className="w-4 h-4 text-[#00ff41]" />
            </button>
          </div>
        </div>

        {/* Core Layout Grid System */}
        <div id="game-interface-grid" className="grid grid-cols-12 gap-4 min-h-[580px] h-auto">
          
          {/* Left Column: AURA-7 Assistant & Job Manager */}
          <div id="left-sidebar-col" className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            
            {/* AURA-7 Cybernetic Box */}
            <div className="border border-[#00ff41]/40 bg-[#00ff41]/5 p-4 rounded flex flex-col h-72">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${saveState.auraIntegrity < 50 ? "bg-[#ff9d00] animate-ping" : "bg-[#00ff41]"}`}></div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#00ff41]">{t("auraTitle")}</h2>
                </div>
                <span className="text-[9px] border border-[#00ff41]/30 px-1 bg-black font-semibold text-gray-300">
                  {lang === "pt" ? "Integridade" : "Integrity"} {saveState.auraIntegrity}%
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 bg-black/60 border border-[#00ff41]/20 p-2 text-[11px] leading-relaxed overflow-y-auto mb-2 custom-scrollbar">
                <div className="space-y-3">
                  {auraChat.map((msg, idx) => (
                    <div key={idx} className={`p-1.5 rounded border border-[#00ff41]/5 relative ${msg.role === "assistant" ? "bg-emerald-950/20 text-[#00ff41]" : "bg-black text-[#00d4ff]"}`}>
                      <div className="flex items-center justify-between mb-1 border-b border-[#00ff41]/10 pb-0.5">
                        <p className="font-bold text-[8px] opacity-65 uppercase">
                          {msg.role === "assistant" ? "🤖 AURA-7" : `👤 ${saveState.playerName}`} — {msg.timestamp}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.content, idx)}
                          className="text-[8px] text-gray-500 hover:text-[#00ff41] bg-black/40 px-1.5 py-0.5 rounded border border-[#00ff41]/10 hover:border-[#00ff41]/40 cursor-pointer uppercase transition-all"
                          title={lang === "pt" ? "Copiar texto da mensagem" : "Copy message text"}
                        >
                          {copiedIdx === idx ? (lang === "pt" ? "Copiado!" : "Copied!") : (lang === "pt" ? "Copiar" : "Copy")}
                        </button>
                      </div>
                      <p className="font-mono whitespace-pre-wrap select-text selection:bg-[#00ff41]/30">{msg.content}</p>
                    </div>
                  ))}
                  {auraLoading && (
                    <div className="p-1 text-[10px] text-yellow-500 animate-pulse">
                      &gt; {t("processing")}
                    </div>
                  )}
                  <div ref={auraChatBottomRef} />
                </div>
              </div>

              {/* Chat Send */}
              <form onSubmit={handleSendAuraMessage} className="flex gap-1.5">
                <input
                  type="text"
                  value={auraMessage}
                  onChange={(e) => setAuraMessage(e.target.value)}
                  placeholder={lang === "pt" ? "Peça dica de comando Linux..." : "Ask for a Linux command hint..."}
                  disabled={auraLoading}
                  className="flex-1 bg-black border border-[#00ff41]/30 placeholder-emerald-950 px-2 py-1 text-xs text-[#00ff41] focus:outline-none focus:border-[#00ff41] rounded"
                  id="aura-chat-input-box"
                />
                <button
                  type="submit"
                  disabled={auraLoading}
                  className="bg-[#00ff41] text-black px-2.5 py-1 text-xs font-bold rounded hover:bg-emerald-400 cursor-pointer disabled:opacity-40"
                  id="aura-send-msg-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Stage Selector / Job Board */}
            <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-4 rounded flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#ff9d00] flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {t("jobBoard")}
                </h2>
                <div className="text-[9px] text-[#00ff41]">
                  {lang === "pt" ? "Nível" : "Level"} {saveState.currentLevelId}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-56 custom-scrollbar pr-1">
                {localizedChallenges.map((lvl) => {
                  const isActive = lvl.id === saveState.currentLevelId;
                  const isCompleted = saveState.completedLevels.includes(lvl.id);
                  return (
                    <div 
                      key={lvl.id}
                      onClick={() => handleSkipLevel(lvl.id)}
                      className={`p-2 border rounded cursor-pointer transition-all duration-150 ${
                        isActive 
                        ? "border-[#00ff41] bg-[#00ff41]/10 shadow-[0_0_10px_rgba(0,255,65,0.08)]" 
                        : "border-[#00ff41]/20 bg-black/40 hover:border-[#00ff41]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-white block uppercase max-w-[180px] truncate">
                          {lvl.id}. {lvl.name}
                        </span>
                        <span className={`text-[8px] px-1 rounded uppercase ${
                          isCompleted ? "bg-[#00ff41]/20 text-[#00ff41]" : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                          {isCompleted ? (lang === "pt" ? "Concluído" : "Completed") : (lang === "pt" ? "Disponível" : "Available")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[9px] opacity-75">
                        <span className="text-gray-400">{lang === "pt" ? lvl.difficulty : (lvl.difficulty === "easy" ? "easy" : lvl.difficulty === "medium" ? "medium" : lvl.difficulty === "hard" ? "hard" : "legendary")} | +{lang === "pt" ? "R$" : "$"} {lvl.salary}</span>
                        <span className="text-[#00d4ff] font-bold text-[8px] uppercase">{lang === "pt" ? "VER DETALHES" : "VIEW DETAILS"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Action items */}
              <div className="border-t border-[#00ff41]/20 pt-2.5 mt-3 flex justify-between gap-2">
                <button
                  onClick={handleResetGame}
                  className="bg-black border border-red-500/40 text-red-400 hover:bg-red-950/20 px-2 py-1 text-[9px] uppercase font-bold tracking-wider rounded cursor-pointer"
                  id="game-reset-progress-btn"
                >
                  {lang === "pt" ? "Reiniciar Tudo" : "Reset All"}
                </button>
                <div className="text-[9px] text-gray-400 flex items-center">
                  {lang === "pt" ? "Câmbio: R$ 1.0 = 1 CRD" : "Rate: $1.0 = 1 CRD"}
                </div>
              </div>
            </div>

          </div>

          {showAnimation && (
        <AnimationPlayer
          type={showAnimation.type}
          asset={showAnimation.asset}
          onEnd={() => setShowAnimation(null)}
        />
      )}
      <TerminalView
            lang={lang}
            terminalLines={terminalLines}
            terminalBottomRef={terminalBottomRef}
            terminalInput={terminalInput}
            setTerminalInput={setTerminalInput}
            handleKeyDown={handleKeyDown}
            terminalFocus={terminalFocus}
            setTerminalFocus={setTerminalFocus}
            inputRef={inputRef}
            saveState={saveState}
            currentPath={currentPath}
            editingFile={editingFile}
            nanoContent={nanoContent}
            setNanoContent={setNanoContent}
            setEditingFile={setEditingFile}
            saveNanoFile={saveNanoFile}
            triggerBeep={triggerBeep}
          />

          {/* Right Column: Filesystem Explorer + Dynamic Diagnostics Anim */}
          <div id="right-sidebar" className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            
            {/* Current Objective Details */}
            <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-4 rounded flex flex-col">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#ff9d00] mb-2 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                {lang === "pt" ? "Dossiê:" : "Dossier:"} {currentChallenge.name}
              </h2>
              <p className="text-[11px] leading-relaxed text-gray-300">
                {currentChallenge.briefing}
              </p>
              
              <div className="border-t border-[#00ff41]/20 mt-3 pt-3">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">{lang === "pt" ? "Dica de Suporte:" : "Support Hint:"}</span>
                <p className="text-[10px] italic text-[#00d4ff] bg-[#00d4ff]/5 p-2 rounded border border-[#00d4ff]/20">
                  {currentChallenge.hint}
                </p>
              </div>

              {/* Execute / Verify Level state manually */}
              <button
                onClick={handleVerifyChallenge}
                className="mt-4 w-full bg-[#00ff41] hover:bg-emerald-400 text-black py-2 rounded text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
                id="verify-status-btn"
              >
                <CheckCircle className="w-4 h-4" />
                {t("jobCheckBtn")}
              </button>

              {/* Feedback messages block */}
              {feedbackMsg.text && (
                <div className={`mt-2.5 p-2 border text-[10.5px] rounded ${
                  feedbackMsg.type === "success" 
                  ? "border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41]" 
                  : "border-red-500/50 bg-red-950/20 text-red-400"
                }`}>
                  <span className="font-bold uppercase block text-[10px] mb-0.5">
                    {feedbackMsg.type === "success" ? (lang === "pt" ? "✓ SISTEMA CONCORDOU" : "✓ SYSTEM AGREED") : (lang === "pt" ? "✗ FALHA EM REDUÇÃO" : "✗ VERIFICATION FAILED")}
                  </span>
                  {feedbackMsg.text}
                </div>
              )}
            </div>

            {/* Live Interactive File Tree */}
            <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-3 rounded flex flex-col flex-1">
              <h2 className="text-[10px] font-bold uppercase mb-2 text-[#00ff41] tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-[#00ff41]" />
                {lang === "pt" ? "Pasta:" : "Folder:"} {currentPath} ({lang === "pt" ? "Navegar / Editar" : "Browse / Edit"})
              </h2>
              
              <div className="flex-1 overflow-y-auto space-y-1.5 max-h-56 custom-scrollbar pr-1">
                {virtualFS[currentPath] && Object.keys(virtualFS[currentPath]).map((filename) => {
                  const item = virtualFS[currentPath][filename];
                  const perm = item.permissions || 644;
                  return (
                    <div 
                      key={filename}
                      onClick={() => openFileFromExplorer(filename, item)}
                      className="group flex items-center justify-between p-1.5 bg-black/60 border border-[#00ff41]/15 rounded hover:border-[#00ff41]/50 cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2 text-white truncate max-w-[140px]">
                        {item.type === "dir" ? (
                          <Folder className="w-3.5 h-3.5 text-[#00d4ff]" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-[#00ff41]" />
                        )}
                        <span className="truncate group-hover:text-[#00ff41] group-hover:underline">
                          {filename}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 font-mono text-[9px]">
                        <span className="text-gray-500">[{perm}]</span>
                        {perm === 600 ? (
                          <Lock className="w-3 h-3 text-[#00ff41]" title="Isolado Proprietário" />
                        ) : (
                          <Unlock className="w-3 h-3 text-[#ff9d00]" title="Universal ou compartilhado" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-[8px] opacity-40 mt-1.5 text-center uppercase font-bold">
                Clique nos arquivos para editar ou abrir no nanodo!
              </div>
            </div>

            {/* Live Telemetry Schematic Box */}
            <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-3 rounded flex flex-col h-56">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[10px] font-bold uppercase tracking-wider opacity-80">Telemetry Live Grid</h2>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[8px] uppercase font-bold text-red-500 block">REC</span>
                </div>
              </div>

              <div className="flex-1 bg-black border border-[#00ff41]/20 relative overflow-hidden flex flex-col justify-center items-center rounded">
                
                {/* Background CCTV matrix boxes */}
                <div className="absolute inset-0 flex flex-wrap opacity-10 pointer-events-none">
                  <div className="w-1/2 h-1/2 border border-[#00ff41]/10"></div>
                  <div className="w-1/2 h-1/2 border border-[#00ff41]/10"></div>
                  <div className="w-1/2 h-1/2 border border-[#00ff41]/10"></div>
                  <div className="w-1/2 h-1/2 border border-[#00ff41]/10"></div>
                </div>

                {renderLiveFeedTelemetry()}

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Toolbar */}
        <div id="game-bottom-toolbar" className="mt-4 pt-3 border-t border-[#00ff41]/30 flex flex-col sm:flex-row items-center justify-between text-[10px] gap-2 md:gap-0 px-2">
          <div className="flex flex-wrap gap-4 uppercase tracking-wider text-gray-400">
            <span className="text-white">Batalhas de Shell por Atos</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-500 uppercase">Ato I: O Despertar (Níveis 1-2)</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-500 uppercase">Ato II: O Profissional (Níveis 3-4)</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400 uppercase">Ato III: O Especialista (Níveis 5-6)</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500 font-bold">
            <span>REGIONAL NODE: SAN_FRANCISCO_DOCKER_US</span>
            <div className="flex gap-1 items-center font-mono">
              <span className="w-2.5 h-2.5 bg-[#00ff41] rounded-full animate-pulse" />
              <span className="text-white text-[9px]">CLUSTERS SYNCED</span>
            </div>
          </div>
        </div>

      </div>

      {settingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 font-mono select-none">
          <div className="w-full max-w-md bg-[#060608] border border-[#00ff41] p-6 rounded shadow-[0_0_40px_rgba(0,255,65,0.25)] relative animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#00ff41] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00ff41] animate-spin" style={{ animationDuration: '4s' }} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#00ff41]">{t("settingsTitle")}</h3>
              </div>
              <button 
                onClick={() => setSettingsOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer text-xs uppercase"
              >
                [X] {lang === "pt" ? "fechar" : "close"}
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 text-left">{lang === "pt" ? "Provedor de Inteligência:" : "Intelligence Provider:"}</label>
                <select
                  value={configProvider}
                  onChange={(e) => setConfigProvider(e.target.value as any)}
                  className="w-full bg-black border border-[#00ff41]/50 px-2 py-1.5 text-xs text-[#00ff41] focus:outline-none"
                >
                  <option value="simulated">{lang === "pt" ? "Simulada / Dicas Locais (Offline)" : "Simulated / Local Hints (Offline)"}</option>
                  <option value="local">{lang === "pt" ? "Ollama Local (LLM Própria)" : "Local Ollama (Own LLM)"}</option>
                  <option value="gemini">{lang === "pt" ? "Google Gemini Cloud (API)" : "Google Gemini Cloud (API)"}</option>
                </select>
              </div>

              {configProvider === "local" && (
                <div className="space-y-3 p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded text-left">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">{lang === "pt" ? "URL Base do Ollama:" : "Ollama Base URL:"}</label>
                    <input
                      type="text"
                      value={configBaseUrl}
                      onChange={(e) => setConfigBaseUrl(e.target.value)}
                      placeholder="http://localhost:11434/v1"
                      className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">{lang === "pt" ? "Modelo de Linguagem:" : "Language Model:"}</label>
                    <input
                      type="text"
                      value={configModel}
                      onChange={(e) => setConfigModel(e.target.value)}
                      placeholder="gemma2"
                      className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-2 border-t border-[#00ff41]/10">
                    <button
                      type="button"
                      onClick={() => handleCheckOllama(configBaseUrl)}
                      disabled={checkingOllama}
                      className="bg-black border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      {checkingOllama ? (lang === "pt" ? "Autochecando..." : "Checking...") : (lang === "pt" ? "Autochecar Conexão e Hardware" : "Autocheck Connection & Hardware")}
                    </button>

                    {autocheckResult && autocheckResult.checked && (
                      <div className="text-[10px] space-y-1 bg-black/60 p-2 border border-[#00ff41]/10 rounded leading-relaxed text-gray-300">
                        <p>
                          Status Ollama:{" "}
                          <span className={autocheckResult.running ? "text-[#00ff41]" : "text-red-400"}>
                            {autocheckResult.running ? (lang === "pt" ? "ATIVO & RESPONDENDO" : "ACTIVE & RESPONDING") : (lang === "pt" ? "OFFLINE / INACESSÍVEL" : "OFFLINE / INACCESSIBLE")}
                          </span>
                        </p>
                        <p>{lang === "pt" ? "Memória RAM do Host:" : "Host RAM Memory:"} <span className="text-white">{autocheckResult.ramGB} GB</span></p>
                        <p>{lang === "pt" ? "Modelo Indicado:" : "Recommended Model:"} <span className="text-[#00d4ff]">{autocheckResult.recommendation}</span></p>
                        {autocheckResult.running && (
                          <p className="text-[9px] truncate">
                            {lang === "pt" ? "Modelos:" : "Models:"} <span className="text-white font-mono">{autocheckResult.models.join(", ") || (lang === "pt" ? "(nenhum)" : "(none)")}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {configProvider === "gemini" && (
                <div className="space-y-3 p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded animate-fadeIn text-left">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">{t("settingsKeyLabel")}</label>
                    <input
                      type="password"
                      value={configApiKey}
                      onChange={(e) => setConfigApiKey(e.target.value)}
                      placeholder={lang === "pt" ? "Cole sua chave GEMINI_API_KEY aqui" : "Paste your GEMINI_API_KEY here"}
                      className="w-full bg-black border border-[#00ff41]/50 px-2 py-1 text-xs text-[#00ff41] focus:outline-none"
                    />
                    <span className="text-[8px] text-gray-500 mt-1 block leading-normal">
                      {lang === "pt" ? "A chave fica salva apenas localmente no seu localStorage de forma estritamente privada." : "The key is saved only locally in your localStorage, strictly private."}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-[#00ff41]/20">
                <button
                  onClick={() => {
                    if (confirm(lang === "pt" ? "Isso apagará a identificação atual do operador e retornará à tela de registro inicial. Confirmar?" : "This will delete the current operator identification and return to the initial registration screen. Confirm?")) {
                      setSaveState(prev => ({
                        ...prev,
                        registered: false,
                        playerName: ""
                      }));
                      setSettingsOpen(false);
                      triggerBeep(200, 0.4, "sawtooth");
                    }
                  }}
                  className="bg-red-950/20 border border-red-800 hover:bg-red-900/30 text-red-400 px-2 py-1.5 rounded text-[10px] font-bold uppercase cursor-pointer mr-auto transition-all"
                  title={lang === "pt" ? "Alterar operador ou reconfigurar conexão de IA" : "Change operator or reconfigure AI connection"}
                >
                  [{lang === "pt" ? "Resetar Operador" : "Reset Operator"}]
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="bg-black border border-gray-600 hover:bg-gray-800 text-gray-400 px-3 py-1.5 rounded text-xs font-bold uppercase cursor-pointer"
                  >
                    {lang === "pt" ? "Cancelar" : "Cancel"}
                  </button>
                  <button
                    onClick={() => {
                      setSaveState(prev => ({
                        ...prev,
                        llmConfig: {
                          provider: configProvider,
                          baseUrl: configBaseUrl,
                          model: configModel,
                          apiKey: configApiKey
                        }
                      }));
                      setSettingsOpen(false);
                      triggerBeep(600, 0.2, "sine");
                    }}
                    className="bg-[#00ff41] hover:bg-emerald-400 text-black px-4 py-1.5 rounded text-xs font-black uppercase cursor-pointer"
                  >
                    {t("settingsSave")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff41;
          border-radius: 2px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

// Battery Ring Mini SVG Gauge Helper
interface BatteryProps {
  value: number;
  color: string;
}
function BatteryRing({ value, color }: BatteryProps) {
  const radius = 16;
  const stroke = 3.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="rotate-270">
      <circle
        stroke="rgba(0,255,65,0.1)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}
