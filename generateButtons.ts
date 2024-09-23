import assert from "assert";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "stream";
import { finished } from "stream/promises";
import { URL } from "url";
import {
  buttonDefinitions,
  IMAGES_HOST,
  updateButtonConfig,
} from "./buttonsDef";

(async () => {
  if (!fs.existsSync("./public/buttons")) {
    fs.mkdirSync("./public/buttons");
  }

  let html = ``;

  for (let buttonDef of buttonDefinitions) {
    let buttonHtml = ``;
    let imageSrc = buttonDef.src;
    if (URL.parse(buttonDef.src) && buttonDef.link) {
      const parsedUrl = URL.parse(buttonDef.src) as URL;
      imageSrc = await downloadFile(
        buttonDef.src,
        buttonDef.filename ?? getFilenameFromURL(parsedUrl)
      );
      buttonDef.src = `./public${imageSrc}`;
    } else {
      assert(
        fs.existsSync(buttonDef.src),
        `There is no file for ${buttonDef.src}`
      );
      imageSrc = imageSrc.replace("./public/", "/");
    }
    buttonHtml += `<img class="pixel" decoding="async" loading="lazy" src="${IMAGES_HOST}${imageSrc}" title="${buttonDef.name}" alt="${buttonDef.name}" />`;
    if (buttonDef.link) {
      buttonHtml = `<a href="${buttonDef.link}" target="_blank" rel="noopener" title="${buttonDef.name}">${buttonHtml}</a>`;
    }

    html += buttonHtml;
  }

  console.log(html);
  updateButtonConfig(
    buttonDefinitions.toSorted((a, b) => {
      return a.name.localeCompare(b.name);
    })
  );
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
