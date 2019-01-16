"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: DataTypes.STRING,
      downvotes: DataTypes.INTEGER,
      peers: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    },
  );
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
