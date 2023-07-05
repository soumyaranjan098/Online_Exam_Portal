import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getResultByExamId } from '../../Actions/examAction';
import { getAllUser } from '../../Actions/userAction';
import Loader from '../Loader';
import Error from '../Error';
import { Table } from 'react-bootstrap';
import ResultData from './ResultData';

function Results(exam_id) {
  const dispatch = useDispatch();
  const resultdata = useSelector((state) => state.getResultByExamIdReducer);
  const { Result } = resultdata;
  // const userData = useSelector((state) => state.getUsersByIdReducer);
  // const { students, loading, error } = userData;
  const userData = useSelector((state) => state.getAllUserReducer);
  const { users, loading, error } = userData;
  const [sortedStudents, setSortedStudents] = useState([]);
  // console.log(Result)
  useEffect(() => {
    dispatch(getResultByExamId(exam_id));
  }, []);

  useEffect(() => {
    if (Result != null) {
      // const user_ids = Result.map((result) => result.user_id);
      // dispatch(getUsersById(user_ids));
      dispatch(getAllUser());
    }
  }, [Result,dispatch]);

  // useEffect(() => {
  //   if (students.length > 0) {
  //     const sorted = [...students].sort((a, b) => a.registration_no - b.registration_no);
  //     setSortedStudents(sorted);
  //   }
  // }, [students]);
  useEffect(() => {
    if (users.length > 0) {
      const sorted = [...users].sort((a, b) => a.registration_no - b.registration_no);
      setSortedStudents(sorted);
    }
  }, [users]);

  return (
    <>
      <div>
        {loading && <Loader />}
        {error && <Error />}

        <div style={{paddingLeft:"6rem",paddingRight:"6rem",paddingTop:"2rem"}}>
          <Table>
            <thead>
              <tr>
                <th>Name Of Student</th>
                <th>Registration No</th>
                <th>Mark</th>
                <th>Review Answers</th>
              </tr>
            </thead>
            <tbody>
              {Result && sortedStudents.map((student) => {
                const res = Result.find((result) => result.user_id === student._id);
         
                const percentage = res !== undefined ? res.percentage !== undefined ? res.percentage : null : null; 
               
                const answers = res !== undefined ? res.answers !== undefined ? res.answers : null : null; 

                return (
                  <ResultData student={student} answers={answers} exam_id={exam_id} percentage={percentage} />
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Results;
