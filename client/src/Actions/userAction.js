import axios from "axios";

export const registerUser = (user) => async(dispatch) => {
    // const navigate = useNavigate();
    dispatch({type:"USER_REGISTER_REQUEST"})

    const successHandler = () =>{
        dispatch({type:"USER_REGISTER_SUCCESS"})
    }

     return await axios.post('/api/user/addUser',user).then(successHandler).catch(error => {
        // Deal with the error
        dispatch(errorActionCreator("USER_REGISTER_FAIL", error))
      })
         
};

///////////////Login.//////////////

export const loginUser = (user) => async(dispatch) => {
    // const navigate = useNavigate();
    dispatch({type:"USER_LOGIN_REQUEST"})

    const successHandler = async(res) =>{
        dispatch({type:"USER_LOGIN_SUCCESS"})
        dispatch({type:"LOGIN_SUCCESS"})
         console.log(res.data.user)
         const Data = JSON.stringify(res.data.user)
        // localStorage.setItem( "userData" , Data)
        sessionStorage.setItem("userData",Data)
    }

     return await axios.post('/api/user/login',user).then(successHandler).catch(error => {
        // Deal with the error
        dispatch(errorActionCreator("USER_LOGIN_FAIL", error))
      })
         
};

// export const loginSuccess = (token) => async(dispatch) => {
//     if(token == null || token===undefined){
//         console.log("ffas");
//     }else{
//         const resp = await axios.get('api/user/rootUser').then((res)=>{return res}).catch(error => {
            
//         })
//         dispatch({type:"LOGIN_SUCCESS",payload: resp.data})
//     }
    
//   };
  

////////////////// LogOut  ////////////////////

export const logoutUser = () => async(dispatch) =>{
    dispatch({type:"USER_LOGOUT_REQUEST"})

    const successHandler = () => {
        dispatch({type:"USER_LOGOUT_SUCCESS"});
        dispatch({type:"LOGOUT"});
        dispatch({type:"RESET_SUCCESS"})
        // localStorage.removeItem('userData')
        sessionStorage.removeItem('userData')
         window.location.href = "/";
    }

    return await axios.get('/api/user/logout').then(successHandler).catch(err=>{
        dispatch(errorActionCreator("USER_LOGOUT_FAIL",err))
    })
}
//////////////////// GET ALLUSER  ////////////////
export const getAllUser = () => async(dispatch)=>{

    
    dispatch({type:"GET_USERS_REQUEST"})

    const successHandler = (res) => {
        // console.log(res.data)
        dispatch({type:"GET_USERS_SUCCESS", payload:res.data})
    }

    return await axios.get('/api/user/getAllStudents').then(successHandler).catch(error => {
        dispatch(errorActionCreator("GET_USERS_FAIL",error))
    })
}

// // //////////////////// GET ROOTUSER  ////////////////
// export const getRootUser = () => async(dispatch)=>{
//     // console.log("called")
    
//     dispatch({type:"GET_USER_REQUEST"})

//     const successHandler = (res) => {
//          console.log(res)
        
//         dispatch({type:"GET_USER_SUCCESS", payload:res.data})
//     }

//     return await axios.get('/api/user/rootUser').then(successHandler).catch(error => {
//         dispatch(errorActionCreator("GET_USER_FAIL",error))
//     })
// }

export const deleteUser = () => async(dispatch)=>{

    dispatch({type:"DELETE_STUDENT_REQUEST"})
}


////////////////////////Get User By ID ////////////////////////////////

export const getUserById = (user_id) => async(dispatch) => {
    // const navigate = useNavigate();
    dispatch({type:"GETUSERBYID_REQUEST"})

    const successHandler = (res) =>{
        dispatch({type:"GETUSERBYID_SUCCESS",payload:res.data})
    }

     return await axios.post('/api/user/addUser',user_id).then(successHandler).catch(error => {
        // Deal with the error
        dispatch(errorActionCreator("GETUSERBYID_FAIL", error))
      })
         
};
/////////////////////// Get User by Ids ///////////////
export const getUsersById = (user_ids) => async(dispatch) => {
    // const navigate = useNavigate();
    dispatch({type:"GETUSERSBYID_REQUEST"})

    const successHandler = (res) =>{
        dispatch({type:"GETUSERSBYID_SUCCESS",payload:res.data})
    }

     return await axios.post('/api/user/getStudentByIds',user_ids).then(successHandler).catch(error => {
        // Deal with the error
        dispatch(errorActionCreator("GETUSERSBYID_FAIL", error))
      })
         
};


export const errorActionCreator = (errorType, error) => {
    return {
      type: errorType,
      error: true,
      payload: error,
    }
  }