const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  user: "forum",
  password: "123456789",
  database: "forum",
  connectionLimit: 10,
});

pool.getConnection(function (err, connection) {
  console.log("database connected");
});

// let registration = `CREATE TABLE IF NOT EXISTS registration(
//   user_id INT AUTO_INCREMENT, 
//   user_name VARCHAR(255) NOT NULL, 
//   user_email VARCHAR (255) NOT NULL, 
//   user_password VARCHAR(255) NOT NULL, 
//   PRIMARY KEY(user_id)
//   )`;

// pool.query(registration, (err, results) => {
//   if (err) throw err;
//   console.log("registrtion table created");
// });

// let profile = `CREATE TABLE IF NOT EXISTS profile(
//   user_profile_id INT AUTO_INCREMENT,
//   user_id INT NOT NULL,
//   first_name VARCHAR (255) NOT NULL, 
//   last_name VARCHAR (255) NOT NULL,
//   PRIMARY KEY( user_profile_id ),
//   FOREIGN KEY(user_id)REFERENCES registration(user_id)
// )`;

// pool.query(profile, (err, results) => {
//   if (err) throw err;
//   console.log("profile, table created");
// });

// let question = `CREATE TABLE if not exists question(
//   question_id int auto_increment,
//   question varchar(255) not null,
//   question_description varchar(255) not null,
//   question_code_block varchar(255) DEFAULT '',
//   tags varchar(255) not null,
//   user_id int not null,        
//   PRIMARY KEY (question_id),
//   FOREIGN KEY (user_id) REFERENCES registration(user_id)
// )`;

// pool.query(question, (err, results) => {
//   if (err) throw err;
//   console.log("question, table created");
// });

// let answer = `CREATE TABLE IF NOT EXISTS answer (
//     answer_id INT AUTO_INCREMENT,
//     answer_text VARCHAR(255) NOT NULL,
//     user_id INT NOT NULL,
//     question_id INT NOT NULL,
//     PRIMARY KEY (answer_id),
//     FOREIGN KEY (user_id) REFERENCES registration(user_id),
//     FOREIGN KEY (question_id) REFERENCES question(question_id)
//     )`;

// pool.query(answer, (err, results) => {
//   if (err) throw err;
//   console.log("answer, table created");
// });

// module.exports = pool;

let registration = `CREATE TABLE if not exists registration(
  user_id int auto_increment,
  user_name varchar(255) not null,
  user_email varchar(255) not null,
  user_password varchar(255) not null,
  PRIMARY KEY (user_id),
  UNIQUE KEY (user_name)
  )`;
let profile = `CREATE TABLE if not exists profile(
  user_profile_id int auto_increment,
  user_id int not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,        
  PRIMARY KEY (user_profile_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question(
  question_id int auto_increment,
  question varchar(255) not null,
  question_description varchar(255) not null,
  question_code_block varchar(255),
  tags varchar(255),
  user_id int not null,        
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let answer = `CREATE TABLE if not exists answer(
  answer_id int auto_increment,
  answer varchar(255) not null,
  answer_code_block varchar(255),
  user_id int not null, 
  question_id int not null,       
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log('registration table created');
})
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log('profile table created');
})
pool.query(question, (err, results) => {
  if (err) throw err;
  console.log('question table created');
})
pool.query(answer, (err, results) => {
  if (err) throw err;
  console.log('answer table created');
})
module.exports = pool;

