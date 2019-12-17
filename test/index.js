const DATABASE = () => {
  const mysql = require('mysql2');
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'guo',
    charset: 'utf8'
  });
};

function wrapPromise(connection, sql) {
  return new Promise((res, rej) => {
    connection.query(sql, function(error, results, fields) {
      if (error) {
        rej(error);
      }
      res(results);
    });
  });
}

exports.main_handler = async (event, context, callback) => {
  const connection = DATABASE();
  let result = await wrapPromise(connection, `SELECT * FROM admin`);
  console.log('result: ', result);
};
