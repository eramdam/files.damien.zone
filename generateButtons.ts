import { URL } from "url";
import fs from "node:fs";
import path from "node:path";
import slug from "slug";
import { finished } from "stream/promises";
import { Readable } from "stream";
import assert from "assert";
import { buttonDefinitions, IMAGE_ROOT } from "./buttonsDef";

(async () => {
  if (!fs.existsSync("./public/buttons")) {
    fs.mkdirSync("./public/buttons");
  }

  let html = ``;

  for (const buttonDef of buttonDefinitions) {
    let buttonHtml = ``;
    let imageSrc = buttonDef.src;
    if (URL.parse(buttonDef.src) && buttonDef.link) {
      const parsedUrl = URL.parse(buttonDef.src) as URL;
      imageSrc = await downloadFile(
        buttonDef.src,
        buttonDef.filename ?? getFilenameFromURL(parsedUrl)
      );
    } else {
      assert(
        fs.existsSync(buttonDef.src),
        `There is no file for ${buttonDef.src}`
      );
    }
    buttonHtml += `<img class="pixel" loading="lazy" src="${IMAGE_ROOT}${imageSrc}" title="${buttonDef.name}" alt="${buttonDef.name}" />`;
    if (buttonDef.link) {
      buttonHtml += `<a href="${buttonDef.link}" target="_blank" rel="noreferrer noopener" title="${buttonDef.name}">${buttonHtml}</a>`;
    }

    html += buttonHtml;
  }

  console.log(html);
})();

async function downloadFile(url: string, filename: string) {
  const res = await fetch(url);
  const destination = path.resolve("./public/buttons/", filename);
  const fileStream = fs.createWriteStream(destination);
  // @ts-expect-error too lazy to fix that thing, dude
  await finished(Readable.fromWeb(res.body!).pipe(fileStream));

  return destination.replace(__dirname, "").replace("/public", "");
}

function getFilenameFromURL(url: URL) {
  return path.basename(url.pathname);
}
