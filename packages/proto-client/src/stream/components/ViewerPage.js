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

// import ViewerRoom from "./ViewerRoom";
import { getRandomRoomApiCall, downvoteRoomApiCall } from "../data/actions";

const { REACT_APP_SIMPLEWEBRTC_API_KEY } = process.env;
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${REACT_APP_SIMPLEWEBRTC_API_KEY}`;

class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.handleDownvote = this.handleDownvote.bind(this);
  }

  componentDidMount() {
    const { roomName, getRandomRoom } = this.props;
    if (!roomName) {
      getRandomRoom();
    }
  }

  shouldComponentUpdate(nextProps) {
    const { roomName } = this.props;
    return roomName !== nextProps.roomName;
  }

  handleDownvote() {
    const { roomName, downvoteRoom } = this.props;
    downvoteRoom(roomName).then(() => {
      // todo: find a better way
      window.location.reload(true);
    });
  }

  render() {
    const { configUrl = CONFIG_URL, roomName } = this.props;

    if (!roomName) return null;

    return (
      <div>
        <button onClick={this.handleDownvote}>Downvote</button>
        <SimpleWebRTCProvider configUrl={configUrl}>
          <Connecting>
            <h1>Connecting...</h1>
          </Connecting>

          <Disconnected>
            <h1>Lost connection. Reattempting to join...</h1>
          </Disconnected>

          <Connected>
            <Room name={roomName}>
              {({ room, remoteMedia, ...rest }) => {
                if (!room.joined) {
                  return <h1>Joining room...</h1>;
                }

                const remoteVideos = remoteMedia.filter(m => m.kind === "video");

                return (
                  <div>
                    <div>
                      <h1>{room.providedName}</h1>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.stream.getRoom.success,
});
const mapDispatchToProps = dispatch => ({
  getRandomRoom: () => dispatch(getRandomRoomApiCall()),
  downvoteRoom: roomName => dispatch(downvoteRoomApiCall(roomName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
