import buttonsJson from "./buttonConfig.json";
import fs from "node:fs";

export type ButtonDef = {
  link: string | undefined;
  name: string;
  src: string;
  filename?: string;
};

// If you're re-using this script, change this.
export const IMAGES_HOST = buttonsJson.host;

// If you're re-using this script, change this.
export const buttonDefinitions = buttonsJson.buttons as ButtonDef[];

export function updateButtonConfig(buttons: ButtonDef[]) {
  return fs.writeFileSync(
    "./scripts/buttons/buttonConfig.json",
    JSON.stringify(
      {
        host: IMAGES_HOST,
        buttons,
      },
      null,
      2
    ),
    "utf-8"
  );
}
