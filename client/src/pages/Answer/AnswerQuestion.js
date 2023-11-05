import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/Context";
import QuestionsList from "../AskQuestion/QuestionList";

const AnswerQuestion = (props) => {
  let { questionId } = useParams();

  // console.log(typeof questionId);
  // questionId = parseInt(questionId?.slice(1, 2));
  // questionId = parseInt(questionId);
  const [userData, setUserData] = useContext(UserContext)
 console.log(userData);
  const [answer, setAnswer] = useState({});
  const [prevAnswers, setPrevAnswers] = useState();

  // get access to the data on state
  const location = useLocation();
  const { question, currentUserId } = location.state;
  console.log("Location data", question);

  const handleChange =  (e) => {
    console.log(e.target.value);
   setAnswer({
      answer: e.target.value,
      questionId: question.question_id,
      userId: currentUserId,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(answer);

      const answerRes=await axios.post("http://localhost:4000/api/Answer/", {
        answer: answer.answer,
        questionId:questionId,
        user_id: userData.user.id,
      });

      console.log(">>>>> post answer 1");
      console.log(">>>>>>>>  your answer is submitted");
      window.location.reload(false);
    } catch (error) {
      console.log("Answers can't be submitted: ", error);
    }
  };

  useEffect(() => {
    // setAskedQuestion(question);
    const fetchAnswers = async () => {
      const answers = await axios.get(
        `http://localhost:4000/api/Answer/${questionId}`
      );

      console.log(answers.data);
      console.log(answers.data.data);
      setPrevAnswers(() => {
        return answers.data?.data;
      });
      console.log(">>>>>>prevAnswers ", prevAnswers);
    };
    try {
      fetchAnswers();

      console.log(">>>>> Successfully fetched answers.");
    } catch (err) {
      console.log(">>>>> Can't fetch answers.");
    }
  }, []);
  return (
    <div className="relative top-4 ms-8">
      <div className=" p-4">
        <div className="">
          <p className="text-xl font-semibold">Question</p>
          <p className="text-sm font-medium">{question?.question}</p>
          <p className="text-xs pb-6">{question?.question_description}</p>
        </div>

        <div className="mb-4">
        {prevAnswers?.length != 0 && <h4 className=" text-xl font-semibold">Answer From the Community</h4>}
        </div>
        <div className="answer__list">
          <div className="">
            {prevAnswers?.map((prevAnswer) => (
              <div key={prevAnswer.answerId}>
                <QuestionsList show={prevAnswer} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-40 ">
        <div className="text-center">
          <div className=" text-sm font-semibold ">
            Answer The top Question
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="answerext text-xs font-semibold mb-4">
            Go to Question page
          </Link>
        </div>
        <div className="answer__form">
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              name="answerField"
              placeholder="Your Answer ..."
              className="border border-gray-300 rounded-xl w-full h-28 p-2 resize-none"
            />

            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md text-xs">
              Post your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------

//   let params = useParams();
//   console.log(params);
//   const [userData, setUserData] = useContext(UserContext);
//   const [post, setPost] = useState({});
//   const [form, setForm] = useState({});
//   const [answer, setAnswer] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   console.log(userData.singleQuestion);
//   useEffect(() => {
//     if (!userData.user) {
//       navigate("/login");
//     }
//     const fetch = async () => {
//       const response = await axios.get( // Changed from post to get
//         `http://localhost:4000/api/questions/${params.question_id}`,
//         {
//           answer_id: userData.singleQuestion.question_id,
//         }
//       );
//       setPost(response.data.data);
//     };
//     fetch();
//   }, [userData.user]);

//   useEffect(() => {
//     const get = async () => {
//       const res = await axios.post( // Changed from post to get
//         "http://localhost:4000/api/Answers/questionId",
//         {
//           answer_id: userData.singleQuestion.question_id,
//         }
//       );
//       setAnswer(res.data.data);
//     };
//     get();
//   }, [answer.length]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value }); // Added spread operator
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:4000/api/answer", {
//       answer: form.answer,
//       user_id: userData.user.id,
//       question_id: post.question_id, // Uncomment this line
//     });
//     if (answer.length === 0) {
//       setAnswer([""]);
//       console.log(answer);
//     } else {
//       setAnswer([]);
//     }

//     setForm({ answer: "" });
//   };

//   return (
//     <div className="answer">
//   <hr className="border-t border-gray-300" />
//   <div className="answer__conatiner">
//     <h5 className="text-xl font-bold mb-3">Question</h5>
//     <h5 className="question__line mb-3">{post?.question}</h5>
//     <p className="text-sm text-gray-600 mt-0 mb-4">{post?.question_description}</p>
//     <hr className="border-t border-gray-300" />
//     <h5 className="answer__community mt-4 text-xl font-bold">Answer From The Community</h5>
//     <hr className="border-t border-gray-300" />
//     {answer &&
//       answer?.map((item) => (
//         <div key={item.id} className="answer__info mt-4">
//           <div className="question__icon">
//             <div className="icon flex items-center">
//               <span>
//                 {/* <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} /> */}
//                 <p className="mx-3 text-xl font-bold">{item.user_name}</p>
//               </span>
//             </div>
//             <div className="answer__desc mt-4">{item.answer}</div>
//           </div>
//         </div>
//       ))}

//     <div className="answer__box mt-4">
//       <div className="answer__topQuestion text-xl font-bold">Answer The Top Questions</div>

//       <div className="answer__link link mt-1">
//         <Link to="/" className="text-blue-500 hover:text-blue-700">Go to question page</Link>
//       </div>

//       <form onSubmit={handleSubmit} className="mt-4">
//         <textarea
//           className="question__form w-full p-2 border border-gray-300 rounded mb-4"
//           name="answer"
//           id=""
//           cols="110"
//           rows="10"
//           placeholder="Your Answer here"
//           value={form.answer}
//           onChange={handleChange}
//         ></textarea>
//         <br />
//         <br />
//         <div className="answer__button">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
//             Post Your Answer
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// };

export default AnswerQuestion;
