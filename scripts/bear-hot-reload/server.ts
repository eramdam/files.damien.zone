import Fastify from "fastify";
import { parse } from "node-html-parser";
import liveServer from "live-server";
import fs from "node:fs";
import path from "node:path";

const BEAR_BLOG_URL = "https://damien.zone";
const CSS_FILE = "damien.zone.css";
const SCRIPT_FILE = "scripts.js";

const fastify = Fastify();

const INJECTED_CODE = fs
  .readFileSync(path.join(__dirname, "./injected.html"))
  .toString();

liveServer.start({
  port: 8181,
  root: "public/",
  open: false,
});

fastify.get("*", async (request, reply) => {
  const finalDestination = new URL(request.url, BEAR_BLOG_URL);
  const htmlRes = await fetch(finalDestination);
  const htmlPayload = await htmlRes.text();
  const parsedPage = parse(htmlPayload);

  parsedPage.querySelectorAll("style").forEach((s: HTMLStyleElement) => {
    s.remove();
  });

  parsedPage
    .querySelectorAll("link[rel=stylesheet]")
    .forEach((s: HTMLLinkElement) => {
      if (s.getAttribute("href")?.startsWith("/")) {
        s.setAttribute("href", `${BEAR_BLOG_URL}${s.getAttribute("href")}`);
      }
    });

  parsedPage.querySelectorAll("script").forEach((s: HTMLScriptElement) => {
    if (s.getAttribute("src")?.endsWith(SCRIPT_FILE)) {
      s.remove();
    }
  });

  parsedPage
    .querySelector("head")
    ?.insertAdjacentHTML(
      "beforeend",
      `<link href="http://127.0.0.1:8181/${CSS_FILE}" rel="stylesheet" />  ${INJECTED_CODE}`
    );

  parsedPage
    .querySelector("footer")
    ?.insertAdjacentHTML(
      "beforeend",
      `<script src="http://127.0.0.1:8181/${SCRIPT_FILE}" type="text/javascript" />`
    );

  const finalPayload = parsedPage.toString();

  reply.header("content-type", "text/html; charset=utf8");
  return reply.send(finalPayload);
});

(async () => {
  try {
    console.log("Listening on http://127.0.0.1:3000");
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
