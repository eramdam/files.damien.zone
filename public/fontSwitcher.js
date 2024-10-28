const classes = [
  "source-serif-4",
  // "oswald",
  "fraunces",
  "crimson-pro",
  "eb-garamond",
  "young-serif",
];
const fontKey = "damien.zone-data-font";
function buildAndAddFontSwitcher() {
  document.body.append(
    ...html`
      <select id="fontSwitcher" style="position: absolute; top: 0; left:0;">
        ${classes.map(
          (c) => `<option data-font-option="${c}" value="${c}">${c}</option>`
        )}
      </select>
    `
  );

  function applyFont(fontChoice) {
    document.body.setAttribute("data-font", fontChoice);
    [...document.querySelectorAll("#fontSwitcher option")].forEach((o) => {
      if (o instanceof HTMLOptionElement) {
        o.selected = o.value === fontChoice;
      }
    });
  }

  applyFont(classes[0]);

  document.querySelector("#fontSwitcher").addEventListener("change", (e) => {
    applyFont(e.target.value);
    window.localStorage.setItem(fontKey, e.target.value);
  });

  window.addEventListener("storage", (e) => {
    if (e.key === fontKey) {
      applyFont(e.newValue);
    }
  });
}

function html(strings, ...values) {
  let finalString = "";
  for (let k = 0; k < strings.length; k++) {
    finalString += strings[k];

    const value = values[k];
    if (Array.isArray(value)) {
      finalString += value.join("");
    } else if (value instanceof Element) {
      finalString += value.outerHTML;
    } else if (value === undefined || value === null) {
      // Do not add anything
    } else {
      finalString += value.toString();
    }
  }

  return Array.from(
    new DOMParser().parseFromString(finalString, "text/html").body.childNodes
  );
}
