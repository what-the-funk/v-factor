import React from "react";
import { connect } from "react-redux";
// import ContentEditable from "react-contenteditable";
import * as UUID from "uuid";
import {
  Provider as SimpleWebRTCProvider,
  Connected,
  Connecting,
  Disconnected,
  Room,
  Video,
  PeerList,
  GridLayout,
  ChatComposers,
  ChatList,
  ChatInput,
} from "@andyet/simplewebrtc";

const { REACT_APP_SIMPLEWEBRTC_API_KEY } = process.env;
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${REACT_APP_SIMPLEWEBRTC_API_KEY}`;

class ViewerRoom extends React.Component {
  render() {
    const { configUrl = CONFIG_URL, roomName } = this.props
    return (
      <SimpleWebRTCProvider configUrl={configUrl}>
        <Connecting>
          <h1>Connecting...</h1>
        </Connecting>

        <Disconnected>
          <h1>Lost connection. Reattempting to join...</h1>
        </Disconnected>

        <Connected>
          <Room name={roomName}>
            {({ room, peers, localMedia, remoteMedia }) => {
              if (!room.joined) {
                return <h1>Joining room...</h1>;
              }

              const remoteVideos = remoteMedia.filter(m => m.kind === "video");

              return (
                <div>
                  <div>
                    <h1>{room.providedName}</h1>
                    <div>
                      <span>
                        {peers.length} Peer{peers.length !== 1 ? "s" : ""}
                      </span>
                      <PeerList
                        room={room.address}
                        speaking
                        render={({ peers }) => {
                          if (peers.length === 0) {
                            return null;
                          }
                          return <span> ({peers.length} speaking)</span>;
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <GridLayout
                        className="videogrid"
                        items={[...remoteVideos]}
                        renderCell={item => <Video media={item} />}
                      />
                    </div>

                    {/* <div>
                <ChatList
                  room={room.address}
                  renderGroup={({ chats, peer }) => (
                    <div key={chats[0].id}>
                      <div>
                        <div>{peer.displayName ? peer.displayName : 'Anonymous'}</div>{' '}
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
                  <ChatComposers room={room.address} />
                </div>
              </div> */}
                  </div>
                </div>
              );
            }}
          </Room>
        </Connected>
      </SimpleWebRTCProvider>
    );
  }
}

// const ViewerRoom = ({ configUrl = CONFIG_URL, roomName }) => (
//   <SimpleWebRTCProvider configUrl={configUrl}>
//     <Connecting>
//       <h1>Connecting...</h1>
//     </Connecting>

//     <Disconnected>
//       <h1>Lost connection. Reattempting to join...</h1>
//     </Disconnected>

//     <Connected>
//       <Room name={roomName}>
//         {({ room, peers, localMedia, remoteMedia }) => {
//           if (!room.joined) {
//             return <h1>Joining room...</h1>;
//           }

//           const remoteVideos = remoteMedia.filter(m => m.kind === "video");

//           return (
//             <div>
//               <div>
//                 <h1>{room.providedName}</h1>
//                 <div>
//                   <span>
//                     {peers.length} Peer{peers.length !== 1 ? "s" : ""}
//                   </span>
//                   <PeerList
//                     room={room.address}
//                     speaking
//                     render={({ peers }) => {
//                       if (peers.length === 0) {
//                         return null;
//                       }
//                       return <span> ({peers.length} speaking)</span>;
//                     }}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div>
//                   <GridLayout
//                     className="videogrid"
//                     items={[...remoteVideos]}
//                     renderCell={item => <Video media={item} />}
//                   />
//                 </div>

//                 {/* <div>
//               <ChatList
//                 room={room.address}
//                 renderGroup={({ chats, peer }) => (
//                   <div key={chats[0].id}>
//                     <div>
//                       <div>{peer.displayName ? peer.displayName : 'Anonymous'}</div>{' '}
//                       <span>{chats[0].time.toLocaleTimeString()}</span>
//                     </div>
//                     {chats.map(message => (
//                       <div key={message.id}>{message.body}</div>
//                     ))}
//                   </div>
//                 )}
//               />
//               <div>
//                 <ChatInput room={room.address} placeholder="Send a message..." />
//                 <ChatComposers room={room.address} />
//               </div>
//             </div> */}
//               </div>
//             </div>
//           );
//         }}
//       </Room>
//     </Connected>
//   </SimpleWebRTCProvider>
// );

export default ViewerRoom;
