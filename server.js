var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const creds = require("./credential.json");
const url =
  "mongodb://" +
  creds.user +
  ":" +
  creds.pass +
  "@ds253918.mlab.com:53918/webdev";
app.use(express.static(path.join(__dirname, "front-end/build")));
console.log(url);

function findDocument(db, callback) {
  const c = db.collection("parcial");
  c.find().toArray((err, docs) => {
    if (err) throw err;

    callback(docs);
  });
}

function getData(callback) {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db("webdev");

    findDocument(db, callback);
    client.close();
  });
}

function postPartida(db, callback, receta) {
  const col = db.collection("parcial");
  col.save(receta, err => {
    if (err) throw err;
    callback(receta);
  });
}

function postPart(callback, receta) {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db("webdev");

    postPartida(db, callback, receta);
    client.close();
  });
}

app.post("/api/postPartida", (req, res) => {
  console.log("entro");
  postPart(r => res.send(r), req.body);
});

/*
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
}); */

app.get("/api", (req, res)=> {
  console.log("api general");
  getData(function(data) {
    res.send(data);
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

app.listen(3001, () => {
  console.log("Listening on:3001");
});
