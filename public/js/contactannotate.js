import {
  annotate,
  annotationGroup,
} from "https://unpkg.com/rough-notation?module";

const h1 = document.getElementById("h1");
const user = document.getElementById("user");
const mail = document.getElementById("mail");
const text = document.getElementById("text");
const btn = document.getElementById("btn");

const p1 = annotate(h1, {
  type: "highlight",
  color: "gold",
  animationDuration: 1000,
});

const p2 = annotate(user, {
  type: "underline",
  color: "gold",
  animationDuration: 1000,
});

const p3 = annotate(mail, {
  type: "underline",
  color: "gold",
  animationDuration: 1000,
});

const p4 = annotate(text, {
  type: "underline",
  color: "gold",
  animationDuration: 1000,
});

const p5 = annotate(btn, {
  type: "circle",
  color: "gold",
  animationDuration: 1000,
});

const ag = annotationGroup([p1, p2, p3, p4, p5]);

ag.show();
