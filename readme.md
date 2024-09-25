# files.damien.zone

This repo hosts supporting files/scripts for my blog https://damien.zone

# content

## a script to easily edit the CSS of a bear blog

See more details/explanation here https://damien.zone/hacking-together-a-local-css-editing-workflow-on-bear/

### usage

0. `npm install`
1. Edit `./scripts/bear-hot-reload/server.ts` so `BEAR_BLOG_URL` and `CSS_FILE` match your bearblog's URL/css filename.
2. `npm run css`
3. open https://localhost:3000 in your browser

## a quick way to generate the HTML for the buttons on my [links](https://damien.zone/links) page

0. `npm install`
1. Edit `./scripts/buttons/buttonConfig.json` following this format

```jsonc
{
  // where the buttons will be hosted
  "host": "https://files.damien.zone",
  "buttons": [
    {
      // the target of the link (can be null if the button isn't meant to link anywhere)
      "link": "https://damien.zone",
      // will be used as the alt/title attribute on the button
      "name": "Damien Erambert",
      // either a local OR a remote path (will be fetched + updated after running the script)
      "src": "./public/buttons/damiendotzone.gif",
      // final filename for the button
      "filename": "damiendotzone.gif",
    },
  ],
}
```

2. `npm run make-buttons` a first time, which will:

- download the buttons and update the `src` field with the local file path
- re-order the buttons by alphabetical order

3. `npm run make-buttons` a second time. Copy the HTML code logged into the console

# disclaimer

- code provided for educational value
- i'm not responsible if you hose something with it
- you are asked to not be weird about the content of the repo nor reproduce the files as your own
