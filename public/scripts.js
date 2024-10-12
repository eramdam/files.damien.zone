(() => {
  if (
    window.location.host !== "damien.zone" &&
    window.location.host !== "127.0.0.1:3000"
  ) {
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
  script.setAttribute(
    "src",
    "https://comments.friendsofeggbug.org/comentario.js"
  );
  mainPost.insertAdjacentElement("beforeend", script);
})();
