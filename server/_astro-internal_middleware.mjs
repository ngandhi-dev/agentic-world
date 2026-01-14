import { d as defineMiddleware, s as sequence } from './chunks/index_BUhmJY8-.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_B0QoGjT6.mjs';
import 'piccolore';
import './chunks/astro/server_DSnOUyyP.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, request } = context;
  if (url.pathname === "/login" || url.pathname.startsWith("/api/")) {
    return next();
  }
  const at = cookies.get("auth-a")?.value;
  const rawCookieHeader = request.headers.get("cookie") || "EMPTY_HEADER";
  console.log(`[Middleware] Path: ${url.pathname}`);
  console.log(`[Middleware] Raw Header: ${rawCookieHeader}`);
  console.log(`[Middleware] Auth Found: ${!!at || rawCookieHeader.includes("auth-a")}`);
  if (!at && !rawCookieHeader.includes("auth-a")) {
    return redirect("/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
