import React, { useState } from 'react'
import {Row,Col,Container,Button,ButtonGroup} from 'react-bootstrap'
import AllStudents from '../Components/Admin/AllStudents'
import CreateExam from '../Components/Admin/CreateExam'
import './../Css/Admin.css'
import AllExam from '../Components/Admin/AllExam'
import Register from '../Components/Admin/Register'

function AdminScreen() {
    const [currentComponet,setCurrentComponent] = useState(<AllStudents/>)
  return (
    <>
        <Container>
        <Row className='row'>
        <h1 className="text-center bg-dark text-light p-2">Admin Panel</h1>
          <Col md={2}>
            <ButtonGroup vertical style={{ minHeight: "400px" }}>
              <Button onClick={() => setCurrentComponent(<Register/>)}>
                Create Students
              </Button>
              <Button onClick= {() => setCurrentComponent(<AllStudents/>)}>
                All Stuedents
              </Button>
              <Button  onClick={() => setCurrentComponent(<CreateExam/>)}>
                Create Exam
              </Button>
               <Button onClick={() => setCurrentComponent(<AllExam/>)}>
                All Exams
              </Button> 
            </ButtonGroup>
          </Col>
            <Col md={9}>
                {/* <Routes>
                  <Route path='/admin/' element={<UserList/>}>
                  <Route path='/admin/userlist' element={<UserList/>} />
                  <Route path="/admin/pizzalist" element={<PizzasList/>}  />
                  <Route path="/admin/addnewpizza" element={<AddNewPizza/>}  />
                  <Route path="/admin/orderlist" element={<OrderList/>}  />
                  </Route>
                </Routes> */}
               
              
                {currentComponet}
                
            </Col>
        </Row>
       </Container>
    </>
  )
}

export default AdminScreen