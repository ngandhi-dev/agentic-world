import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, d as addAttribute, a as renderTemplate } from './astro/server_DSnOUyyP.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_-lTqzB9X.mjs';
/* empty css                          */

function ProfileBadge() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "badge-skeleton" });
  if (!user) {
    return /* @__PURE__ */ jsx("a", { href: "/hub", className: "login-link", children: "Sign In" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "profile-badge", children: [
    /* @__PURE__ */ jsx("div", { className: "avatar-circle", children: user.email[0].toUpperCase() }),
    /* @__PURE__ */ jsxs("div", { className: "profile-dropdown", children: [
      /* @__PURE__ */ jsx("span", { className: "user-email", children: user.email }),
      /* @__PURE__ */ jsx("button", { onClick: handleSignOut, className: "signout-btn", children: "Sign Out" })
    ] })
  ] });
}

const $$Astro = createAstro("https://www.agentsicworld.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Navigation;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pulse", label: "Agentic Pulse" },
    { href: "/stack", label: "Agentic Stack" },
    { href: "/hub", label: "Agentic Hub" },
    { href: "/about", label: "About" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="site-header"> <div class="nav-container"> <nav class="main-nav"> <ul class="nav-list"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")}${addAttribute(Astro2.pathname === link.href ? "active-link" : "standard-link", "class")}> ${link.label} </a> </li>`)} <li> ${renderComponent($$result, "ProfileBadge", ProfileBadge, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/ProfileBadge.jsx", "client:component-export": "default" })} </li> </ul> </nav> </div> </header> `;
}, "/home/runner/work/agentic_ai_hub/agentic_ai_hub/src/components/Navigation.astro", void 0);

export { $$Navigation as $ };
