This repo hosts supporting files/scripts for my blog https://damien.zone. 

# content

## a script to easily edit the CSS of a bear blog

See more details/explanation here https://damien.zone/hacking-together-a-local-css-editing-workflow-on-bear/

### usage

0. `npm install`
1. Edit `./scripts/bear-hot-reload/server.ts` so `BEAR_BLOG_URL` and `CSS_FILE` match your bearblog's URL/css filename.
2. `npm run css`
3. open https://localhost:3000 in your browser

# disclaimer

- code provided for educational value
- i'm not responsible if you hose something with it
- you are asked to not be weird about the content of the repo nor reproduce the files as your own
