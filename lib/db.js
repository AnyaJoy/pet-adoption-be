const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.DB_NAME,
});
exports.pool = pool;

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
exports.query = query;

// I haven't yet found a way to not let postgrator destroy server in production :(
// So I just uncomment for development

// const path = require("path");
// const Postgrator = require("postgrator");
// require("dotenv").config();

// if (process.env.MODE == "development") {
//   const postgrator = new Postgrator({
//     migrationDirectory: path.resolve(__dirname, "../migrations"),
//     driver: "mysql2",
//     host: process.env.HOST,
//     port: 3306,
//     database: process.env.DB_NAME,
//     username: process.env.DB_USERNAME,
//     password: process.env.SQL_PASSWORD,
//     schemaTable: "migrations",
//   });

//   exports.postgrator = postgrator;
// }
