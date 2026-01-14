import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_emisWmQa.mjs';
import { manifest } from './manifest_BE3IDp-Q.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/auth/callback.astro.mjs');
const _page3 = () => import('./pages/api/auth/set-session.astro.mjs');
const _page4 = () => import('./pages/api/send-test.astro.mjs');
const _page5 = () => import('./pages/api/send-test - copy.astro.mjs');
const _page6 = () => import('./pages/api/subscribe.astro.mjs');
const _page7 = () => import('./pages/api-backup/send-test.astro.mjs');
const _page8 = () => import('./pages/community.astro.mjs');
const _page9 = () => import('./pages/community/_---slug_.astro.mjs');
const _page10 = () => import('./pages/dmca.astro.mjs');
const _page11 = () => import('./pages/forgot-password.astro.mjs');
const _page12 = () => import('./pages/hub.astro.mjs');
const _page13 = () => import('./pages/hub/_---slug_.astro.mjs');
const _page14 = () => import('./pages/login.astro.mjs');
const _page15 = () => import('./pages/posts/post-1.astro.mjs');
const _page16 = () => import('./pages/preview/newsletter.astro.mjs');
const _page17 = () => import('./pages/privacy-terms.astro.mjs');
const _page18 = () => import('./pages/pulse.astro.mjs');
const _page19 = () => import('./pages/pulse/_---slug_.astro.mjs');
const _page20 = () => import('./pages/pulse - 12232025-3.38p.m..astro.mjs');
const _page21 = () => import('./pages/settings.astro.mjs');
const _page22 = () => import('./pages/signup.astro.mjs');
const _page23 = () => import('./pages/stack/tools/_slug_.astro.mjs');
const _page24 = () => import('./pages/stack/_slug_.astro.mjs');
const _page25 = () => import('./pages/stack.astro.mjs');
const _page26 = () => import('./pages/transperancy.astro.mjs');
const _page27 = () => import('./pages/update-password.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/auth/callback.ts", _page2],
    ["src/pages/api/auth/set-session.ts", _page3],
    ["src/pages/api/send-test.ts", _page4],
    ["src/pages/api/send-test - Copy.ts", _page5],
    ["src/pages/api/subscribe.ts", _page6],
    ["src/pages/api-backup/send-test.ts", _page7],
    ["src/pages/community/index.astro", _page8],
    ["src/pages/community/[...slug].astro", _page9],
    ["src/pages/dmca.astro", _page10],
    ["src/pages/forgot-password.astro", _page11],
    ["src/pages/hub/index.astro", _page12],
    ["src/pages/hub/[...slug].astro", _page13],
    ["src/pages/login.astro", _page14],
    ["src/pages/posts/post-1.md", _page15],
    ["src/pages/preview/newsletter.astro", _page16],
    ["src/pages/privacy-terms.astro", _page17],
    ["src/pages/pulse.astro", _page18],
    ["src/pages/pulse/[...slug].astro", _page19],
    ["src/pages/pulse - 12232025-3.38p.m..astro", _page20],
    ["src/pages/settings.astro", _page21],
    ["src/pages/signup.astro", _page22],
    ["src/pages/stack/tools/[slug].astro", _page23],
    ["src/pages/stack/[slug].astro", _page24],
    ["src/pages/stack.astro", _page25],
    ["src/pages/transperancy.astro", _page26],
    ["src/pages/update-password.astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/runner/work/agentic_ai_hub/agentic_ai_hub/dist/client/",
    "server": "file:///home/runner/work/agentic_ai_hub/agentic_ai_hub/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
