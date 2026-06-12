import React from "react";

type Props = {
  lang: "pt" | "en";
  editingFile: { path: string; name: string };
  nanoContent: string;
  setNanoContent: (s: string) => void;
  setEditingFile: (v: { path: string; name: string } | null) => void;
  saveNanoFile: () => void;
  triggerBeep: (f: number, d: number, t: "sine" | "square" | "sawtooth", vol?: number) => void;
};

export default function NanoEditor({ lang, editingFile, nanoContent, setNanoContent, setEditingFile, saveNanoFile, triggerBeep }: Props) {
  return (
    <div className="absolute inset-0 bg-[#07070a] border-2 border-[#00ff41] flex flex-col z-40 p-1 animate-fadeIn">
      <div className="bg-[#00ff41] text-black px-3 py-1 font-bold text-xs uppercase flex justify-between items-center">
        <span>GNU nano - {lang === "pt" ? "Arquivo" : "File"}: {editingFile.name} ({lang === "pt" ? "Modo Seguro" : "Safe Mode"})</span>
        <span className="text-[10px]">{lang === "pt" ? "Ctrl+O: Salvar  |  Ctrl+X: Sair" : "Ctrl+O: Save  |  Ctrl+X: Exit"}</span>
      </div>

      <textarea
        value={nanoContent}
        onChange={(e) => setNanoContent(e.target.value)}
        className="flex-1 bg-[#0a0a0c] text-[#00ff41] p-3 font-mono text-xs border-none outline-none resize-none focus:ring-0 custom-scrollbar mt-1"
        placeholder={lang === "pt" ? "# Escreva seu script profissional bash..." : "# Write your professional bash script..."}
        id="nano-text-area-editor"
      />

      <div className="bg-black border-t border-[#00ff41]/30 p-2 flex justify-between items-center text-[10px] gap-2">
        <span className="text-gray-400">Total: {nanoContent.length} {lang === "pt" ? "caracteres" : "characters"}</span>
        <div className="flex gap-2">
          <button
            onClick={() => { setEditingFile(null); triggerBeep(200, 0.1, "sine"); }}
            className="bg-[#00ff41]/10 text-red-400 border border-red-500/40 px-3 py-1 rounded hover:bg-red-950/20 text-xs uppercase font-bold cursor-pointer"
            id="close-nano-btn"
          >
            {lang === "pt" ? "Cancelar" : "Cancel"}
          </button>
          <button
            onClick={saveNanoFile}
            className="bg-[#00ff41] text-black px-4 py-1 rounded hover:bg-emerald-300 text-xs font-bold cursor-pointer uppercase"
            id="save-nano-btn"
          >
            {lang === "pt" ? "Salvar arquivo" : "Save file"}
          </button>
        </div>
      </div>
    </div>
  );
}
