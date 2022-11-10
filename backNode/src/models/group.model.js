import sequelize from "sequelize";
import connect from "../config/Postgreconnect.js";

const Group = connect.define(
  "groups",
  {
    groupId: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { underscored: true },
);

export default Group;
