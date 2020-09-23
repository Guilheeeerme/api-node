const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

connection.connect((error) => {
  if (error) console.log(`Erro ao tentar conectar no MySQL ${error}`);
  else console.log("Conectado ao MySQL");
});

module.exports = connection;
