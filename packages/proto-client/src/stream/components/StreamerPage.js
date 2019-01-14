import React from "react";
import { connect } from "react-redux";
// import ContentEditable from "react-contenteditable";
import * as UUID from "uuid";
import { withRouter } from "react-router-dom";

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

const { REACT_APP_SIMPLEWEBRTC_API_KEY } = process.env;
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${REACT_APP_SIMPLEWEBRTC_API_KEY}`;

class Streamer extends React.Component {
  componentDidMount() {
    const { history, match } = this.props;
    const roomName = match.params.room;
    if (!roomName) {
      history.push(`/stream/${UUID.v4()}`);
    }
  }

  render() {
    const { configUrl = CONFIG_URL, userData, match } = this.props;
    const roomName = match.params.room;
    const roomPassword = match.params.key || "";

    if (!roomName) return null;

    return (
      <SimpleWebRTCProvider configUrl={configUrl} userData={userData}>
        {/* <RemoteAudioPlayer /> */}

        <Connecting>
          <h1>Connecting...</h1>
        </Connecting>

        <Disconnected>
          <h1>Lost connection. Reattempting to join...</h1>
        </Disconnected>

        <Connected>
          <RequestUserMedia audio video auto />
          <Room name={roomName} password={roomPassword}>
            {({ room, peers, localMedia, remoteMedia }) => {
              if (!room.joined) {
                return <h1>Joining room...</h1>;
              }

              const remoteVideos = remoteMedia.filter(m => m.kind === "video");
              const localVideos = localMedia.filter(m => m.kind === "video" && m.shared);
              const localScreens = localVideos.filter(m => m.screenCapture);

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
                        items={[...localVideos, ...remoteVideos]}
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Streamer));
