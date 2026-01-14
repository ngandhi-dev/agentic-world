/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, F as Fragment, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, e as renderScript, d as addAttribute } from '../chunks/astro/server_DGMCOvMD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_ClCh8D5_.mjs';
import { $ as $$Navigation } from '../chunks/Navigation_DO5BtSb-.mjs';
import { $ as $$Footer } from '../chunks/footer_BObJIVNf.mjs';
import { bundledLanguages } from 'shiki/langs';
import { createShikiHighlighter } from '@astrojs/markdown-remark';
import { s as supabase } from '../chunks/supabase_-lTqzB9X.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const cachedHighlighters = /* @__PURE__ */ new Map();
function getCachedHighlighter(opts) {
  const key = JSON.stringify(opts, Object.keys(opts).sort());
  if (cachedHighlighters.has(key)) {
    return cachedHighlighters.get(key);
  }
  const highlighter = createShikiHighlighter(opts);
  cachedHighlighters.set(key, highlighter);
  return highlighter;
}

const $$Astro$2 = createAstro("https://www.agentsicworld.com");
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Code;
  const {
    code,
    lang = "plaintext",
    meta,
    theme = "github-dark",
    themes = {},
    defaultColor = "light",
    wrap = false,
    inline = false,
    transformers = [],
    ...rest
  } = Astro2.props;
  if (typeof lang === "object") {
    if (lang.id) {
      lang.name = lang.id;
    }
    if (lang.grammar) {
      Object.assign(lang, lang.grammar);
    }
  }
  const highlighter = await getCachedHighlighter({
    langs: [
      typeof lang === "string" ? Object.keys(bundledLanguages).includes(lang) ? lang : "plaintext" : lang
    ],
    theme,
    themes
  });
  const html = await highlighter.codeToHtml(code, typeof lang === "string" ? lang : lang.name, {
    defaultColor,
    wrap,
    inline,
    transformers,
    meta,
    attributes: rest
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/node_modules/astro/components/Code.astro", void 0);

const $$Astro$1 = createAstro("https://www.agentsicworld.com");
const $$Debug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Debug;
  const key = Object.keys(Astro2.props)[0];
  const value = Astro2.props[key];
  return renderTemplate`${maybeRenderHead()}<div class="astro-debug"> <div class="astro-debug-header"> <h2 class="astro-debug-title"> <span class="astro-debug-label">Debug</span> <span class="astro-debug-name">"${key}"</span> </h2> </div> ${renderComponent($$result, "Code", $$Code, { "code": JSON.stringify(value, null, 2) })} </div> <style>
	.astro-debug {
		font-size: 14px;
		padding: 1rem 1.5rem;
		background: white;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	.astro-debug-header,
	pre.astro-code {
		margin: -1rem -1.5rem 1rem;
		padding: 0.25rem 0.75rem;
	}

	.astro-debug-header {
		background: #ff1639;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.astro-debug-title {
		font-size: 1em;
		color: white;
		margin: 0.5em 0;
	}

	.astro-debug-label {
		font-weight: bold;
		text-transform: uppercase;
		margin-right: 0.75em;
	}

	pre.astro-code {
		border: 1px solid #eee;
		padding: 1rem 0.75rem;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		font-size: 14px;
	}
</style>`;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/node_modules/astro/components/Debug.astro", void 0);

const $$Astro = createAstro("https://www.agentsicworld.com");
const prerender = false;
const $$Stack = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Stack;
  const { resource } = Astro2.props;
  if (resource) {
    const { url, title, summary } = resource;
  }
  const { data: dbTools } = await supabase.from("stack_resources").select("tool_slug, layer_id").not("tool_slug", "is", null);
  const getUniquePills = (layerId) => {
    const layerTools = dbTools?.filter((t) => t.layer_id === layerId) || [];
    return [...new Set(layerTools.map((t) => t.tool_slug))];
  };
  const layers = [
    {
      id: "brain",
      level: "Layer 01",
      title: "The Reasoning Brain",
      subtitle: "Frontier & Specialist Models",
      description: "The core intelligence layer. Modern stacks use a 'Router' pattern to send complex reasoning tasks to frontier models while offloading simple formatting or extraction to fast, small models (SLMs).",
      metaDesc: "Master the Brain Layer of the Agentic Stack. Compare frontier models like GPT-4o and Claude 3.5 with SLMs for optimal agent reasoning and cost-efficiency.",
      // Filter the DB tools to find those belonging to this layer
      tools: dbTools?.filter((t) => t.layer_id === "brain").map((t) => ({
        name: t.title || "Unknown Tool",
        slug: t.slug || "unknown",
        docsUrl: `/stack/tools/${t.slug}`
      })) || [],
      color: "from-blue-600 to-cyan-500",
      blueprint: `// Pattern: LLM Routing Logic
const agentBrain = async (input: string) => {
  const complexity = await analyzeComplexity(input);
  
  // Route to high-reasoning vs high-speed
  const model = complexity > 0.7 
    ? "claude-3-5-sonnet" 
    : "gpt-4o-mini";

  return await llm.generate({ model, prompt: input });
};`
    },
    {
      id: "logic",
      level: "Layer 02",
      title: "The Orchestration",
      subtitle: "State Management & Cognitive Loops",
      description: "The nervous system that manages multi-step workflows. It handles the 'ReAct' loop (Reason + Act), enabling the agent to observe its own mistakes and correct them before final output.",
      metaDesc: "Build reliable AI workflows with the Logic Layer. Implementation guides for LangGraph, AutoGen, and CrewAI to manage stateful, multi-agent orchestration.",
      // Filter the DB tools to find those belonging to this layer
      tools: dbTools?.filter((t) => t.layer_id === "logic").map((t) => ({
        name: t.title,
        slug: t.slug,
        docsUrl: `/stack/tools/${t.slug}`
      })) || [],
      color: "from-purple-600 to-pink-500",
      blueprint: `// Pattern: ReAct Loop (LangGraph style)
const workflow = new StateGraph(AgentState)
  .addNode("think", reasoner)
  .addNode("act", toolExecutor)
  .addEdge("think", (state) => {
    return state.hasToolCall ? "act" : "__end__";
  })
  .addEdge("act", "think");`
    },
    {
      id: "memory",
      level: "Layer 03",
      title: "The Memory Vault",
      subtitle: "Context & Long-term Recall",
      description: "Agents need 'Short-term' memory (conversation history) and 'Long-term' memory (learning user preferences over months). This layer manages Vector DBs and Semantic Cache.",
      metaDesc: "Connect agents to the real world. Explore technical deep-dives on function calling, MCP servers, and tool-use integration for autonomous agent execution.",
      // Filter the DB tools to find those belonging to this layer
      tools: dbTools?.filter((t) => t.layer_id === "memory").map((t) => ({
        name: t.title,
        slug: t.slug,
        docsUrl: `/stack/tools/${t.slug}`
      })) || [],
      color: "from-emerald-600 to-teal-500",
      blueprint: `// Pattern: Semantic Memory Retrieval
    const getContext = async (userId: string, query: string) => {
    // 1. Fetch vector context from Pinecone
    const vectorDocs = await vectorStore.search(query);
  
    // 2. Fetch user preferences from Mem0
    const userPrefs = await memory.get(userId);

    return \`Prefs: \${userPrefs} \\n Context: \${vectorDocs}\`;
};`
    },
    {
      id: "hands",
      level: "Layer 04",
      title: "The Action Layer",
      subtitle: "Tools, Browsers & MCP",
      description: "The 'Hands' of the agent. This layer uses tool-calling to interact with external APIs, execute Python code in sandboxes, or navigate websites to find information.",
      metaDesc: "Ensure production-grade AI reliability. Technical resources for implementing agent guardrails, cost monitoring, and LangSmith evaluation patterns.",
      // Filter the DB tools to find those belonging to this layer
      tools: dbTools?.filter((t) => t.layer_id === "general").map((t) => ({
        name: t.title,
        slug: t.slug,
        docsUrl: `/stack/tools/${t.slug}`
      })) || [],
      color: "from-amber-600 to-orange-500",
      blueprint: `// Pattern: Tool Definition (JSON Schema)
const tools = [{
  type: "function",
  function: {
    name: "get_stock_price",
    description: "Fetches live price for a symbol",
    parameters: {
      type: "object",
      properties: {
        symbol: { type: "string" }
      }
    }
  }
}];`
    },
    {
      id: "evals",
      level: "Layer 05",
      title: "The Guardrails & Evals",
      subtitle: "Observability & Trust Systems",
      description: "The safety net. In production, agents must be monitored for 'hallucination rates,' tool-calling accuracy, and cost spikes. This layer ensures that autonomous actions remain within corporate policy and safety boundaries.",
      // Filter the DB tools to find those belonging to this layer
      tools: dbTools?.filter((t) => t.layer_id === "evals").map((t) => ({
        name: t.title,
        slug: t.slug,
        docsUrl: `/stack/tools/${t.slug}`
      })) || [],
      color: "from-red-600 to-orange-500",
      blueprint: `// Pattern: LLM-as-a-Judge Evaluation
const evalAgent = async (prediction, reference) => {
  const feedback = await evaluator.check({
    input: prediction,
    criteria: "conciseness, accuracy, tone",
    reference: reference
  });

  if (feedback.score < 0.8) {
    throw new Error("Quality threshold not met");
  }
  return feedback;
};`
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Agentic Stack | Architectural Blueprints for Autonomous Systems", "data-astro-cid-mbzyqcdw": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-mbzyqcdw": true })} ${maybeRenderHead()}<main class="stack-page" data-astro-cid-mbzyqcdw> <div class="content-wrapper" data-astro-cid-mbzyqcdw> <header class="hero" data-astro-cid-mbzyqcdw> <span class="version-tag" data-astro-cid-mbzyqcdw>SYSTEM_CORE: v2.0</span> <h1 data-astro-cid-mbzyqcdw>The Agentic Stack</h1> <p data-astro-cid-mbzyqcdw>Architectural blueprints for autonomous systems.</p> <div class="search-container" data-astro-cid-mbzyqcdw> <input type="text" id="tool-search" placeholder="Search the stack (e.g. LangGraph, Memory, GPT-4o)..." data-astro-cid-mbzyqcdw> </div></header> <div class="stack-layout" data-astro-cid-mbzyqcdw> <aside class="sidebar" data-astro-cid-mbzyqcdw> ${layers.map((l) => renderTemplate`<a${addAttribute(`#${l.id}`, "href")} data-astro-cid-mbzyqcdw>${l.level}</a>`)} </aside> <div class="layers-container" data-astro-cid-mbzyqcdw> ${layers.map((layer) => renderTemplate`<section${addAttribute(layer.id, "id")} class="layer-card" data-astro-cid-mbzyqcdw> <div class="card-header" data-astro-cid-mbzyqcdw> <div class="title-area" data-astro-cid-mbzyqcdw> <div${addAttribute(`indicator bg-gradient-to-r ${layer.color}`, "class")} data-astro-cid-mbzyqcdw></div> <span class="level" data-astro-cid-mbzyqcdw>${layer.level}</span> <a${addAttribute(`/stack/${layer.id}`, "href")} class="hover:text-blue-600 transition-colors" data-astro-cid-mbzyqcdw> <h2 class="text-3xl font-bold" data-astro-cid-mbzyqcdw>${layer.title}</h2> </a> <p class="subtitle" data-astro-cid-mbzyqcdw>${layer.subtitle}</p> </div> <button class="toggle-btn"${addAttribute(`code-${layer.id}`, "data-target")} data-astro-cid-mbzyqcdw> <span data-astro-cid-mbzyqcdw>BLUEPRINT</span> <div class="switch" data-astro-cid-mbzyqcdw><div class="dot" data-astro-cid-mbzyqcdw></div></div> </button> </div> <div${addAttribute(`desc-${layer.id}`, "id")} class="view-content active" data-astro-cid-mbzyqcdw> <p data-astro-cid-mbzyqcdw>${layer.description}</p> <div class="tools" data-astro-cid-mbzyqcdw> ${getUniquePills(layer.id).map((pillName) => renderTemplate`<button class="tool-pill"${addAttribute(pillName, "data-tool")}${addAttribute(`openToolModal('${pillName}')`, "onclick")} data-astro-cid-mbzyqcdw> ${pillName} <span class="arrow" data-astro-cid-mbzyqcdw>→</span> </button>`)} </div> </div> <div${addAttribute(`code-${layer.id}`, "id")} class="view-content hidden code-box" data-astro-cid-mbzyqcdw> ${renderComponent($$result2, "Code", $$Code, { "code": layer.blueprint, "lang": "ts", "theme": "github-dark", "data-astro-cid-mbzyqcdw": true })} </div> <div${addAttribute(`resources-${layer.id}`, "id")} class="technical-feed hidden" data-astro-cid-mbzyqcdw> <h3 data-astro-cid-mbzyqcdw>Technical Deep Dives</h3> <div class="resource-grid"${addAttribute(`feed-container-${layer.id}`, "id")} data-astro-cid-mbzyqcdw> <p class="loading" data-astro-cid-mbzyqcdw>Loading implementation guides...</p> </div> </div> </section>`)} </div> </div> </div> <div id="tool-modal" class="modal-overlay hidden" data-astro-cid-mbzyqcdw> <div class="modal-content" data-astro-cid-mbzyqcdw> <div class="modal-header" data-astro-cid-mbzyqcdw> <h2 id="modal-title" data-astro-cid-mbzyqcdw>Tool Research</h2> <button onclick="closeToolModal()" class="close-btn" data-astro-cid-mbzyqcdw>&times;</button> </div> <div id="modal-results" class="modal-body" data-astro-cid-mbzyqcdw></div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-mbzyqcdw": true })} ` })}  ${renderScript($$result, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/pages/stack.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/pages/stack.astro", void 0);

const $$file = "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/pages/stack.astro";
const $$url = "/stack";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Stack,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
