const pool = require("../../config/database");

module.exports = {
  addAnswer: (data, callback) => {
    pool.query(
      `INSERT INTO answer(answer_text, question_id, user_id)VALUES(?, ?, ?)`,
      [data.answer, data.questionId, data.user_id],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },

  // getAnswers: (questionID, callback) => {
  //   const query = `
  //     SELECT
  //       answer_id, answer_text, question_id, registration.user_id, registration.user_name
  //     FROM answer
  //     LEFT JOIN registration ON answer.user_id = registration.user_id
  //     WHERE answer.question_id = ?
  //   `;
  //   const values = [questionID];

  //   pool.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error in getAnswers:", err);
  //       return callback(err);
  //     }
  //     callback(null, result);
  //   });
  // },
  getAnswers: (questionID, callback) => {
    console.log(questionID);
    pool.query(
      `SELECT answer_id, answer_text, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id =?`,
      [questionID],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
};

// SELECT * FROM answer WHERE question_id = ?
//   `SELECT answer_id, answer_text, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ${questionID}`,
