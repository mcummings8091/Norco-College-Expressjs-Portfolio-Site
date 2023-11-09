import {
  annotate,
  annotationGroup,
} from "https://unpkg.com/rough-notation?module";

/* Portifolio Annotations */

const titles = document.querySelectorAll(".title");
const descriptions = document.querySelectorAll("#description");

for (let i = 0; i < titles.length; i++) {
  const p1 = annotate(titles[i], {
    type: "underline",
    color: "gold",
    animationDuration: 1000,
  });

  p1.show();
}

for (let i = 0; i < descriptions.length; i++) {
  const p1 = annotate(descriptions[i], {
    type: "bracket",
    brackets: ["left", "right"],
    color: "gold",
    animationDuration: 1000,
  });

  p1.show();
}

/*
window.onload = function () {
  const title = document.getElementById("title");
  if (title) {
    const annotation = annotate(title, {
      type: "highlight",
      color: "gold",
      animationDuration: 1000,
    });
    // const portfolioa = annotationGroup([annotation])
    annotation.show();
  } else {
    console.error("Element not found");
  }
};
*/
