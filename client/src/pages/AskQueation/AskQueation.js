import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/Context';

function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate('/login');
  }, [userData.user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

console.log({
  user_id: userData.user_id,
  question: form.question,
   questionDescription: form.questionDescription,
});
    try {
      await axios.post('http://localhost:4000/api/questions/', {
        user_id: userData.user_id,
        question: form.question,
        question_description: form.questionDescription,
        
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting the question', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-center">Steps to Write a Good Question</h3>
          <ul className="list-disc list-inside ps-20 text-[13px] pb-12">
            <li>Summarize in a one-line title</li>
            <li>Describe in more detail</li>
            <li>Describe what you expect to happen</li>
            <li>Review your question and post</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-center">Ask a public Question</h3>
          <Link to="/" className="ms-40 md:ms-56 text-xs">
            Go to question page
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="question"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Title"
              onChange={handleChange}
            />
            <textarea
              name="questionDescription"
              placeholder="Question Description"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none h-32"
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;



// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../../context/Context';


// function AskQuestion() {
//   const [userData, setUserData] = useContext(UserContext);
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//     useEffect(() => {
//     if (!userData) { 
//       navigate('/login');
//     }
//     // console.log(user);

//   }, [navigate])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log({
//           id: userData.user_id,
//           question: form.question,
//            catagory: form.question_catagory,
//           questionDescription: form.questionDescription,
//         });
//     try {
      
//       const response = await axios.post('http://localhost:4000/api/questions/',
//         {
//           user_id: userData.user_id,
//           question: form.question,
//           catagory: form.question_catagory,
//           questionDescription: form.questionDescription,
//         }
//       );
//       alert(response.data.msg);
//       navigate("/");
//     } catch (err) {
//       alert(err)
//       console.log("problem", err);
//     }
//   };
//   return (
//     <div className="container my-5">
//       <div className="d-flex flex-column align-items-center my-5">
//         <h3>Steps to write a good question</h3>
//         <ul className="question_steps">
//           <li>Summerize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </ul>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="d-flex flex-column p-5 question_form  justify-content-between"
//       >
//         <h3>Ask a public question</h3>
//         <Link to="/" className="text-decoration-none text-reset cursor-pointer">
//           Go to Question page
//         </Link>
//         <input
//           className="question_title"
//           type="text"
//           name="question"
//           placeholder="Title"
//           required
//           onChange={handleChange}
//         />
//         <select
//           className="question_title"
//           name="question_category"
//           onChange={handleChange}
//            required
//         >
//           <option value="">Select category</option>
//           <option value="phase one">Phase One</option>
//           <option value="phase two">Phase Two</option>
//           <option value="phase three">Phase Three</option>
//           <option value="project">Project</option>
//           <option value="other">Other</option>
//         </select>
//         <textarea
//           className="question_input"
//           placeholder="Question Description..."
//           name="questionDescription"
//           onChange={handleChange}
//         ></textarea>
//         <button className="question_post_btn" >
//           Post Your Question
//         </button>
//       </form>
//     </div>
//   );
// }
// export default AskQuestion;