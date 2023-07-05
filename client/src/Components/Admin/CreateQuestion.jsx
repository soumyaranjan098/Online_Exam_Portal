import React, { useEffect, useState } from 'react';
import { Button,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const CreateQuestionForm = ({examName}) => {
    const navigate = useNavigate();
    // console.log(examName);
    const [questions , setQuestions] = useState([
        {
            title: "",
            options:["","","",""],
            answer:0
        }
    ]);
    const [exam_id ,setExamId] = useState("");
  
    const handleQuestionChange = (index,field,value) =>{
        const updatedQuestion = [...questions];
        updatedQuestion[index][field] = value
        setQuestions(updatedQuestion);
    }

    const handleOptionChange = (index,optionIndex,value) => {
        const updatedQuestion = [...questions];
        updatedQuestion[index].options[optionIndex] = value;
        setQuestions(updatedQuestion)
    }

    const handleDeleteQuestion = (index) =>{
        const updatedQuestion = [...questions];
        updatedQuestion.splice(index,1);
        setQuestions(updatedQuestion);
    }

    const handleAddQuestions = () => {
        const newQuestion = {
            title : "",
            options: ["","","",""],
            answer: 0
        }

        setQuestions([...questions,newQuestion]);
    }

    const examData = async() =>{
        const exam_name = examName;
        try{
            const res = await fetch('/api/exam/getExamByName',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exam_name
                })
            });
            const data = await res.json();
            console.log(data);
            setExamId(data._id)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        examData()
    },[])

    const formSubmit = async(e) =>{
        e.preventDefault();
        try{
            const resp = await fetch('/api/question/addNewQuestion',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({exam_id,questions})
            });
            
            if(resp.status===201){
                window.alert("successfully created..");
                setTimeout(()=>{
                    navigate('/admin/dashboard')
                },10000)
            }else{
                window.alert("error occured..")
            }
        }catch(err){
            console.log(err)
        }
        
    }

    // console.log(exam_id)

  return (
    <>
        <div>
        <h1>{examName}</h1>
            {questions.map((question,index)=>(
                <div key={index}>
                <Form className="registerform">
                <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label><h5>Question {index+1}</h5> </Form.Label>
              <Form.Control
                type="text"
                placeholder="Question Title"
                value={question.title}
                onChange={(e)=> handleQuestionChange(index,'title',e.target.value)}
              />
              </Form.Group>
                {/* <h2>Question {index+1}</h2>
               <input 
                    value={question.title}
                    type='text'
                    placeholder='Question Title'
                    onChange={(e)=> handleQuestionChange(index,'title',e.target.value)}
               /> */}
               {/* <h4>Options:</h4> */}
              {/* {question.options.map((option,optionIndex)=>(
                <div key={optionIndex}> */}
                <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label><h5>Options:</h5> </Form.Label>
              {question.options.map((option,optionIndex)=>(
                <div key={optionIndex}>
              <Form.Control
                type="text"
                placeholder={`Option ${optionIndex+1}`}
                value={option} 
                    onChange={(e)=>handleOptionChange(index,optionIndex,e.target.value) } 
              />
              </div>))}
              </Form.Group>
                {/* <input 
                    type='text'
                    value={option} 
                    onChange={(e)=>handleOptionChange(index,optionIndex,e.target.value) } 
                    placeholder= {`Option ${optionIndex+1}`}
                />
                </div>
                ))} */}
                <Form.Group className="mb-3">
        <Form.Label><h5>Answer:</h5></Form.Label>
        <Form.Select
        value={question.answer}
                onChange={(e)=>handleQuestionChange(index,'answer',parseInt(e.target.value))}
                >
        
        {question.options.map((_,optionIndex)=>(
                    <option key={optionIndex} value={optionIndex} >
                        Option {optionIndex+1}
                    </option>
                ))}
        </Form.Select>
      </Form.Group><br/>
            {/* <h5>Answer:</h5>
            <select
                value={question.answer}
                onChange={(e)=>handleQuestionChange(index,'answer',parseInt(e.target.value))}>
                {question.options.map((_,optionIndex)=>(
                    <option key={optionIndex} value={optionIndex} >
                        Option {optionIndex+1}
                    </option>
                ))}
            </select><br/> */}
            <Button  variant='danger' bg='danger' onClick={()=>handleDeleteQuestion(index)}>DELETE</Button>
            </Form>
            </div>
            ))}
            <Button onClick={handleAddQuestions}>ADD</Button>
            <Button onClick={formSubmit}>Submit</Button>
        </div>
    </>
  );
};

export default CreateQuestionForm;
