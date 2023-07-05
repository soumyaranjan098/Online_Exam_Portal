import React, { useState } from 'react'
import {Container,Form,Button,ButtonGroup,ToggleButton} from 'react-bootstrap'
import CreateQuestionForm from './CreateQuestion';

function CreateExam() {
    const [examName,setExamName] = useState("");
    const [show,setShow] = useState(false)
    const [radioValue, setRadioValue] = useState(false);
    const [time,setTime] = useState( );
    const [examDate,setExamDate] = useState()
    // console.log(radioValue)
    const radios = [
      { name: 'Total 30min', value: false },
      { name: 'One by One', value: true },
    ];

    const handleChange = (e) =>{
      setExamName(e.target.value)
    }
    const handleTime = (e) =>{
      setTime(e.target.value)
    }
    const handleDate = (e) =>{
      setExamDate(e.target.value)
    }

    const examHandler = async(e) => {
      e.preventDefault();
      const exam_name = examName;
      // console.log(exam_name)
      const exam_type = radioValue === 'true';
      const exam_time = time==null? exam_type ? 1 :30 : time ;
      const exam_date = examDate;

      const res = await fetch('/api/exam/createExam',{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({exam_name,exam_type,exam_time,exam_date})
      });

      // const data = await res.json();
      // console.log(res)
      if(res.status === 400 || res.status ===422 || !res){
        window.alert("error occured...")
      }else{
        setShow(true)
      }
    }

    const renderForm = () =>{
      if(show){
        return(
          <CreateQuestionForm examName={examName}/>
        )
       }else{
        return(
          <Container>
          <Form className="registerform">
            <h1>Set Examination Name</h1>
            <h5>Please set a unique Examination name</h5>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                name='name'
                value={examName}
                onChange={handleChange}
              />
            </Form.Group> <br/>
            <h6>The below toggle button is used to set the exam type, 
            If Total 30min is selected then after 30m the form will be auto submitted. 
            If One by One is selected then each quesion will be fetched One by One with 1min. time interval.</h6>
            <ButtonGroup className="mb-2">
         {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value.toString()}
            checked={radioValue === radio.value.toString()}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
          
        ))}
      </ButtonGroup>                        
      {radioValue==='true'?
      <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter The Time Interval in Minutes. Leave this field blank if you want 1min time interval. Do not enter string like sec/min only enter number </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter time"
                name='name'
                value={time}
                onChange={handleTime}
              />
            </Form.Group> : <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter The Total Time In Minutes. Leave this field blank if you want 30min total time. Do not enter string like sec/min only enter number</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter time "
                name='name'
                value={time}
                onChange={handleTime}
              />
            </Form.Group> } <br/>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter Exam Date :</Form.Label>
              <Form.Control
                type="text"
                placeholder="DD/MM/YYYY"
                name='name'
                value={examDate}
                onChange={handleDate}
              />
            </Form.Group> <br/>
            <Button variant="primary" onClick={examHandler}>
              Next
            </Button>
          </Form>
        </Container>
        );
       }
    }

  return (
    <>
       {renderForm()}
    </>
  )
}

export default CreateExam