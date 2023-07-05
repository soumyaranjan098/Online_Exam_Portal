import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'; 
import { getAllQuestions } from '../../Actions/examAction';
import Loader from '../Loader';
import Error from '../Error';
import { Table } from 'react-bootstrap';

function QuestionsPage(exam_id) {
    const dispatch = useDispatch();
    const questiondata = useSelector((state)=>state.getAllQuestionsReducer);
    const {Questions,loading,error} = questiondata;

    // console.log(Questions[0])
    // console.log(exam_id)
     useEffect(()=>{
         dispatch(getAllQuestions(exam_id))
     },[])
  return (
    <>
        <div style={{paddingLeft:"6rem",paddingRight:"6rem",paddingTop:"2rem"}}>
            {loading && <Loader/> }
            {error && <Error/>}
            <Table>
                <thead>
                    <tr>
                        <th>No of quesion</th>
                        <th>Questions</th>
                        <th>edit/delete</th>
                    </tr>
                </thead>
                <tbody>
                {Questions && Questions[0].questions.map((question,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                            <div>
                                <h4 style={{color:"blue",textShadow:"2px 3px 2px lightgray",fontFamily:"sans-serif "}}>{question.title}</h4>
                                {question.options.map((option,optionIndex)=>(
                                    <h6 key={optionIndex}>{optionIndex+1}) {option}</h6>
                                ))}
                                <h6 style={{color:"green",textShadow:"2px 3px 2px lightgray"}}>correct answer {question.answer+1}</h6>
                            </div>
                        </td>
                        <td>edit</td>
                    </tr>
            )
            )}
                </tbody>
            </Table>
        </div>
    </>
  );
}

export default QuestionsPage