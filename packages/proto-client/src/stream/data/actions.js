import axios from "axios";

export const createRooomError = error => ({
  type: "CREATE_ROOM_ERROR",
  payload: error,
});

export const createRooomSuccess = () => ({
  type: "CREATE_ROOM_SUCCESS",
});

export const deleteRooomError = error => ({
  type: "DELETE_ROOM_ERROR",
  payload: error,
});

export const deleteRooomSuccess = () => ({
  type: "DELETE_ROOM_SUCCESS",
});

export const createRooomApiCall = roomName => dispatch => {
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
    .then(json => {
      dispatch(createRooomSuccess());
    })
    .catch(err => {
      console.log(err);
      dispatch(createRooomError(err.message));
    });
};

export const deleteRooomApiCall = roomName => dispatch => {
  return axios({
    method: "delete",
    url: `/api/rooms/${roomName}`,
    config: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  })
    .then(json => {
      dispatch(deleteRooomSuccess());
    })
    .catch(err => {
      console.log(err);
      dispatch(deleteRooomError(err.message));
    });
};
