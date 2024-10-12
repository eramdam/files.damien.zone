(() => {
  const mainPost = document.querySelector("body.post > main");
  // If we're not on a post page, nothing to do.
  if (!mainPost) {
    return;
  }

  // Insert the "target" chirpy HTML snippet
  mainPost.insertAdjacentHTML(
    "beforeend",
    '<div data-chirpy-theme="system" data-chirpy-comment="true" id="chirpy-comment"></div>'
  );
  // Make and insert the actual chirpy bootstrapper script element
  const script = document.createElement("script");
  script.setAttribute("data-chirpy-domain", "damien.zone");
  script.setAttribute("src", "https://chirpy.dev/bootstrapper.js");
  mainPost.insertAdjacentElement("beforeend", script);
})();
