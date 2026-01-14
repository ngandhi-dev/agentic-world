/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, e as renderScript, a as renderTemplate, r as renderComponent, F as Fragment, u as unescapeHTML } from '../chunks/astro/server_DGMCOvMD.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { $ as $$Navigation } from '../chunks/Navigation_DO5BtSb-.mjs';
import { $ as $$Footer } from '../chunks/footer_BObJIVNf.mjs';
import { $ as $$Layout } from '../chunks/Layout_ClCh8D5_.mjs';
import { s as supabase } from '../chunks/supabase_-lTqzB9X.mjs';
import { g as getCollection } from '../chunks/_astro_content_CdqR1wNG.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.agentsicworld.com");
const $$NewsletterForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewsletterForm;
  const { variant = "inline" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="newsletter-form"${addAttribute(`newsletter-form newsletter-form--${variant}`, "class")} action="https://buttondown.com/api/emails/embed-subscribe/agentsicworld" data-astro-cid-nbvfnxgh> <input type="email" id="subscriber-email" name="email" placeholder="Enter your email" required aria-label="Email address" data-astro-cid-nbvfnxgh> <button type="submit" id="submit-btn" data-astro-cid-nbvfnxgh>
Join Agentic Pulse
</button> </form> ${renderScript($$result, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/NewsletterForm.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/NewsletterForm.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero-section" class="hero-container gradient-bg py-24 px-4" data-astro-cid-bbe6dxrz> <div class="max-w-4xl mx-auto text-center flex flex-col items-center" data-astro-cid-bbe6dxrz> <h1 class="hero-title text-white" data-astro-cid-bbe6dxrz>
Stop searching for <br class="hidden sm:block" data-astro-cid-bbe6dxrz> quality Agentic AI content
</h1> <p class="hero-subtitle text-white/90" data-astro-cid-bbe6dxrz>
We scan <span class="highlight font-bold text-white" data-astro-cid-bbe6dxrz>100+ AI sources</span> daily to bring you the <span class="font-bold text-white" data-astro-cid-bbe6dxrz>latest breakthroughs</span> in autonomous agents every week.
</p> <div class="cta-content" data-astro-cid-bbe6dxrz> ${renderComponent($$result, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-bbe6dxrz": true })} <p style="text-align: center; margin-top: 12px; font-size: 12px; color: rgba(255,255,255,0.5); font-style: italic; width: 100%;" data-astro-cid-bbe6dxrz>
Join our subscriber list for quality content. No spam ever.
</p> </div> <div class="mb-10 w-full" style="display: grid; place-items: center;" data-astro-cid-bbe6dxrz> <ul style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; list-style: none; padding: 0; margin: 0; color: rgba(255,255,255,0.8); font-size: 0.875rem;" data-astro-cid-bbe6dxrz> <li class="feature-item" style="display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;" data-astro-cid-bbe6dxrz>
News & Updates
</li> <li class="feature-item" style="display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;" data-astro-cid-bbe6dxrz>
Agent Frameworks
</li> <li class="feature-item" style="display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;" data-astro-cid-bbe6dxrz>
Weekly Stack Review
</li> </ul> </div> <div class="social-proof pt-8 border-t border-white/10 flex items-center" data-astro-cid-bbe6dxrz> <div class="avatar-group flex -space-x-3" data-astro-cid-bbe6dxrz> <img src="https://i.pravatar.cc/100?img=59" alt="User" class="w-10 h-10 rounded-full border-2 border-[#1e3a8a]" data-astro-cid-bbe6dxrz> <img src="https://i.pravatar.cc/100?img=49" alt="User" class="w-10 h-10 rounded-full border-2 border-[#1e3a8a]" data-astro-cid-bbe6dxrz> <img src="https://i.pravatar.cc/100?img=68" alt="User" class="w-10 h-10 rounded-full border-2 border-[#1e3a8a]" data-astro-cid-bbe6dxrz> <p class="text-sm font-semibold" style="padding-left:15px" data-astro-cid-bbe6dxrz> Join the <span class="bold-link text-white font-bold underline decoration-blue-400" data-astro-cid-bbe6dxrz>future of autonomy</span></p> </div> </div> <div class="mt-8 w-full" style="display: grid; place-items: center;" data-astro-cid-bbe6dxrz> <a href="/pulse/" style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s ease;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.7)'" data-astro-cid-bbe6dxrz>
Read the latest issue HERE (No need to subscribe)
</a> </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/Hero.astro", void 0);

const $$ProcessGrid = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
      title: "AI Discovery",
      description: "Our agents scan 200+ technical sources daily to find the latest breakthroughs in agentic frameworks."
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
      title: "Expert Curation",
      description: "We hand-pick the top 5 most impactful tools and papers. No filler, just pure technical value."
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
      title: "Instant Pulse",
      description: "Delivered to your inbox every morning, ensuring you stay ahead of the AI agent curve."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="process-section" data-astro-cid-ctm66uln> <div class="process-container" data-astro-cid-ctm66uln> <div class="process-header" data-astro-cid-ctm66uln> <h2 data-astro-cid-ctm66uln>How It Works</h2> <div class="blue-accent" data-astro-cid-ctm66uln></div> </div> <div class="features-flex" data-astro-cid-ctm66uln> ${features.map((item) => renderTemplate`<div class="feature-card" data-astro-cid-ctm66uln> <div class="icon-box" data-astro-cid-ctm66uln> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(item.icon)}` })} </div> <h3 data-astro-cid-ctm66uln>${item.title}</h3> <p data-astro-cid-ctm66uln>${item.description}</p> </div>`)} </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/ProcessGrid.astro", void 0);

const $$SourceMonitor = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    { label: "Model Labs", sources: "OpenAI, Anthropic, Google DeepMind, Meta AI" },
    { label: "Frameworks", sources: "LangChain, AutoGPT, CrewAI, Microsoft Autogen" },
    { label: "Research", sources: "arXiv, Stanford HAI, MIT CSAIL, HuggingFace" },
    { label: "Developer Hubs", sources: "GitHub Trends, IndieHackers, Vercel" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="source-section" data-astro-cid-qpwrs3yo> <div class="source-container" data-astro-cid-qpwrs3yo> <div class="source-header" data-astro-cid-qpwrs3yo> <div class="live-indicator" data-astro-cid-qpwrs3yo> <span class="ping" data-astro-cid-qpwrs3yo></span>
LIVE MONITOR ACTIVE
</div> <h2 data-astro-cid-qpwrs3yo>I Monitor <span class="highlight" data-astro-cid-qpwrs3yo>100+</span> Premium Sources</h2> <p data-astro-cid-qpwrs3yo>Continuous automated scanning across model labs, research papers, and technical repos.</p> </div> <div class="source-grid" data-astro-cid-qpwrs3yo> ${categories.map((cat) => renderTemplate`<div class="source-card" data-astro-cid-qpwrs3yo> <span class="cat-label" data-astro-cid-qpwrs3yo>${cat.label}</span> <p class="cat-sources" data-astro-cid-qpwrs3yo>${cat.sources}</p> </div>`)} </div> <div class="source-footer" data-astro-cid-qpwrs3yo> <p data-astro-cid-qpwrs3yo>50+ more technical feeds, discord servers, and private beta channels</p> </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/SourceMonitor.astro", void 0);

const $$InsideIssue = createComponent(($$result, $$props, $$slots) => {
  const checkmarks = [
    "Deep Dive into Agentic Frameworks",
    "Curated Weekly Stack Reviews",
    "The Latest Research Papers (Simplified)",
    "Open Source Tool Spotlights",
    "Upcoming AI Agent Events & Hackathons"
  ];
  return renderTemplate`${maybeRenderHead()}<section class="inside-section" data-astro-cid-kl42elnp> <div class="inside-container" data-astro-cid-kl42elnp> <div class="inside-text" data-astro-cid-kl42elnp> <span class="badge" data-astro-cid-kl42elnp>THE BLUEPRINT</span> <h2 data-astro-cid-kl42elnp>What's Inside Every Issue</h2> <p data-astro-cid-kl42elnp>
We cut through the noise of the AI hype cycle. Every Tuesday, you'll receive a condensed, high-signal report designed for developers and architects building the future of autonomous agents.
</p> <ul class="check-list" data-astro-cid-kl42elnp> ${checkmarks.map((item) => renderTemplate`<li data-astro-cid-kl42elnp> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kl42elnp><polyline points="20 6 9 17 4 12" data-astro-cid-kl42elnp></polyline></svg> <span data-astro-cid-kl42elnp>${item}</span> </li>`)} </ul> </div> <div class="inside-visual" data-astro-cid-kl42elnp> <div class="preview-card" data-astro-cid-kl42elnp> <div class="card-header" data-astro-cid-kl42elnp> <div class="dot red" data-astro-cid-kl42elnp></div> <div class="dot yellow" data-astro-cid-kl42elnp></div> <div class="dot green" data-astro-cid-kl42elnp></div> </div> <div class="card-body" data-astro-cid-kl42elnp> <div class="skeleton-line long" data-astro-cid-kl42elnp></div> <div class="skeleton-line mid" data-astro-cid-kl42elnp></div> <div class="skeleton-line short" data-astro-cid-kl42elnp></div> <div class="skeleton-block" data-astro-cid-kl42elnp></div> </div> </div> </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/InsideIssue.astro", void 0);

const $$TrustSection = createComponent(($$result, $$props, $$slots) => {
  const sources = ["OpenAI", "LangChain", "Microsoft Research", "Anthropic", "AutoGPT"];
  return renderTemplate`${maybeRenderHead()}<section class="trust-section" data-astro-cid-kb6hl6qf> <div class="trust-container" data-astro-cid-kb6hl6qf> <div class="founder-note" data-astro-cid-kb6hl6qf> <div class="quote-icon" data-astro-cid-kb6hl6qf> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#2563eb" opacity="0.2" data-astro-cid-kb6hl6qf><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-3.5 4.5-3.5 4.5L3 21zM14 3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-3.5 4.5-3.5 4.5l1.5 2.5c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4z" data-astro-cid-kb6hl6qf></path></svg> </div> <p class="note-text" data-astro-cid-kb6hl6qf>
"I started Agentic Pulse because the AI agent space is moving faster than anyone can track. My goal is to save you 10 hours of research every week by delivering the signal without the hype."
</p> <div class="founder-profile" data-astro-cid-kb6hl6qf> <div class="avatar" data-astro-cid-kb6hl6qf>AW</div> <div data-astro-cid-kb6hl6qf> <span class="name" data-astro-cid-kb6hl6qf>Founder, Agentic World</span> <span class="status" data-astro-cid-kb6hl6qf>Curating for 500+ Early Adopters</span> </div> </div> </div> <div class="authority-box" data-astro-cid-kb6hl6qf> <h3 data-astro-cid-kb6hl6qf>High-Signal Sources</h3> <p data-astro-cid-kb6hl6qf>We monitor the bleeding edge so you don't have to.</p> <div class="source-tags" data-astro-cid-kb6hl6qf> ${sources.map((source) => renderTemplate`<span class="tag" data-astro-cid-kb6hl6qf>${source}</span>`)} <span class="tag plus" data-astro-cid-kb6hl6qf>+ 150 more</span> </div> <div class="no-spam-card" data-astro-cid-kb6hl6qf> <div class="benefit" data-astro-cid-kb6hl6qf> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kb6hl6qf><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-kb6hl6qf></path><polyline points="22 4 12 14.01 9 11.01" data-astro-cid-kb6hl6qf></polyline></svg> <span data-astro-cid-kb6hl6qf>No AI-generated filler</span> </div> <div class="benefit" data-astro-cid-kb6hl6qf> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kb6hl6qf><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-kb6hl6qf></path><polyline points="22 4 12 14.01 9 11.01" data-astro-cid-kb6hl6qf></polyline></svg> <span data-astro-cid-kb6hl6qf>Unsubscribe anytime</span> </div> </div> </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/TrustSection.astro", void 0);

const $$FooterCTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="cta-band" data-astro-cid-ti3kcdhq> <div class="cta-container" data-astro-cid-ti3kcdhq> <div class="cta-content" data-astro-cid-ti3kcdhq> <span class="cta-badge" data-astro-cid-ti3kcdhq>STAY AHEAD</span> <h2 data-astro-cid-ti3kcdhq>Ready to master the Agentic Stack?</h2> <p data-astro-cid-ti3kcdhq>Join a growing community of developers receiving weekly technical deep-dives into the future of autonomous AI.</p> ${renderComponent($$result, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-ti3kcdhq": true })} <div class="cta-features" data-astro-cid-ti3kcdhq> <span data-astro-cid-ti3kcdhq>100% Free</span> <span data-astro-cid-ti3kcdhq>Weekday Delivery</span> <span data-astro-cid-ti3kcdhq>No Spam</span> </div> </div> </div> </section> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/FooterCTA.astro", void 0);

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: topVisits, error } = await supabase.from("site_visits").select("page_path, visit_count").like("page_path", "/pulse/%").neq("page_path", "/pulse/").order("visit_count", { ascending: false }).limit(3);
  const allIssues = await getCollection("pulse");
  const trendingIssues = topVisits?.map((visit) => {
    const match = allIssues.find((issue) => `/pulse/${issue.slug}` === visit.page_path);
    return {
      ...visit,
      // Use the local slug to build a clean, reliable URL
      url: match ? `/pulse/${match.slug}` : null,
      title: match?.data.title || "Latest Update",
      tag: match?.data.tag || "Insight"
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Agentic AI World", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<section class="trending-section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="trending-header" data-astro-cid-j7pv25f6> <span class="live-dot" data-astro-cid-j7pv25f6></span> <h2 data-astro-cid-j7pv25f6>Trending Now</h2> </div> <div class="trending-grid" data-astro-cid-j7pv25f6> ${trendingIssues && trendingIssues.map((issue, index) => renderTemplate`<a${addAttribute(issue.url, "href")} class="trending-card" data-astro-cid-j7pv25f6> <span class="rank" data-astro-cid-j7pv25f6>0${index + 1}</span> <div class="trending-info" data-astro-cid-j7pv25f6> <span class="trending-tag" data-astro-cid-j7pv25f6>${issue.tag}</span> <h4 data-astro-cid-j7pv25f6>${issue.title}</h4> <div class="view-badge" data-astro-cid-j7pv25f6> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-j7pv25f6><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-astro-cid-j7pv25f6></path><circle cx="12" cy="12" r="3" data-astro-cid-j7pv25f6></circle></svg> ${issue.visit_count} views
</div> </div> </a>`)} </div> </div> </section> ${renderComponent($$result2, "Hero", $$Hero, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "ProcessGrid", $$ProcessGrid, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "SourceMonitor", $$SourceMonitor, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "InsideIssue", $$InsideIssue, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "TrustSection", $$TrustSection, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "FooterCTA", $$FooterCTA, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
