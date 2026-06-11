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
  id: number;
  module: string;
  name: string;
  actName: string;
  difficulty: "Fácil" | "Médio" | "Difícil" | "Lendário";
  salary: number; // credits rewarded
  briefing: string;
  storySegment: string; // comic / narrative text
  initialFS: {
    [dirPath: string]: {
      [fileName: string]: {
        type: "file" | "dir";
        content?: string;
        permissions?: number;
      };
    };
  };
  liveSchematicType: "solar_power" | "security_mesh" | "cpu_temperature" | "ssh_routes" | "shell_loop" | "cluster_status";
  successCondition: (fs: VirtualFS, variables?: Record<string, any>) => { success: boolean; message?: string };
  hint: string;
}

export interface SaveState {
  playerName: string;
  currentLevelId: number;
  credits: number;
  completedLevels: number[];
  auraIntegrity: number; // 35 to 100
  registered: boolean;
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
