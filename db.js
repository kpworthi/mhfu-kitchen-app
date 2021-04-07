const mariadb = require('mariadb');
require('dotenv').config();

const pool = 
  mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DABA,
    connectionLimit: process.env.DB_CONN_LIMIT,
    rowsAsArray: true
  });

// Expose a method to establish connection with MariaDB SkySQL
module.exports={
  getConnection: function(){
    return new Promise(function(resolve,reject){
      pool.getConnection().then(function(connection){
        resolve(connection);
      }).catch(function(error){
        reject(error);
      });
    });
  }
} 