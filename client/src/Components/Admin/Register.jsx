import React,{useState} from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import { registerUser } from '../../Actions/userAction';
import { useDispatch,useSelector } from 'react-redux'; 
import Loader from '../Loader';
import Success from '../Success';
import Error from '../Error';

function Register() {
  const registerState = useSelector((state)=> state.registerUserReducer);
  const {loading,success,error} = registerState;
  
  const dispatch = useDispatch();

  const[user,setUser]= useState({
    name:'',email:'',mobile:'',registration_no:'',password:'',cpassword:''
  });

  const handleChange = (e) =>{
    setUser({...user,[e.target.name]: e.target.value})
  }
  
  const registerHandler = async(e) =>{
    e.preventDefault();
    const {name,email,mobile,registration_no,password,cpassword} = user;
    if(password !== cpassword){
      alert("Password do not match..")
    }else{
      const newUser = {name,email,mobile,registration_no,password}
      await dispatch(registerUser(newUser));
      setUser({name:'',email:'',password:'',registration_no:'',cpassword:'',mobile:''});
      
    }
  };

  return (
    <>
    {/* {console.log(error)} */}
        <Container style={{width:"100%"}}>
        {loading && <Loader/>}
        {success && <Success success={"Student Registration Successful"} route="login"/>}
        {error && <Error error={`${error.error}`} />}
          <Form className="registerform">
            <h1>Registeration </h1>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                name='name'
                value={user.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name='email'
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter mobile number"
                name='mobile'
                value={user.mobile}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRegistratino_No">
              <Form.Label>Registration_No</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter registration number"
                name='registration_no'
                value={user.registration_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='cpassword'
                value={user.cpassword}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Button variant="primary" onClick={registerHandler}>
              Register
            </Button>
          </Form>
        </Container>
    </>
  )
}

export default Register