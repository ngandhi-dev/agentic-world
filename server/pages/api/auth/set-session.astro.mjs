export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ url, cookies }) => {
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");
  if (!access_token || !refresh_token) {
    return new Response(JSON.stringify({ error: "No tokens" }), { status: 400 });
  }
  const options = {
    path: "/",
    httpOnly: true,
    secure: undefined                          ,
    maxAge: 60 * 60 * 24 * 7
  };
  cookies.set("auth-a", access_token, options);
  cookies.set("auth-r", refresh_token, options);
  return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
