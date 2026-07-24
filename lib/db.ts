// src/lib/db.ts
import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';

declare global {
  // This keeps the Sequelize instance stable across hot reloads
  // eslint-disable-next-line no-var
  var _sequelize: Sequelize | undefined;
}

const sequelize =
  global._sequelize ??
  new Sequelize('peertopic', 'root', '', {
    dialect: 'mysql',
    port: 3306, // default MySQL port
    logging: false, // set to console.log for SQL debug
    dialectModule: mysql2,
    dialectOptions: {
      socketPath: '/tmp/mysql.sock',
    },
  });

if (process.env.NODE_ENV !== 'production') {
  global._sequelize = sequelize;
}

export { sequelize };
