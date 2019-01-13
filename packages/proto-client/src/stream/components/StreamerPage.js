import React, { Component } from "react";
import { v4 } from "uuid";
import ContentEditable from "react-contenteditable";

import {
  Provider,
  Connected,
  Connecting,
  Disconnected,
  Room,
  RequestUserMedia,
  Video,
  GridLayout,
  ChatList,
  ChatInput,
} from "@andyet/simplewebrtc";

const { REACT_APP_SIMPLEWEBRTC_API_KEY } = process.env;

// const params = new URLSearchParams(window.location.search);

// if (!params.get('room')) {
//   // We're using a UUID for a random room name here, but that is
//   // NOT a requirement for SimpleWebRTC to function.
//   window.location = `/?room=${v4()}`;
// }

class StreamerPage extends Component {
  render() {
    return (
      <Provider
        configUrl={`https://api.simplewebrtc.com/config/guest/${REACT_APP_SIMPLEWEBRTC_API_KEY}`}
      >
        <Connecting>
          <h1>Connecting...</h1>
        </Connecting>

        <Disconnected>
          <h1>Lost connection. Reattempting to join...</h1>
        </Disconnected>

        <Connected>
          <RequestUserMedia audio video auto />
          <Room name={"cacadevaca"}>
            {({ room, peers, localMedia, remoteMedia }) => {
              if (!room.joined) {
                return <h1>Joining room...</h1>;
              }

              const localVideos = localMedia.filter(m => m.kind === "video" && m.shared);

              return (
                <div>
                  <div>
                    <h1>{room.providedName}</h1>
                    <div>
                      <span>
                        {peers.length} Peer{peers.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <GridLayout
                        className="videogrid"
                        items={[...localVideos]}
                        renderCell={item => <Video media={item} />}
                      />
                    </div>

                    <div>
                      <ChatList
                        room={room.address}
                        renderGroup={({ chats, peer }) => (
                          <div key={chats[0].id}>
                            <div>
                              <div>{peer.displayName ? peer.displayName : "Anonymous"}</div>{" "}
                              <span>{chats[0].time.toLocaleTimeString()}</span>
                            </div>
                            {chats.map(message => (
                              <div key={message.id}>{message.body}</div>
                            ))}
                          </div>
                        )}
                      />
                      <div>
                        <ChatInput room={room.address} placeholder="Send a message..." />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Room>
        </Connected>
      </Provider>
    );
  }
}

export default StreamerPage;
