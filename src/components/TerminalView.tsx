import React from "react";
import { SaveState, TerminalLine } from "../types";
import NanoEditor from "./NanoEditor";

type Props = {
  lang: "pt" | "en";
  terminalLines: TerminalLine[];
  terminalBottomRef: React.RefObject<HTMLDivElement>;
  terminalInput: string;
  setTerminalInput: (s: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  terminalFocus: boolean;
  setTerminalFocus: (b: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  saveState: SaveState;
  currentPath: string;
  editingFile: { path: string; name: string } | null;
  nanoContent: string;
  setNanoContent: (s: string) => void;
  setEditingFile: (v: { path: string; name: string } | null) => void;
  saveNanoFile: () => void;
  triggerBeep: (f: number, d: number, t: "sine" | "square" | "sawtooth", vol?: number) => void;
};

export default function TerminalView({
  lang,
  terminalLines,
  terminalBottomRef,
  terminalInput,
  setTerminalInput,
  handleKeyDown,
  terminalFocus,
  setTerminalFocus,
  inputRef,
  saveState,
  currentPath,
  editingFile,
  nanoContent,
  setNanoContent,
  setEditingFile,
  saveNanoFile,
  triggerBeep
}: Props) {
  // Copy terminal history to clipboard (joins visible lines)
  const copyTerminal = async () => {
    try {
      const text = terminalLines.map(ln => ln.text).join('\n');
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        // optional feedback via beep
        triggerBeep?.(880, 0.06, 'sine');
      } else {
        // fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        triggerBeep?.(880, 0.06, 'sine');
      }
    } catch (e) {
      console.error('Copy failed', e);
      triggerBeep?.(220, 0.12, 'sawtooth');
    }
  };

  return (
    <div id="terminal-main-col" className="col-span-12 lg:col-span-5 flex flex-col border border-[#00ff41] bg-black/70 rounded relative overflow-hidden min-h-[400px]">
      <div className="bg-[#00ff41]/10 px-3 py-1.5 flex items-center justify-between border-b border-[#00ff41]/30">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
          <span className="text-[10px] tracking-widest font-bold text-[#00ff41] uppercase">tty1 - bash (Bunker Shell Sandbox)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[9px] text-[#00d4ff] uppercase">{lang === "pt" ? "PASTA" : "DIR"}: {currentPath}</div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
        <button
          onClick={copyTerminal}
          title={lang === "pt" ? "Copiar histórico do terminal" : "Copy terminal history"}
          className="ml-3 text-[11px] bg-[#00ff41]/10 hover:bg-[#00ff41]/20 px-2 py-1 rounded text-[#00ff41]"
          id="copy-terminal-history-button"
        >
          {lang === "pt" ? "Copiar" : "Copy"}
        </button>
      </div>
      </div>

      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-3 text-xs leading-relaxed overflow-y-auto font-mono text-[#00ff41] bg-black/35 shadow-inner custom-scrollbar relative max-h-[480px]"
        style={{ minHeight: "360px", userSelect: 'text' }}
        id="terminal-history-container"
      >
        {terminalLines.map((ln) => {
          let colorClass = "text-[#00ff41]";
          if (ln.type === "error") colorClass = "text-red-400 font-bold bg-red-950/10 p-1 rounded my-0.5 block";
          if (ln.type === "success") colorClass = "text-emerald-400 font-bold bg-emerald-950/20 p-1 rounded my-0.5 block";
          if (ln.type === "warning") colorClass = "text-yellow-400 font-semibold";
          if (ln.type === "system") colorClass = "text-[#00d4ff]";
          if (ln.type === "input") colorClass = "text-gray-400";

          return (
            <div key={ln.id} className="mb-1 whitespace-pre-wrap">
              {ln.type === "input" ? (
                <span>{ln.text}</span>
              ) : (
                <span className={colorClass}>{ln.text}</span>
              )}
            </div>
          );
        })}
        <div ref={terminalBottomRef} />
      </div>

      <div className="p-3 border-t border-[#00ff41]/30 bg-black/80 flex items-center">
        <span className="text-[11px] font-bold text-gray-400 select-none mr-1 whitespace-nowrap">
          {saveState.playerName || "rodrigo"}@bunker-shell:{currentPath}$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={terminalInput}
          onChange={(e) => setTerminalInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setTerminalFocus(true)}
          onBlur={() => setTerminalFocus(false)}
          className="flex-1 bg-transparent text-[#00ff41] text-xs font-mono border-none outline-none focus:ring-0 p-0 ml-1"
          placeholder={lang === "pt" ? "digite comandos aqui..." : "type commands here..."}
          autoFocus
          id="terminal-command-input-element"
        />
        <span className={`w-2.5 h-4 bg-[#00ff41] transition-all ${terminalFocus ? "animate-pulse" : "opacity-30"}`} />
      </div>

      {editingFile && (
        <NanoEditor
          lang={lang}
          editingFile={editingFile}
          nanoContent={nanoContent}
          setNanoContent={setNanoContent}
          setEditingFile={setEditingFile}
          saveNanoFile={saveNanoFile}
          triggerBeep={triggerBeep}
        />
      )}
    </div>
  );
}
