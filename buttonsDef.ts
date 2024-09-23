import buttonsJson from "./buttonConfig.json";

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
