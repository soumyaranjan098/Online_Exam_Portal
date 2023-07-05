import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import {getAllUser} from '.././../Actions/userAction'
import Loader from '../Loader';
import Error from '../Error';
function AllStudents() {

    const userState = useSelector((state) => state.getAllUserReducer);
    const { loading, error, users } = userState;
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getAllUser());
        }, [dispatch]);
// console.log(users)

return (
    <>
    <h1>Student List</h1>
      {loading && <Loader/>}
      {error && <Error error="Error While Fetching Users" />}
        <Table>
            <thead>
                <tr>
                    <th>Registraion Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {users && 
                users.map((user)=>(
                    <tr key={user._id}>
                        <td>{user.registration_no}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>edit/delete</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
  )
}

export default AllStudents