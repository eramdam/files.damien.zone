(() => {
  if (document.querySelector("body.post > main")) {
    document
      .querySelector("body.post > main")
      .insertAdjacentHTML(
        "beforeend",
        '<div data-chirpy-theme="system" data-chirpy-comment="true" id="chirpy-comment"></div>'
      );
    const script = document.createElement("script");
    script.setAttribute("data-chirpy-domain", "damien.zone");
    script.setAttribute("src", "https://chirpy.dev/bootstrapper.js");
    document
      .querySelector("body.post > main")
      .insertAdjacentElement("beforeend", script);
  }
})();
