const express = require("express");
const router = express.Router();
const roomClient = require("../lib/roomClient");

router.post("/", async (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  console.log(JSON.stringify(req.body));

  const { roomName } = req.body;
  let newRoom;

  try {
    newRoom = await roomClient.createRoom(roomName);
    // console.log("newRoom: ", newRoom);
    res.status(201);
    res.send(newRoom);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
});

router.get("/", async (req, res, next) => {
  let room;

  try {
    room = await roomClient.getRandomRoom();
    // console.log("room: ", room);
    res.status(200);
    res.send(room);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send(err);
  }
});

router.delete("/:roomName", async (req, res, next) => {
  if (!req.params) return res.sendStatus(400);
  console.log(JSON.stringify(req.params));

  const { roomName } = req.params;

  try {
    await roomClient.deleteRoom(roomName);
    res.status(200);
    res.json({ status: "OK" });
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send(err);
  }
});

router.put("/:roomName", async (req, res, next) => {
  if (!req.params) return res.sendStatus(400);
  console.log(JSON.stringify(req.params));

  const { roomName } = req.params;

  try {
    let newRoom;
    // todo: refactor when followers are added, use findAndUpdateOrCreate
    if (req.body.downvotes) {
      if (req.body.downvotes !== 1) return res.sendStatus(400);
      newRoom = await roomClient.downvoteRoom(roomName);
    } else {
      newRoom = await roomClient.createRoom(roomName);
    }
    // console.log("newRoom: ", newRoom);
    res.status(201);
    res.send(newRoom);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
