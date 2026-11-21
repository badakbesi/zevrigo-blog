// Tipe untuk `scripts/headers.mjs` (TSK-M71), dipakai `lib/headers.spec.ts`.
export const BASE_POLICY: string;
export const MAX_RULES: number;
export const MAX_LINE: number;
export function inlineScripts(html: Uint8Array | string): Uint8Array[];
export function pagePolicy(html: Uint8Array | string): string;
export function routeFor(relative: string): string | null;
export function htmlFiles(outDir: string): string[];
export function buildHeaders(outDir: string): { text: string; rules: number; pages: number };
