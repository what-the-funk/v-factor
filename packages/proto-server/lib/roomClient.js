const db = require("../models");

const getRoom = name => db.Room.findOne({ where: { name } });
const createRoom = name => db.Room.create({ name });
const deleteRoom = name => db.Room.destroy({ where: { name } });
const getRandomRoom = () => db.Room.findOne({ order: db.sequelize.random() });
const updateRoom = (modifications, name) => getRoom(name).then(room => room.update(modifications));

const downvoteRoom = name => db.Room.increment(["downvotes"], { where: { name } });

module.exports = {
  getRoom,
  createRoom,
  deleteRoom,
  getRandomRoom,
  updateRoom,
  downvoteRoom,
};
