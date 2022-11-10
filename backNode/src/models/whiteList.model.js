import sequelize from "sequelize";
import connect from "../config/Postgreconnect.js";
import User from "./user.model.js";

const WhiteList = connect.define(
  "whitelists",
  {
    whiteId: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true },
);
WhiteList.belongsTo(User, {
  foreignKey: "user_id",
});

export default WhiteList;
