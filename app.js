const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();

/* Database initialization */

const db = new sqlite3.Database("formData.db", (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Connected!");
});

var createTable = `
    CREATE TABLE IF NOT EXISTS formData (
        ID INTEGER PRIMARY KEY,
        Name TEXT,
        Email TEXT,
        Message TEXT
    );
`;

var createUserTable = `
    CREATE TABLE IF NOT EXISTS Users (
        ID INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        role TEXT
    );
`;

// var droptable = `DROP TABLE Users;`;

db.run(createTable);
db.run(createUserTable);

/*
db.run(droptable, (err) => {
  if (err) {
    console.error("Error: ", err);
  } else {
    console.log("Table dropped");
  }
});
*/

/* End Database Section */

PORT = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
});

// Contact page
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/pages/form.html");
});

/* Contact Submission handling */

app.post("/submit", (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };

  const sql = "INSERT INTO formData (Name, Email, Message) VALUES (?, ?, ?)";
  const values = [formData.name, formData.email, formData.message];

  const selectQuery = "SELECT * FROM formData";
  const insertedId = this.lastID;

  db.run(sql, values, (err) => {
    if (err) {
      console.error("Error:", err);
    }
    console.log("Form data saved successfully");

    // Query inserted data
    db.get(selectQuery, [insertedId], (err, row) => {
      if (err) {
        console.error("Error querying data:", err.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Inserted data:", row);
        console.log("Form data saved successfully");
        res.render("results", { formData: formData });
      }
    });
  });
});

/* End Contact submission section */

// Registration page
app.get("/register", (req, res) => {
  res.render("registration");
});

/* User registration handling */

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO Users (username, password, role ) VALUES (?, ?, ?)";
  const values = [username, hashedPassword, role];

  db.run(sql, values, (err) => {
    if (err) {
      console.error("Error:", err);
      console.log("User data failed to save");
    }
    console.log("user data saved");
  });
});

/* End user registration */

// login page
app.get("/login", (req, res) => {
  res.render("login", {
    message: "",
  });
});

/* Login handling */

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.get(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    async (err, row) => {
      if (err) {
        console.error("Error:", err);
      }

      if (row && (await bcrypt.compare(password, row.password))) {
        if (row.role === "admin") {
          res.render("admin");
        } else {
          res.render("login", {
            message: "You do not have permission to access this page",
          });
        }
      } else {
        res.render("login", { message: "Incorrect username or password" });
      }
    }
  );
});

/* Projects templates */

const projects = [
  {
    name: "Webflow Screenshotter",
    description:
      "A screenshotting tool made using JavaScript and Puppeteer. Take fullpage screenshots of any webflow template. Optional features to screenshot full section elements, specific elements, or fullpage screenshots of all pages connected to the site.",
    technologies: ["Javascript", "Node.js", "Puppeteer"],
  },
  {
    name: "React Portfolio",
    description:
      " A Portfolio site made using React for routing and component creation. A combination of Bootstrap and styled-componets CSS to handle styling.",
    technologies: [
      "React",
      "Typescript",
      "JavaScript",
      "Bootstrap",
      "styled-components",
    ],
  },
];

// Portfolio Page
app.get("/portfolio", (req, res) => {
  res.render("portfolio", { projects: projects });
});

// Individual project pages
app.get("/projects/:project", (req, res) => {
  const project = projects.find((p) => p.name === req.params.project);
  if (project) {
    res.render(`projects/${project.name}`, { project: project });
  } else {
    res.status(404).send("Project not found");
  }
});

/* End projects section */

/* Webflow screenshot demo handling */

async function scrollUpDown(page, height) {
  // Scroll to bottom of page
  const viewportHeight = page.viewport().height;
  let viewportIncr = 0;
  while (viewportIncr + viewportHeight < height) {
    await page.evaluate((_viewportHeight) => {
      window.scrollBy(0, _viewportHeight);
    }, viewportHeight);
    await wait(80);
    viewportIncr = viewportIncr + viewportHeight;
  }

  // Scroll back to top
  await page.evaluate((_) => {
    window.scrollTo(0, 0);
  });

  // Some extra delay to let images load
  await wait(100);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

app.post("/screenshot", async (req, res) => {
  const url = "https://" + req.body.url;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const bodyHandle = await page.$("body");
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  await scrollUpDown(page, height);

  await page.screenshot({ path: "screenshot.png", fullPage: true });

  await browser.close();

  res.redirect("/screenshot");
});

app.get("/screenshot", (req, res) => {
  const screenshotPath = path.join(__dirname, "screenshot.png");
  res.sendFile(screenshotPath);
});

/* End Screenshot handling */

app.listen(PORT, () => {
  console.log("Server up on port 3000");
});
