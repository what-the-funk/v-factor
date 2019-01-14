const db = require("../models");

const getRoom = name => db.Room.findOne({ where: { name } });

const createRoom = name => db.Room.create({ name });

const deleteRoom = name => db.Room.destroy({ where: { name } });

const getRandomRoom = () => db.Room.findOne({ order: db.sequelize.random() });

module.exports = {
  createRoom,
  getRoom,
  getRandomRoom,
  deleteRoom,
};
