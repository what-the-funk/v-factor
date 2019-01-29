import express from "express";
import { ExpressPeerServer } from "peer";
import { readFileSync } from "fs";
import path from "path";
import https from "https";

const app = express();
const port = 9000; // default port to listen
const options = { debug: true };
const pathToCerts = (name: string) =>
  readFileSync(path.resolve(__dirname, "..", "certs", `${name}.dev.pem`));
const httpsOptions = { key: pathToCerts("key"), cert: pathToCerts("cert") };

// start the Express server
const expressServer = https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("Express + Peer listening on port 3000! 🔥 https://localhost:3000/");
});

// start the Peer server
const peerServer = ExpressPeerServer(expressServer, options);

peerServer.on("connection", (id: string) => {
  console.log("peer connection -> ", id);
});

peerServer.on("disconnect", (id: string) => {
  console.log("peer disconnect -> ", id);
});

// define a route handler for the healthcheck
app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.use("/api", peerServer);
