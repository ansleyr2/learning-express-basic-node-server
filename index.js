import express from "express";

import data from "./data/data.json";

const app = express();
const PORT = 3000;

// this is for the public folder on path /
app.use(express.static("public"));

// method to use json
//app.use(express.json());

// method to use urlencoded
app.use(express.urlencoded({ extended: true }));

// this is for images folder on path images
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  // res.send(`A get request with / route on port ${PORT}`);
  res.json(data);
});

// JSON data
// {"hello":"JSON is  cool"}
// URLencoded data
// hello=URLEncoded+is+cool

app.post("/newItem", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get(
  "/item/:id",
  (req, res, next) => {
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
  },
  (req, res) => {
    console.log("Did you get the right data?");
  }
);

// Routing: chaining
app
  .route("/item")
  .get((req, res) => {
    // throw new Error();
    res.send(`A get request with /item route on port ${PORT}`);
  })
  .put((req, res) => {
    res.send(`A put request with /item route on port ${PORT}`);
  })
  .delete((req, res) => {
    res.send(`A delete request with /item route on port ${PORT}`);
  });

// app.put("/item", (req, res) => {
//   res.send(`A put request with /item route on port ${PORT}`);
// });

// app.delete("/item", (req, res) => {
//   res.send(`A delete request with /item route on port ${PORT}`);
// });

// Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Red alert! ${err.stack}`);
});

app.listen(PORT, () => {
  console.log(`NOde Express server listening on port ${PORT}`);
  // console.log(data);
});
