// search
const searchForm = document.querySelector("div#searchform");
if (searchForm) {
  console.log("searchForm:", searchForm);
  searchForm.style.setProperty("display", "flex");
  searchForm.style.setProperty("justify-content", "center");
} else {
  console.log("Element with id 'searchform' not found.");
}

const searchFormElement = document.querySelector("form#tsf");

if (searchFormElement) {
  searchFormElement.style.setProperty(
    "background-color",
    "orange",
    "important"
  );
  searchFormElement.style.setProperty("width", "23vw", "important");
}

// navigation
// const navigationElement = document.querySelector('[role="navigation"]');
// const navigationElement = document.querySelector(".YNk70c");
// const navigationElement = document.querySelector(".sBbkle .P3mIxe");
const navigationElement = document.querySelector(
  "div#cnt > .rfiSsc.YNk70c > .sBbkle.P3mIxe"
);

navigationElement.style.setProperty("display", "none", "important");
navigationElement.remove();

setInterval(() => {
  const navigationElement = document.querySelector("div.sBbkle.P3mIxe");
  if (navigationElement) {
    navigationElement.style.setProperty("grid-column", "13/-1", "important");
  }
}, 100);

// results
const resultsParent = document.querySelector("div#rcnt");
if (resultsParent) {
  resultsParent.style.setProperty("display", "flex", "important");
  resultsParent.style.setProperty("justify-content", "center", "important");
}
