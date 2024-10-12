(() => {
  if (window.location.host !== "damien.zone") {
    return;
  }
  const mainPost = document.querySelector("body.post > main");
  // If we're not on a post page, nothing to do.
  if (!mainPost) {
    return;
  }

  mainPost.insertAdjacentHTML(
    "beforeend",
    `<comentario-comments live-update="false" no-fonts="true"></comentario-comments>`
  );

  const script = document.createElement("script");
  script.setAttribute("src", "https://comments.damien.zone/comentario.js");
  mainPost.insertAdjacentElement("beforeend", script);
})();
