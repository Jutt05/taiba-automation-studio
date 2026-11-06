/**
 * WordPress-aware replacement for src/content/ai-automation.ts (swapped in by the
 * wordpress-export Vite alias). It returns the ORIGINAL copy and only replaces a
 * value when WordPress supplies a non-empty override in window.TAIBA_CONTENT.content.
 * The original file is never edited.
 */
import * as original from "taiba-original-content";

declare global {
  interface Window {
    TAIBA_CONTENT?: { content?: Record<string, unknown>; images?: Record<string, string> };
  }
}

const overrides: Record<string, unknown> =
  (typeof window !== "undefined" && window.TAIBA_CONTENT && window.TAIBA_CONTENT.content) || {};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over) && !isObj(over)) return base;
    const o = over as Record<string, unknown>;
    return base.map((item, i) => merge(item, o[i])) as unknown as T;
  }
  if (isObj(base)) {
    if (!isObj(over)) return base;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(base)) out[k] = merge((base as Record<string, unknown>)[k], over[k]);
    return out as T;
  }
  if (typeof base === "string") return (typeof over === "string" && over.trim() !== "" ? over : base) as T;
  return base;
}

export const LINKS = merge(original.LINKS, overrides.LINKS);
export const hero = merge(original.hero, overrides.hero);
export const overview = merge(original.overview, overrides.overview);
export const pain = merge(original.pain, overrides.pain);
export const chatbots = merge(original.chatbots, overrides.chatbots);
export const workflows = merge(original.workflows, overrides.workflows);
export const example = merge(original.example, overrides.example);
export const tools = merge(original.tools, overrides.tools);
export const midCta = merge(original.midCta, overrides.midCta);
export const process = merge(original.process, overrides.process);
export const industries = merge(original.industries, overrides.industries);
export const faqs = merge(original.faqs, overrides.faqs);
export const finalCta = merge(original.finalCta, overrides.finalCta);
export type { StepKind } from "taiba-original-content";
