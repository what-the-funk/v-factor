import axios from "axios";

export const createRoomError = error => ({
  type: "CREATE_ROOM_ERROR",
  payload: error,
});

export const createRoomSuccess = roomName => ({
  type: "CREATE_ROOM_SUCCESS",
  payload: roomName,
});

export const deleteRoomError = error => ({
  type: "DELETE_ROOM_ERROR",
  payload: error,
});

export const deleteRoomSuccess = roomName => ({
  type: "DELETE_ROOM_SUCCESS",
  payload: roomName,
});

export const getRandomRoomError = error => ({
  type: "GET_RANDOM_ROOM_ERROR",
  payload: error,
});

export const getRandomRoomSuccess = roomName => ({
  type: "GET_RANDOM_ROOM_SUCCESS",
  payload: roomName,
});

export const createRoomApiCall = roomName => dispatch => {
  return axios({
    method: "post",
    url: "/api/rooms",
    data: { roomName },
    config: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  })
    .then(({ data }) => {
      dispatch(createRoomSuccess(data.name));
    })
    .catch(err => {
      console.log(err);
      dispatch(createRoomError(err.message));
    });
};

export const deleteRoomApiCall = roomName => dispatch => {
  return axios({
    method: "delete",
    url: `/api/rooms/${roomName}`,
  })
    .then(({ data }) => {
      dispatch(deleteRoomSuccess(data.name));
    })
    .catch(err => {
      console.log(err);
      dispatch(deleteRoomError(err.message));
    });
};

export const getRandomRoomApiCall = () => dispatch => {
  return axios({
    method: "get",
    url: `/api/rooms`,
  })
    .then(({ data }) => {
      dispatch(getRandomRoomSuccess(data.name));
    })
    .catch(err => {
      console.log(err);
      dispatch(getRandomRoomError(err.message));
    });
};
