import React, { useEffect, useState } from 'react';
import { Button, Table,Modal, Row } from 'react-bootstrap';
import { getAllExams } from '../../Actions/examAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import { useNavigate } from 'react-router-dom';
import { getResultByUserIds } from '../../Actions/examAction';
import { getAllQuestions } from '../../Actions/examAction';


function UserHome() {
  const dispatch = useDispatch();
  const examState = useSelector((state) => state.getExamReducer);
  const { loading, error, Allexam } = examState;
  const navigate = useNavigate();

  const [results, setResults] = useState({});
  const [answers,setAnswers] = useState({});

  const UserData = useSelector((state) => state.getResultByUserIdsReducer);
  const {Results} = UserData;
  const QuestionsData = useSelector((state) => state.getAllQuestionsReducer);
  const { Questions } = QuestionsData;

  const [show, setShow] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);


  const handleReviewClick = (examId) => {
    setSelectedExamId(examId);
    setShow(true);
  };
  
const handleReviewClose = () => {
  setShow(false);
};

useEffect(()=>{
  if(selectedExamId !== null){
    dispatch(getAllQuestions({"exam_id":selectedExamId}));
  }
},[selectedExamId,dispatch])

  // console.log(Results);
  // const fetchResult = async (exam_id) => {
  //   const res = await fetch('/api/result/getResultByUserId', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ exam_id }),
  //   }).then((data) => { return data.json()});

  //   // console.log(res[0].percentage)
  //   return res[0]?.percentage ?? null;
  // };

  /////////////////////////// Fetching All exam details //////////////////

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  // useEffect(() => {
  //   if (Allexam) {
  //     Allexam.forEach((exam) => {
  //       fetchResult(exam._id)
  //         .then((result) => {
  //           setResults((prevState) => ({
  //             ...prevState,
  //             [exam._id]: result,
  //           }));
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching result:', error);
  //           setResults((prevState) => ({
  //             ...prevState,
  //             [exam._id]: null, // Set null for the exam ID if there is an error
  //           }));
  //         });
  //     });
  //   }
  // }, [Allexam]);

  ////////////////////////////   Fetching Students Result/////////////////////
  useEffect(()=>{
    if(Allexam){
      const user_ids = Allexam.map((exam)=> exam._id);
      dispatch(getResultByUserIds(user_ids))
    }
  },[Allexam,dispatch])
  
  ///////////////////////         Getting the results Array     ////////////////////
  useEffect(()=>{
    if(Allexam && Results){
      const examResult={};
      const answerData = {};
      Allexam.forEach((exam)=>{
        const result = Results.find((result)=> {
          if(result === null){
            return null;
          }else{
            return result.exam_id === exam._id;
          }
         
        })
        examResult[exam._id] = result ? result.percentage : null;
        answerData[exam._id] = result ? result.answers : null;
      });
      //  console.log(examResult)
      // console.log(answerData)
      setResults(examResult);
      setAnswers(answerData);
    }
  },[Allexam,Results])
//  console.log(results)


  return (


    <>
      
        {loading && <Loader />}
        {error && <Error error="Error While Fetching Users" />}
        <div style={{ padding: '6rem', backgroundColor:"white" }}>
        <Table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Teacher Name</th>
              <th>Exam Date</th>
              <th>Start Exam</th>
              <th>Result</th>
              <th>Review Answers</th>
            </tr>
          </thead>
          <tbody>
            {Allexam &&
              Allexam.map((exam) => (
                <tr key={exam._id}>
                  <td>{exam.exam_name}</td>
                  <td>{exam.teacher_name}</td>
                  <td>{exam.exam_date}</td>
                  <td>
                    {results[exam._id] === null ? <Button onClick={() => navigate(`/examination/${exam._id}`)}>Start</Button> : "Completed"}
                  </td>
                  <td>{results[exam._id] === null ? 'Not Available' : results[exam._id]}</td>
                  <td>{results[exam._id] === null ? 'Not Available' : <Button onClick={()=>handleReviewClick(exam._id)}>Review</Button>}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* {showReviewModal && <ReviewResult exam_id={{"exam_id":selectedExamId}} answers={answers} handleClose={handleReviewClose} />} */}
      {show && 
        <Modal
        size="lg"
         show={show}
         onHide={handleReviewClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Correct Answer is displayed in <span style={{color:"green"}}>Green colour</span> and worng answer given by Student is displayed in <span style={{color:"red"}}>Red colour</span> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Questions &&
           Questions[0].questions.map((question,index)=>(
            <div key={index} style={{boxShadow:"2px 2px 5px gray",marginBottom:"1rem",padding:"1rem"}}>
              <Row>
                <h4 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontFamily:"sans-serif "}}>{index+1} : {question.title}</h4>
                {question.options.map((option,optionIndex)=>{
                  const isCorrect = question.answer === optionIndex;
                  const isAnswered = answers[selectedExamId] !== undefined ? answers[selectedExamId][index] === optionIndex : null;
                  return(
                    <div>
                      <h5 style={{color : isCorrect ? "green" : isAnswered ? "red" : "inherit"}}>{option}</h5>
                    </div>
                  )
                })}
                 {answers[selectedExamId] !== undefined && answers[selectedExamId][0] === null || answers[selectedExamId][index] ===null ? (
          <h6 style={{color:"red"}}>Not answered</h6>
        ) : null} 
        {/* {answers[selectedExamId] !== undefined ? console.log(answers[selectedExamId]) : null} */}
              </Row>
            </div>
           ))
           }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}

export default UserHome;
