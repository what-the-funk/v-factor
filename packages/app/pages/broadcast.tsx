import React, { PureComponent } from "react";
import { v4 } from "uuid";

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
  peer: any;
  roomId: string = v4();
  localStream: any;
  videoRef: React.RefObject<HTMLVideoElement> = React.createRef();

  async componentDidMount() {
    const peerjs = await import("peerjs");
    const Peer: any = peerjs.default;
    this.peer = new Peer(`${this.roomId}_${v4()}`, signalingServer);
    this.peer.on("connection", this.onConnection);
    this.peer.on("disconnected", this.onDisconnected);
    this.peer.on("close", this.onClose);
    this.peer.on("error", this.onError);

    await this.requestLocalVideo();
  }

  onConnection(connection: any) {
    console.log("connection", connection);
  }

  onDisconnected() {
    console.log("disconnected");
  }

  onClose() {
    console.log("connection closed");
  }

  onError(error: any) {
    console.error(error);
  }

  async requestLocalVideo() {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: true,
    };

    try {
      const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.onReceiveLocalStream(mediaStream);
    } catch (error) {
      console.log("error", error);
    }
  }

  onReceiveLocalStream(stream: MediaStream) {
    const videoElement: HTMLVideoElement = this.videoRef.current as HTMLVideoElement;
    videoElement.srcObject = stream;
  }

  render(): React.ReactNode {
    return (
      <div>
        <Nav />
        <video autoPlay muted ref={this.videoRef} />
      </div>
    );
  }
}
