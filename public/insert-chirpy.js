(() => {
  document
    .querySelector("body.post > main")
    .insertAdjacentHTML(
      "beforeend",
      `<div data-chirpy-theme="system" data-chirpy-comment="true" id="chirpy-comment"></div><script src="https://chirpy.dev/bootstrapper.js" data-chirpy-domain="damien.zone"></script>`
    );
})();
