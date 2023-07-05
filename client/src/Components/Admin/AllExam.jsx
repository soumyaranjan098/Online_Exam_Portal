import React, { useEffect } from 'react'
import { getAllExams } from '../../Actions/examAction';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function AllExam() {
    let c=1;

    const dispatch = useDispatch();
    const examState = useSelector((state)=>state.getExamReducer)
    const {loading,error,Allexam} = examState;

    useEffect(()=>{
        dispatch(getAllExams())
    },[dispatch])

  return (
    <>
    <h1>Exam List</h1>
    <h5>Click on the Exam Name to view exam details.</h5>
      {loading && <Loader/>}
      {error && <Error error="Error While Fetching Users" />}
        <Table>
            <thead>
                <tr>
                    <th>Exam Number</th>
                    <th>Exam Name</th>
                    <th>DeleteExam</th>
                </tr>
            </thead>
            <tbody>
                {Allexam && 
                Allexam.map((exam)=>(
                    <tr key={exam._id}>
                        <td>{c++}</td>
                        <td><Link to={`/admin/dashboard/ExamPage/${exam._id}`}>{exam.exam_name}</Link></td>
                        <td>delete</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
  )
}

export default AllExam