import React, { useState } from 'react'
import { Navbar,Container,Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import QuestionsPage from './QuestionsPage'
import { useParams } from 'react-router-dom'
import Results from './ResultsPage'

function ExamPage() {
  const examID = useParams();
  const {exam_id} = examID; 
  const [state,setState] = useState(<QuestionsPage exam_id={exam_id}/>);
  
  return (
    <>
        <Navbar bg="dark" variant='dark'  expand="lg">
      <Container>
       <LinkContainer to={"/admin/dashboard"}>
       <Navbar.Brand >{"<-Back"}</Navbar.Brand>
       </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          {/* <LinkContainer to="/" activeClassName="">
            <Nav.Link>Questions</Nav.Link>
          </LinkContainer> */}
          <Button style={{backgroundColor:"transparent", border:"none"}} onClick={()=> setState(<QuestionsPage exam_id={exam_id}/>)} >Questions</Button>
          <Button style={{backgroundColor:"transparent", border:"none"}} onClick={()=>setState(<Results exam_id={exam_id}/>)}>Student Marks</Button>
          {/* <LinkContainer to="/about" activeClassName="">
            <Nav.Link>Student Marks</Nav.Link>
          </LinkContainer> */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div style={{backgroundColor:"lightcyan",minHeight:"90vh", width:"100%"}}>
      {state}
    </div>
    </>
  )
}

export default ExamPage