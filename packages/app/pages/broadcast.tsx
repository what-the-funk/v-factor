import React, { PureComponent } from "react";
import { v4 } from "uuid";

import Head from "../src/components/head";
import Nav from "../src/components/nav";

type BroadcastProps = {};

// type BroadcastState {}

const signalingServer = Object.freeze({
  host: process.env.NODE_ENV === "production" ? "my.domain" : "localhost",
  port: process.env.NODE_ENV === "production" ? 443 : 9000,
  path: "/peerjs",
  secure: true,
  config: {
    iceServers: [
      { urls: "stun:stun01.sipphone.com" },
      { urls: "stun:stun.ekiga.net" },
      { urls: "stun:stunserver.org" },
      { urls: "stun:stun.softjoys.com" },
      { urls: "stun:stun.voiparound.com" },
      { urls: "stun:stun.voipbuster.com" },
      { urls: "stun:stun.voipstunt.com" },
      { urls: "stun:stun.voxgratia.org" },
      { urls: "stun:stun.xten.com" },
      {
        urls: "turn:192.158.29.39:3478?transport=udp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        urls: "turn:192.158.29.39:3478?transport=tcp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
    ],
  },
  debug: 2,
});

// export default class Broadcast extends React.Component<BroadcastProps, BroadcastState> {
export default class Broadcast extends PureComponent<BroadcastProps> {
  roomId: string = v4();

  async componentDidMount() {
    // const Peer: any = require("peerjs");
    // until https://github.com/peers/peerjs/issues/479 gets fixed Peer is coming from the Head section
    const Peer: any = (window as any)["Peer"];
    const peer: any = new Peer(`${this.roomId}-${v4()}`, signalingServer);

    // peer.on("connection", this.onConnection);
    // peer.on("disconnected", this.onDisconnected);
    // peer.on("close", this.onClose);
    // peer.on("error", this.onError);

    console.log(`[Room] new peer is `, peer);
  }

  onConnection(connection: any) {
    console.log(connection);
  }

  render(): React.ReactNode {
    return (
      <div>
        <Head title="Home" />
        <Nav />

        <div className="hero">
          <h1 className="title">Welcome to Next!</h1>
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}
