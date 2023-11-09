import {
  annotate,
  annotationGroup,
} from "https://unpkg.com/rough-notation?module";

const points = document.getElementById("description");
const h1 = document.getElementById("h1");
const link = document.getElementById("link");

const p1 = annotate(h1, {
  type: "underline",
  color: "gold",
  animationDuration: 1000,
});

const p2 = annotate(points, {
  type: "bracket",
  brackets: ["left", "right"],
  color: "gold",
  animationDuration: 1000,
});

const p3 = annotate(link, {
  type: "circle",
  color: "gold",
  animationDuration: 1000,
});

p1.show();
p2.show();
p3.show();
