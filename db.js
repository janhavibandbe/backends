const mysql = require('mysql2');
const {dbconstants} = require('./env');
require('dotenv').config();

const pool = mysql.createPool({
  host: dbconstants.MYSQL_HOST,
  user: dbconstants.MYSQL_USER,
  database: dbconstants.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = pool;