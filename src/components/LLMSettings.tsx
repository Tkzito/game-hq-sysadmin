// Imperative LLM Settings overlay (mounts itself on import)
// This file intentionally uses direct DOM APIs so it can be imported as a side-effect

function safeParseSave() {
  try {
    const raw = localStorage.getItem('root_access_save');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) { return {}; }
}

function saveLLMConfig(cfg: any) {
  const save = safeParseSave();
  save.llmConfig = Object.assign({}, save.llmConfig || {}, cfg);
  localStorage.setItem('root_access_save', JSON.stringify(save));
}

function createOverlay() {
  if (document.getElementById('llm-settings-overlay')) return;

  const style = document.createElement('style');
  style.textContent = `
  #llm-settings-overlay { position: fixed; right: 18px; bottom: 18px; z-index: 9999; }
  #llm-settings-btn { background: #0f172a; color: #e6eef8; border-radius: 8px; padding: 10px 12px; cursor: pointer; box-shadow: 0 6px 20px rgba(2,6,23,0.6); }
  #llm-modal { position: fixed; right: 18px; bottom: 72px; width: 360px; background: #071028; color: #dbeafe; border-radius: 8px; padding: 12px; box-shadow: 0 12px 40px rgba(2,6,23,0.7); display: none; font-family: sans-serif; }
  #llm-modal input, #llm-modal select { width: 100%; margin-bottom: 8px; padding: 8px; border-radius: 4px; border: 1px solid #234; background: #042233; color: #cfe8ff; }
  #llm-modal .row { margin-bottom: 6px; }
  #llm-modal .actions { display:flex; justify-content:flex-end; gap:8px; }
  #llm-modal button { padding: 8px 10px; border-radius:4px; border: none; cursor:pointer; }
  #llm-modal .save { background: #0ea5a0; color: #002; }
  #llm-modal .close { background: transparent; color: #9ab; border: 1px solid #1b3345; }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'llm-settings-overlay';

  const btn = document.createElement('button');
  btn.id = 'llm-settings-btn';
  btn.title = 'AI Settings';
  btn.innerText = 'AI';

  const modal = document.createElement('div');
  modal.id = 'llm-modal';

  modal.innerHTML = `
    <div style="font-weight:600; margin-bottom:8px;">AI / LLM Settings</div>
    <div class="row"><label>Provider</label><select id="llm-provider"><option value="simulated">Simulated</option><option value="local">Local (Ollama)</option><option value="gemini">Cloud (Gemini)</option></select></div>
    <div class="row"><label>Base URL</label><input id="llm-baseurl" placeholder="http://localhost:11434/v1"/></div>
    <div class="row"><label>Model</label><input id="llm-model" placeholder="bunker-core"/></div>
    <div class="row"><label>API Key (optional)</label><input id="llm-apikey" placeholder="(leave blank if none)"/></div>
    <div class="actions"><button class="close">Close</button><button class="save">Save & Apply</button></div>
  `;

  btn.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    // populate
    const save = safeParseSave();
    const cfg = save.llmConfig || {};
    const prov = (cfg.provider) || (window?.process?.env?.REACT_APP_LLM_PROVIDER) || 'local';
    const base = cfg.baseUrl || (window?.process?.env?.REACT_APP_LLM_BASE_URL) || 'http://localhost:11434/v1';
    const model = cfg.model || (window?.process?.env?.REACT_APP_LLM_MODEL) || 'bunker-core';
    const key = cfg.apiKey || '';
    (document.getElementById('llm-provider') as HTMLSelectElement).value = prov;
    (document.getElementById('llm-baseurl') as HTMLInputElement).value = base;
    (document.getElementById('llm-model') as HTMLInputElement).value = model;
    (document.getElementById('llm-apikey') as HTMLInputElement).value = key;
  });

  modal.querySelector('.close')?.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.querySelector('.save')?.addEventListener('click', () => {
    const provider = (document.getElementById('llm-provider') as HTMLSelectElement).value;
    const baseUrl = (document.getElementById('llm-baseurl') as HTMLInputElement).value;
    const model = (document.getElementById('llm-model') as HTMLInputElement).value;
    const apiKey = (document.getElementById('llm-apikey') as HTMLInputElement).value;
    saveLLMConfig({ provider, baseUrl, model, apiKey });
    // notify user
    alert('LLM configuration saved to local storage. The UI will reload to apply changes.');
    location.reload();
  });

  root.appendChild(modal);
  root.appendChild(btn);
  document.body.appendChild(root);
}

// Wait for DOM ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  createOverlay();
} else {
  window.addEventListener('DOMContentLoaded', createOverlay);
}

export {};
