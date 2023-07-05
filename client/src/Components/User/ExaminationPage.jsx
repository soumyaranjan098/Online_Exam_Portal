import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'; 
import { getAllQuestions, getExamById } from '../../Actions/examAction';
import { useParams,useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import "./../../Css/ExaminationPage.css"


const ExaminationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AllQuestions = useSelector((state)=>state.getAllQuestionsReducer);
  const {Questions} = AllQuestions;
  const getExam = useSelector((state)=> state.getExamByIdReducer)
  const {Allexam} = getExam;
  // console.log(Allexam)
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const[isOn,setIsOn] = useState(false);
  const[questions,setQuestions] = useState([]);
  const[answer,setAnswer] = useState([]);
  const[currentIndex,setCurrentIndex] = useState(0);
  const[examTime,setExamTime] = useState(null)
  const examId = useParams();
  const [completed,setCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  //  console.log(examId);

  const submitExam = async() => {
    let currentTime = new Date();
    console.log(currentTime);
    console.log(answer)
    const per = calculateCorrectPercentage();
    console.log(per)
    await fetch('/api/result/setResult',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({exam_id:examId.exam_id,answers:answer,percentage: per})
    });
    setIsExamCompleted(true);
  }

  useEffect(()=>{
    if(completed){
      submitExam();
    }
  },[completed])
// console.log(answer)
useEffect(() => {
  let timer;
  if (examTime !== null) {
    // console.log(examTime)
    const time = examTime;
    if (!isOn) {
      let currentTime = new Date();
      console.log(currentTime);
      timer = setTimeout(()=>{
        setCompleted(true)
      }, examTime*60000); // Submit exam after specified time
    } else {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === questions.length - 1) {
            clearInterval(timer);
            // submitExam() // Call submitExam when all questions are answered
            setCompleted(true);
          } else {
            let currentTime = new Date();
            console.log(currentTime);
            return (prevIndex + 1) % questions.length;
          }
        });
      }, time*60000); // Switch to next question every specified time
    }
    // Update remaining time every second
    const endTime = new Date().getTime() + examTime * 60000;
    timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - new Date().getTime()) / 1000));
      setRemainingTime(remaining);
    }, 1000);
    
  }
  

  return () => {
    clearTimeout(timer);
    clearInterval(timer);
  };
}, [isOn, questions, examTime,currentIndex]);


  

  useEffect(()=>{
    dispatch(getAllQuestions(examId))
    dispatch(getExamById(examId))
  },[dispatch,examId])

  useEffect(()=>{
    if(Allexam && Questions){
      setIsOn(Allexam.exam_type)
      setQuestions(Questions[0].questions);
      setAnswer(new Array(Questions[0]?.questions.length).fill(null));
      setExamTime(Allexam.exam_time)
    }
  },[Allexam,Questions]);

  //  console.log(questions)
  //  console.log(isOn)

  //  const handleOptionSelect = (index,optionIndex) => {
  //   const updatedAnswer  = [...answer];
  //   updatedAnswer[index] = optionIndex;
  //   setAnswer(updatedAnswer);
  //  }
   const handleOptionSelect = (index, optionIndex) => {
    // console.log(index,optionIndex);
    setAnswer((prevAnswer) => {
        console.log(prevAnswer)
      const updatedAnswer = [...prevAnswer];
      updatedAnswer[index] = optionIndex;
        // console.log(updatedAnswer)
      return updatedAnswer;
    });
  };



   const calculateCorrectPercentage = () => {
    const totalQuestions = questions.length;
    const correctAnswers = answer.filter(
      (answer, index) => answer === questions[index].answer
    ).length;
    // console.log(correctAnswers);
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2);
  };

   const handleGoBack = () => {
    navigate('/home')
  };

   // Helper function to format time
   const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(
      2,
      '0'
    )}`;
  };

  return (
   <>
    <div className='examdiv'>
    { 
    Questions == null ? <Loader/> :
    isExamCompleted ? (
        <div>
          <h3>Exam is completed</h3>
          <h4>Result : {calculateCorrectPercentage()}%</h4>
          <button onClick={handleGoBack}>Go back to homepage</button>
        </div>
      ) 
      :
    !isOn ? (
      <div className='allquestiondiv'>
      {/* Display remaining time in allquestiondiv */}
      {remainingTime !== null && <div style={{textAlign:"end",marginBottom:"1rem"}} >Remaining Time: {formatTime(remainingTime)} seconds</div>}
         {questions && questions.map((quesion,index)=>(
          <div className='allq'>
          <h3>{index+1}) {quesion?.title}</h3>
          {quesion?.options.map((option,optionIndex)=>(
            <div style={{marginLeft:"2rem"}}>
            <label key={optionIndex} className='leb'>
              <input
                type='radio'
                name={`option-${index}`}
                value={optionIndex}
                checked={answer[index] === optionIndex}
                onChange={() => handleOptionSelect(index,optionIndex)}
              />
              {option}
            </label><br/>
            </div>
          ))}
          </div>
          
        ))}
        {/* <input type='submit' onClick={submitExam}/> */}
        </div>
    ) : (
      <div className='singlequestiondiv'>
      {remainingTime !== null && <div style={{textAlign:"end",marginBottom:"1rem"}}>Remaining Time: {remainingTime} seconds</div>}
          <h3>{currentIndex+1}) {questions[currentIndex]?.title}</h3>
          {questions[currentIndex]?.options.map((option, optionIndex) => (
            <div style={{marginLeft:"2rem"}}>
            <label className='lev' key={optionIndex}>
              <input
                type="radio"
                name={`question-${currentIndex}`}
                value={optionIndex}
                checked={answer[currentIndex] === optionIndex}
                onChange={() => handleOptionSelect(currentIndex,optionIndex)}
              />
              {option}
            </label><br/>
            </div>
          ))}
        </div>
    )
   }
    </div>   
   </>
  );
};

export default ExaminationPage;
