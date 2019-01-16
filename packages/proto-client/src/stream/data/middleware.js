import axios from "axios";

const peersMiddleware = store => {
  let peersLength = 0;
  let timerStart;

  return next => async action => {
    if (action.type.includes("@andyet") && window.location.pathname.includes("stream")) {
      const { simplewebrtc } = store.getState();
      const newPeersLength = Object.keys(simplewebrtc.peers).length;
      const room = Object.values(simplewebrtc.rooms)[0];

      if (room && newPeersLength !== peersLength) {
        const roomName = room.providedName;
        peersLength = newPeersLength;
        let updatedRoom;

        try {
          const response = await axios({
            method: "put",
            url: `/api/rooms/${roomName}`,
            data: { peers: peersLength },
          });
          updatedRoom = response.data;
        } catch (error) {
          console.log(error);
        }

        if (updatedRoom.peers < updatedRoom.downvotes) {
          const now = new Date();
          if (!timerStart) {
            timerStart = now;
          }

          if (now - timerStart >= 30 * 1000) {
            // todo: build a new page for "lost your spot!" and force the streamer to leave
            window.location.assign(`${window.location.origin}/`);
          }
        } else {
          timerStart = null;
        }
      }
    }

    return next(action);
  };
};

export default peersMiddleware;
