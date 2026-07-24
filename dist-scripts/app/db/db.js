"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/lib/db.ts
var sequelize_1 = require("sequelize");
var mysql2 = require("mysql2");
var sequelize = (_a = global._sequelize) !== null && _a !== void 0 ? _a : new sequelize_1.Sequelize('peertopic', 'root', '', {
    dialect: 'mysql',
    port: 3306, // default MySQL port
    logging: false, // set to console.log for SQL debug
    dialectModule: mysql2,
    dialectOptions: {
        socketPath: '/tmp/mysql.sock',
    },
});
exports.sequelize = sequelize;
if (process.env.NODE_ENV !== 'production') {
    global._sequelize = sequelize;
}
