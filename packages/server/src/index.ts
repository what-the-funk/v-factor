import express from "express";
import { ExpressPeerServer } from "peer";
import { readFileSync } from "fs";
import path from "path";
import https from "https";

const app: express.Application = express();
const port: number = 9000; // default port to listen
const options = { debug: true };
const pathToCerts = (name: string) =>
  readFileSync(path.resolve(__dirname, "..", "certs", `${name}.dev.pem`));
const httpsOptions = { key: pathToCerts("key"), cert: pathToCerts("cert") };

// start the Express server
const expressServer = https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Express + Peer listening on port ${port}! 🔥 https://localhost:${port}/`);
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
app.get("/ping", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send("pong!");
});

app.use("/peerjs", peerServer);
