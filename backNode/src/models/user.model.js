import sequelize from "sequelize";
import connect from "../config/Postgreconnect.js";

const User = connect.define(
  "users",
  {
    userId: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    access: {
      type: sequelize.STRING,
      allowNull: false,
    },
    group: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true },
);

export default User;
