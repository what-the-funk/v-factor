const db = require("../models");

const getRoom = name => db.Room.findOne({ where: { name } });
const createRoom = name => db.Room.create({ name });
const deleteRoom = name => db.Room.destroy({ where: { name } });
const getRandomRoom = () => db.Room.findOne({ order: db.sequelize.random() });

const downvoteRoom = name => db.Room.increment(["downvotes"], { where: { name } });

module.exports = {
  createRoom,
  downvoteRoom,
  getRoom,
  getRandomRoom,
  deleteRoom,
};
