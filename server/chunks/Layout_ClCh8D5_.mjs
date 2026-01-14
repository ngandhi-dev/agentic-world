import { b as createAstro, c as createComponent, d as addAttribute, g as renderHead, h as renderSlot, e as renderScript, a as renderTemplate } from './astro/server_DGMCOvMD.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro("https://www.agentsicworld.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const siteName = "Curated Research, News & Implementation Stack.";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const description = "Curated Research, News & Implementation Stack.";
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="../../styles/pulse.css"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])}  ${renderScript($$result, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
