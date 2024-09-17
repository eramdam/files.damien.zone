import Fastify from "fastify";
import { parse } from "node-html-parser";
import liveServer from "live-server";
import fs from "fs";
import path from "path";

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
  const finalDestination = new URL(request.url, "https://damien.zone");
  const htmlRes = await fetch(finalDestination);
  const htmlPayload = await htmlRes.text();
  const parsedPage = parse(htmlPayload);

  parsedPage.querySelectorAll("style").forEach((s) => {
    s.remove();
  });

  parsedPage.querySelector("head")?.insertAdjacentHTML(
    "beforeend",
    `
  <link href="http://127.0.0.1:8181/damien.zone.css" rel="stylesheet" />  
  ${INJECTED_CODE}
  `
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