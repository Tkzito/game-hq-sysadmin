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

import { SaveState, VirtualFS, TerminalLine, ChatMessage, FSItem } from "./types";

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
        baseUrl: "http://host.docker.internal:11434/v1",
        model: "gemma2",
        apiKey: ""
      }
    };
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings modal states
  const [configProvider, setConfigProvider] = useState<"simulated" | "gemini" | "local">("simulated");
  const [configBaseUrl, setConfigBaseUrl] = useState("http://host.docker.internal:11434/v1");
  const [configModel, setConfigModel] = useState("gemma2");
  const [configApiKey, setConfigApiKey] = useState("");

  // Sync settings states with saveState when it loads or opens
  useEffect(() => {
    if (saveState.llmConfig) {
      setConfigProvider(saveState.llmConfig.provider);
      setConfigBaseUrl(saveState.llmConfig.baseUrl || "http://host.docker.internal:11434/v1");
      setConfigModel(saveState.llmConfig.model || "gemma2");
      setConfigApiKey(saveState.llmConfig.apiKey || "");
    }
  }, [saveState.llmConfig, settingsOpen]);

  const currentChallenge = CHALLENGES.find(c => c.id === saveState.currentLevelId) || CHALLENGES[0];

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
      const baseUrl = baseUrlInput?.value || "http://host.docker.internal:11434/v1";
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
      triggerBeep(880, 0.25, "sine");
      triggerBeep(1200, 0.3, "sine");
      
      const newIntegrity = Math.min(100, saveState.auraIntegrity + 10);
      const isAlreadyCompleted = saveState.completedLevels.includes(currentChallenge.id);
      const updatedCredits = isAlreadyCompleted ? saveState.credits : saveState.credits + currentChallenge.salary;
      const nextLevelIndex = CHALLENGES.findIndex(c => c.id === currentChallenge.id) + 1;
      const nextLevelId = nextLevelIndex < CHALLENGES.length ? CHALLENGES[nextLevelIndex].id : currentChallenge.id;
      
      setFeedbackMsg({
         text: check.message || "Fase superada com sucesso!",
         type: "success"
      });

      // Update save state
      setSaveState(prev => ({
        ...prev,
        credits: updatedCredits,
        auraIntegrity: newIntegrity,
        completedLevels: isAlreadyCompleted ? prev.completedLevels : [...prev.completedLevels, currentChallenge.id],
        currentLevelId: nextLevelId
      }));

      // Append success lines
      setTerminalLines(prev => [
        ...prev,
        {
          id: `${Date.now()}-done`,
          text: `[SUCESSO] ${check.message || "Missão Concluída!"}`,
          type: "success",
          timestamp: new Date().toLocaleTimeString()
        },
        {
          id: `${Date.now()}-salary`,
          text: `Contrato de Freela finalizado! Ganho de +${currentChallenge.salary} créditos corporativos.`,
          type: "system",
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

    // Command Args Split
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    // Helpers to resolve paths
    const getTargetDirectory = (p: string) => {
      if (p === "/" || !p) return "/";
      if (p.startsWith("/")) return p;
      // build path
      let full = currentPath;
      if (!full.endsWith("/")) full += "/";
      return (full + p).replace(/\/\//g, "/");
    };

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
            id: `${Date.now()}-hlp3`,
            text: `  cat <arquivo>         - Lê e imprime o conteúdo de um arquivo em texto puro.`,
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

      case "ls":
        const isLong = args.includes("-la") || args.includes("-l") || args.includes("-a");
        const dir = virtualFS[currentPath] || {};
        const items = Object.keys(dir);

        if (items.length === 0) {
          setTerminalLines(prev => [
            ...prev,
            { id: `${Date.now()}-empty`, text: "(diretório vazio)", type: "output", timestamp }
          ]);
        } else {
          if (isLong) {
            // Print full details
            setTerminalLines(prev => {
              const newLns = [...prev];
              newLns.push({
                id: `${Date.now()}-ls-head`,
                text: `total ${items.length * 4}`,
                type: "system",
                timestamp
              });
              
              items.forEach(k => {
                const f = dir[k];
                const typeChar = f.type === "dir" ? "d" : "-";
                // simple posix permission representation
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
                
                newLns.push({
                  id: `${Date.now()}-ls-${k}`,
                  text: `${permStr}  1 ${owner}  staff  ${size} Jun 10 12:00  ${f.name}${f.type === "dir" ? "/" : ""}`,
                  type: f.type === "dir" ? "warning" : "output",
                  timestamp
                });
              });
              return newLns;
            });
          } else {
            // standard listing
            const textLine = items.map(k => {
              const f = dir[k];
              return f.type === "dir" ? `${k}/` : k;
            }).join("    ");
            setTerminalLines(prev => [
              ...prev,
              {
                id: `${Date.now()}-ls-simple`,
                text: textLine,
                type: "output",
                timestamp
              }
            ]);
          }
        }
        break;

      case "cat":
        if (args.length === 0) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cat-err`, text: "cat: arquivo não especificado.", type: "error", timestamp }]);
          break;
        }
        const fileTarget = args[0];
        const activeDir = virtualFS[currentPath] || {};
        const targetFileItem = activeDir[fileTarget];

        if (!targetFileItem) {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cat-no`, text: `cat: ${fileTarget}: Arquivo ou diretório não encontrado.`, type: "error", timestamp }]);
        } else if (targetFileItem.type === "dir") {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-cat-dir`, text: `cat: ${fileTarget}: É um diretório.`, type: "error", timestamp }]);
        } else {
          setTerminalLines(prev => [
            ...prev,
            {
              id: `${Date.now()}-cat-print`,
              text: targetFileItem.content || "(arquivo vazio)",
              type: "output",
              timestamp
            }
          ]);
        }
        break;

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
            next[currentPath][permFile] = {
              ...next[currentPath][permFile],
              permissions: permMode
            };
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

      case "echo":
        const echoText = args.join(" ").replace(/^["'"]|["'"]$/g, "");
        setTerminalLines(prev => [
          ...prev,
          {
            id: `${Date.now()}-echo-output`,
            text: echoText,
            type: "output",
            timestamp
          }
        ]);
        break;
      case "sh":
      case "./boot_assist.sh":
        const targetScript = cmd === "sh" ? args[0] : "boot_assist.sh";

        if (saveState.currentLevelId === 1 && (targetScript === "boot_assist.sh" || targetScript === "./boot_assist.sh")) {
          setVariables(prev => ({ ...prev, ranBootAssist: true }));
          
          const scriptFile = virtualFS["/"]?.["boot_assist.sh"];
          const fileContent = scriptFile?.content || "";
          
          const isClosed = fileContent.includes('echo "Iniciando núcleo central AURA-7..."') || 
                           (!/echo\s+"Iniciando [^"\n]*$/.test(fileContent) && fileContent.includes('"') && fileContent.match(/"/g)?.length === 8);

          if (isClosed) {
            setTerminalLines(prev => [
              ...prev,
              {
                id: `${Date.now()}-sh-run`,
                text: `Executando rotina shell boot_assist.sh...`,
                type: "system",
                timestamp
              },
              {
                id: `${Date.now()}-sh-output1`,
                text: `Iniciando núcleo central AURA-7...`,
                type: "output",
                timestamp
              },
              {
                id: `${Date.now()}-sh-output2`,
                text: `RESTAURAÇÃO COMPLETA: SISTEMA OPERANTE`,
                type: "success",
                timestamp
              },
              {
                id: `${Date.now()}-sh-output3`,
                text: `Sinal de link neural online.`,
                type: "output",
                timestamp
              }
            ]);
            triggerBeep(520, 0.25, "sine");
          } else {
            setTerminalLines(prev => [
              ...prev,
              {
                id: `${Date.now()}-sh-err1`,
                text: `boot_assist.sh: linha 4: erro de sintaxe: fim prematuro de string (unterminated string)`,
                type: "error",
                timestamp
              },
              {
                id: `${Date.now()}-sh-err2`,
                text: `[ALERTA DE SEGURANÇA BASH] Execução abortada pelo compilador de firmware.`,
                type: "error",
                timestamp
              }
            ]);
            triggerBeep(150, 0.4, "sawtooth");
          }
        } else {
          setTerminalLines(prev => [...prev, { id: `${Date.now()}-sh-miss`, text: `sh: script '${targetScript}' indisponível ou permissões de execução negadas.`, type: "error", timestamp }]);
        }
        break;

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
          operatorName: saveState.playerName || "Rodrigo",
          auraIntegrity: saveState.auraIntegrity,
          history: updatedChat.slice(-6).map(m => ({ role: m.role, content: m.content }))
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
              <h1 className="text-sm font-bold uppercase tracking-widest text-[#00ff41]">ROOT ACCESS: DevOps</h1>
            </div>
            <div className="text-[9px] text-[#ff9d00] font-bold">BOOTING SYSTEM...</div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed">
            <p className="text-[#00d4ff] font-bold">&gt; SYSTEM INITIALIZATION SEQUENCE</p>
            <p>AURA-7 Core Assistente está operando com apenas <span className="text-[#ff9d00]">35% de integridade neuronal</span>.</p>
            <p className="text-gray-400">Para restabelecer comunicações encriptadas locais, faça o registro do Operador de Bunker:</p>

            <form onSubmit={handleRegisterName} className="mt-6 space-y-4 border-t border-[#00ff41]/20 pt-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                  Nome do Operador / Usuário Unix:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="playerName"
                    required
                    placeholder="Ex: rodrigo"
                    className="flex-1 bg-black border border-[#00ff41]/50 px-3 py-2 text-sm text-[#00ff41] focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] uppercase placeholder-emerald-950 font-bold"
                  />
                  <button
                    type="submit"
                    className="bg-[#00ff41] text-black px-4 py-2 font-bold hover:bg-emerald-400 cursor-pointer text-xs uppercase transition-all duration-150"
                  >
                    Registrar
                  </button>
                </div>
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
              <span className="text-[#00ff41] font-bold">ONLINE</span>
              <span className="text-gray-600">|</span>
              <span>Integridade AURA:</span>
              <span className="text-[#ff9d00] font-bold">{saveState.auraIntegrity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px]">
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">Operador Bunker</p>
              <p className="font-bold text-white uppercase">{saveState.playerName}@bunker-shell</p>
            </div>
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">R$ Créditos</p>
              <p className="font-bold text-[#ff9d00]">R$ {saveState.credits}</p>
            </div>
            <div className="text-right">
              <p className="opacity-50 text-[9px] uppercase">SYSTEM CLOCK</p>
              <p className="font-mono text-[11px] text-[#00d4ff]">{systime}</p>
            </div>
            
            {/* Sound synthesizer toggle switch */}
            <button 
              onClick={() => { setSoundOn(!soundOn); triggerBeep(440, 0.08, "sine"); }}
              className="p-1 border border-[#00ff41]/40 rounded hover:border-[#00ff41]"
              title="Toggle retro feedback audio"
              id="sound-toggle-btn"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#00ff41]" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
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
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#00ff41]">AURA-7 Assistant</h2>
                </div>
                <span className="text-[9px] border border-[#00ff41]/30 px-1 bg-black font-semibold text-gray-300">
                  Integridade {saveState.auraIntegrity}%
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 bg-black/60 border border-[#00ff41]/20 p-2 text-[11px] leading-relaxed overflow-y-auto mb-2 custom-scrollbar">
                <div className="space-y-3">
                  {auraChat.map((msg, idx) => (
                    <div key={idx} className={`p-1.5 rounded ${msg.role === "assistant" ? "bg-emerald-950/20 text-[#00ff41]" : "bg-black text-[#00d4ff]"}`}>
                      <p className="font-bold text-[9px] opacity-60 uppercase mb-0.5">
                        {msg.role === "assistant" ? "🤖 AURA-7" : `👤 ${saveState.playerName}`} — {msg.timestamp}
                      </p>
                      <p className="font-mono whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                  {auraLoading && (
                    <div className="p-1 text-[10px] text-yellow-500 animate-pulse">
                      &gt; AURA-7 processando fluxo de rede tática...
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
                  placeholder="Peça dica de comando Linux..."
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
                  SysAdmin-Jobs (Freelas)
                </h2>
                <div className="text-[9px] text-[#00ff41]">
                  Nível {saveState.currentLevelId}/6
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-56 custom-scrollbar pr-1">
                {CHALLENGES.map((lvl) => {
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
                          {isCompleted ? "Concluído" : "Disponível"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[9px] opacity-75">
                        <span className="text-gray-400">{lvl.difficulty} | +R$ {lvl.salary}</span>
                        <span className="text-[#00d4ff] font-bold text-[8px] uppercase">VER DETALHES</span>
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
                  Reiniciar Tudo
                </button>
                <div className="text-[9px] text-gray-400 flex items-center">
                  Câmbio: R$ 1.0 = 1 CRD
                </div>
              </div>
            </div>

          </div>

          <TerminalView
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
                Dossiê: {currentChallenge.name}
              </h2>
              <p className="text-[11px] leading-relaxed text-gray-300">
                {currentChallenge.briefing}
              </p>
              
              <div className="border-t border-[#00ff41]/20 mt-3 pt-3">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Dica de Suporte:</span>
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
                Garantir Solução
              </button>

              {/* Feedback messages block */}
              {feedbackMsg.text && (
                <div className={`mt-2.5 p-2 border text-[10.5px] rounded ${
                  feedbackMsg.type === "success" 
                  ? "border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41]" 
                  : "border-red-500/50 bg-red-950/20 text-red-400"
                }`}>
                  <span className="font-bold uppercase block text-[10px] mb-0.5">
                    {feedbackMsg.type === "success" ? "✓ SISTEMA CONCORDOU" : "✗ FALHA EM REDUÇÃO"}
                  </span>
                  {feedbackMsg.text}
                </div>
              )}
            </div>

            {/* Live Interactive File Tree */}
            <div className="border border-[#00ff41]/30 bg-[#00ff41]/5 p-3 rounded flex flex-col flex-1">
              <h2 className="text-[10px] font-bold uppercase mb-2 text-[#00ff41] tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-[#00ff41]" />
                Pasta: {currentPath} (Navegar / Editar)
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
