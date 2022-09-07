import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.POSTGRESKEY;
const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

export default sequelize;
