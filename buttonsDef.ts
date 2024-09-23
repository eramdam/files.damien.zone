export type ButtonDef = {
  link: string | undefined;
  name: string;
  src: string;
  filename?: string;
};

// If you're re-using this script, change this.
export const IMAGE_ROOT = "https://files.damien.zone/buttons/";

// If you're re-using this script, change this.
export const buttonDefinitions: ButtonDef[] = [
  {
    link: undefined,
    name: "I was on cohost",
    src: "./public/buttons/i-was-on-cohost.gif",
  },
  {
    link: "https://cdrom.ca/",
    name: "CD-ROM journal",
    src: "./public/buttons/cdromjournal.png",
  },
  {
    link: "https://capstasher.neocities.org/88x31collection-page1",
    name: "the largest 88x31 collection",
    src: "./public/buttons/the-largest-88x31-collection-2.png",
  },
  {
    link: "https://renkotsuban.com",
    name: "Midnight Reading: Renkon's Personal Site",
    src: "http://renkotsuban.com/button.gif",
    filename: "renkotsuban.gif",
  },
  {
    link: "https://jkap.io",
    name: "jae kaplan",
    src: "https://files.crime.team/site/jkap-88x31.gif",
    filename: "jkap.gif",
  },
  {
    link: "https://blog.someplace-else.xyz/",
    name: "someplace elsewhere",
    src: "https://natclayton.uk/wp-content/uploads/2024/09/elsewhere.gif",
  },
  {
    link: "https://wavebeem.com",
    name: "wavebeem.com",
    src: "https://wavebeem.com/button.gif",
    filename: "wavebeem.gif",
  },
];
