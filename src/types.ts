/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FSItem {
  name: string;
  type: "file" | "dir";
  content?: string; // used for files
  permissions?: number; // POSIX-style: 755 (rwxr-xr-x), 600 (rw-------), etc.
}

export interface FSDirectory {
  [pathName: string]: FSItem;
}

export interface VirtualFS {
  [dirPath: string]: FSDirectory; // e.g., "/": { "boot_assist.sh": ... }, "/var": { "log": ... }
}

export interface Challenge {
  id: string; // Ex: 'm1_s1_l1' (módulo 1, submódulo 1, level 1)
  module: string;
  name: string;
  actName: string;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  salary: number; // credits rewarded
  briefing: string;
  storySegment: string; // comic / narrative text
  initialFS?: { // Opcional, pois a construção do ambiente é gerenciada de forma declarativa pelo orquestrador
    [dirPath: string]: {
      [fileName: string]: {
        type: "file" | "dir";
        content?: string;
        permissions?: number;
      };
    };
  };
  validationType: "bash_script" | "file_check" | "port_check";
  liveSchematicType: "solar_power" | "security_mesh" | "cpu_temperature" | "ssh_routes" | "shell_loop" | "cluster_status" | "telemetry_offline";
  hint: string;
}


export interface SaveState {
  playerName: string;
  currentLevelId: string; // Ex: 'm1_s1_l1'
  credits: number;
  completedLevels: string[]; // IDs das fases concluídas
  auraIntegrity: number; // 35 to 100
  registered: boolean;
  llmConfig?: {
    provider: "simulated" | "gemini" | "local";
    baseUrl: string;
    model: string;
    apiKey: string;
  };
}

export interface TerminalLine {
  id: string;
  text: string;
  type: "input" | "output" | "error" | "success" | "warning" | "system";
  timestamp: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
