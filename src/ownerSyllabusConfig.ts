import { SyllabusYearPack } from '../data/types';
import {
  buildDefault2026Pack,
  importPackFromJson,
  shiftYearPack,
} from '../utils/syllabusPackManager';

/**
 * OWNER / BACKEND CONFIGURATION FILE
 * ----------------------------------
 * Students never see Admin / Year-Switch / JSON-Sync buttons in the UI.
 * You (the Owner) can update syllabus data in two ways:
 * 1) Password-Protected Secret Admin Area: Open via `#admin`, `?admin=1`,
 *    `Ctrl+Shift+A`, or 5 rapid taps on the Footer copyright line.
 * 2) Backend Config File: Update `/public/syllabus-config.json` (set `enabled: true`
 *    or paste an exported pack JSON) or set `OPTIONAL_REMOTE_FEED_URL` below.
 */
export const OWNER_DEFAULT_PASSCODE = 'MPK@2026';
export const PUBLIC_BACKEND_CONFIG_PATH = '/syllabus-config.json';
export const OPTIONAL_REMOTE_FEED_URL = '';

const OWNER_PASS_STORAGE_KEY = 'examinside_owner_pass_v1';
const OWNER_SESSION_UNLOCK_KEY = 'examinside_owner_unlocked_v1';
const OWNER_ICON_PINNED_KEY = 'examinside_owner_icon_pinned_v1';
const BACKEND_SIGNATURE_KEY = 'examinside_backend_sig_v1';

function hashPasscode(input: string): string {
  // Deterministic lightweight hash for client/APK offline passcode verification
  let h1 = 0x811c9dc5;
  const salted = `examinside_mpk::${input.trim()}`;
  for (let i = 0; i < salted.length; i++) {
    h1 ^= salted.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  return `mpk_${(h1 >>> 0).toString(16)}`;
}

export function getStoredOwnerPassHash(): string {
  if (typeof window !== 'undefined') {
    try {
      const custom = window.localStorage.getItem(OWNER_PASS_STORAGE_KEY);
      if (custom && custom.trim()) return custom;
    } catch {
      // ignore storage access issues
    }
  }
  return hashPasscode(OWNER_DEFAULT_PASSCODE);
}

export function verifyOwnerPasscode(candidate: string): boolean {
  const clean = candidate.trim();
  if (!clean) return false;
  return hashPasscode(clean) === getStoredOwnerPassHash();
}

export function updateOwnerPasscode(
  currentPasscode: string,
  newPasscode: string
): { ok: boolean; error?: string } {
  if (!verifyOwnerPasscode(currentPasscode)) {
    return { ok: false, error: 'Current passcode is incorrect.' };
  }
  const cleanNew = newPasscode.trim();
  if (cleanNew.length < 4) {
    return { ok: false, error: 'New passcode must be at least 4 characters.' };
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(OWNER_PASS_STORAGE_KEY, hashPasscode(cleanNew));
    } catch {
      return { ok: false, error: 'Unable to save passcode in browser storage.' };
    }
  }
  return { ok: true };
}

export function isOwnerSessionUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(OWNER_SESSION_UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

export function setOwnerSessionUnlocked(unlocked: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (unlocked) {
      window.sessionStorage.setItem(OWNER_SESSION_UNLOCK_KEY, '1');
    } else {
      window.sessionStorage.removeItem(OWNER_SESSION_UNLOCK_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

/**
 * Hidden by default (`false`) so normal students never see any Admin icon.
 * Becomes `true` ONLY on the Owner's device after unlocking with the password.
 */
export function isOwnerIconPinned(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(OWNER_ICON_PINNED_KEY) === '1';
  } catch {
    return false;
  }
}

export function setOwnerIconPinned(pinned: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (pinned) {
      window.localStorage.setItem(OWNER_ICON_PINNED_KEY, '1');
    } else {
      window.localStorage.removeItem(OWNER_ICON_PINNED_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export interface LightweightBackendConfig {
  enabled?: boolean;
  examYear?: number;
  paperYears?: number[];
  packLabel?: string;
  remotePackUrl?: string;
  version?: string;
}

export interface BackendResolutionResult {
  pack: SyllabusYearPack | null;
  remotePackUrl?: string;
  signature: string;
}

/**
 * Resolves either a full exported `SyllabusYearPack` JSON or a lightweight
 * `{ enabled: true, examYear: 2030, paperYears: [2030, 2029, 2028, 2027] }`
 * backend configuration file into a live `SyllabusYearPack`.
 */
export function resolveBackendConfigPayload(
  rawJson: string
): BackendResolutionResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { pack: null, signature: '' };
  }
  if (!parsed || typeof parsed !== 'object') {
    return { pack: null, signature: '' };
  }

  const obj = parsed as Record<string, unknown>;

  // Case 1: Full SyllabusYearPack exported from Owner Admin
  if (
    obj.session &&
    Array.isArray(obj.class10Blueprints) &&
    Array.isArray(obj.class12Blueprints)
  ) {
    const pack = importPackFromJson(rawJson);
    const sig = `full:${pack.id}:${pack.session.examYear}:${pack.session.paperYears.join(',')}:${typeof obj.version === 'string' ? obj.version : ''}`;
    return { pack, signature: sig };
  }

  // Case 2: Lightweight backend trigger file
  const cfg = obj as LightweightBackendConfig;
  if (!cfg.enabled) {
    return { pack: null, signature: '' };
  }

  const remotePackUrl =
    typeof cfg.remotePackUrl === 'string' && cfg.remotePackUrl.trim()
      ? cfg.remotePackUrl.trim()
      : undefined;

  if (typeof cfg.examYear === 'number' && cfg.examYear >= 2020 && cfg.examYear <= 2099) {
    const base = buildDefault2026Pack();
    const paperYears =
      Array.isArray(cfg.paperYears) && cfg.paperYears.length > 0
        ? cfg.paperYears
        : [cfg.examYear, cfg.examYear - 1, cfg.examYear - 2, cfg.examYear - 3];
    const shifted = shiftYearPack(base, cfg.examYear, paperYears, cfg.packLabel);
    const sig = `light:${shifted.session.examYear}:${shifted.session.paperYears.join(',')}:${cfg.version || ''}`;
    return { pack: shifted, remotePackUrl, signature: sig };
  }

  return {
    pack: null,
    remotePackUrl,
    signature: remotePackUrl ? `remote:${remotePackUrl}:${cfg.version || ''}` : '',
  };
}

export function getLastAppliedBackendSignature(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(BACKEND_SIGNATURE_KEY) || '';
  } catch {
    return '';
  }
}

export function setLastAppliedBackendSignature(sig: string): void {
  if (typeof window === 'undefined' || !sig) return;
  try {
    window.localStorage.setItem(BACKEND_SIGNATURE_KEY, sig);
  } catch {
    // ignore storage errors
  }
}
