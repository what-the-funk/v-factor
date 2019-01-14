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
  RequestUserMedia,
  RequestDisplayMedia,
  RemoteAudioPlayer,
  MediaControls,
  UserControls,
  Video,
  PeerList,
  GridLayout,
  ChatComposers,
  ChatList,
  ChatInput,
} from "@andyet/simplewebrtc";

import { getRandomRoomApiCall } from "../data/actions";

const { REACT_APP_SIMPLEWEBRTC_API_KEY } = process.env;
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${REACT_APP_SIMPLEWEBRTC_API_KEY}`;

class Viewer extends React.Component {
  async componentDidMount() {
    const { roomName, getRandomRoom } = this.props;
    if (!roomName) {
      getRandomRoom()
    }
  }

  render() {
    const { configUrl = CONFIG_URL, roomName } = this.props;

    if (!roomName) return null;

    return (
      <SimpleWebRTCProvider configUrl={configUrl}>
        {/* <RemoteAudioPlayer /> */}

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

                    {/* <div>
                      {/* {!!!localScreens.length && <RequestDisplayMedia />}
                    {!!localScreens.length && (
                    <MediaControls
                      media={localScreens[0]}
                      autoRemove
                      render={({ stopSharing }) => (
                        <button onClick={stopSharing}>Stop Screenshare</button>
                      )}
                    />
                      )}
                    </div>
                    <UserControls
                      render={({ user, isMuted, mute, unmute, setDisplayName }) => (
                        <div>
                          <ContentEditable
                            html={user.displayName}
                            onChange={event => {
                              setDisplayName(event.target.value.trim());
                            }}
                          />
                          <button onClick={() => (isMuted ? unmute() : mute())}>
                            {isMuted ? 'Unmute' : 'Mute'}
                          </button>
                        </div>
                      )}
                    /> */}
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

const mapStateToProps = state => ({
  roomName: state.stream.getRoom.success,
});
const mapDispatchToProps = dispatch => ({
  getRandomRoom: () => dispatch(getRandomRoomApiCall()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
