import {
  annotate,
  annotationGroup,
} from "https://unpkg.com/rough-notation?module";

const h1 = document.getElementById("hero");
const cert = document.getElementById("cert");
const skills = document.getElementById("skills");
const circle = document.getElementById("circle");

const a1 = annotate(h1, {
  type: "highlight",
  color: "gold",
  animationDuration: 1000,
});

const a2 = annotate(cert, {
  type: "underline",
  color: "gold",
  animationDuration: 1000,
});

const a3 = annotate(circle, {
  type: "circle",
  color: "gold",
  animationDuration: 1000,
});

const a4 = annotate(skills, {
  type: "bracket",
  color: "gold",
  brackets: ["left", "right"],
  strokeWidth: 4,
  animationDuration: 1000,
});

const indexa = annotationGroup([a1, a2, a3, a4]);

indexa.show();

/* Portifolio Annotations */

const title = document.getElementById("title");

const p1 = annotate(title, {
  type: "highlight",
  color: "gold",
  animationDuration: 1000,
});

p1.show();

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
