import axios from "axios"
import { errorActionCreator } from "./userAction"
export const getAllExams = () => async(dispatch) =>{
    dispatch({type:"GET_ALLEXAMS_REQUEST"})

    const successHandler = (res) =>{
        // console.log(res)
        dispatch({type:'GET_ALLEXAMS_SUCCESS',payload:res.data})
    }

    return await axios.get("/api/exam/getAllExams").then(successHandler).catch(err=>{
        dispatch(errorActionCreator({type:"GET_ALLEXAMS_ERROR",err}))
    })
}

export const getAllQuestions = (exam_id) => async(dispatch) =>{
      console.log(exam_id)
    dispatch({type:"GET_ALLQUESTIONS_REQUEST"})

    const successHandler = (res) => {
        //  console.log(res.data)
        dispatch({type:"GET_ALLQUESTIONS_SUCCESS",payload:res.data})
    }

    return await axios.post("/api/question/getAllQuestions",exam_id).then(successHandler).catch((error)=>{
        dispatch(errorActionCreator({type:"GET_ALLQUESTIONS_ERROR",error}))
    })
}

export const getExamById = (exam_id) => async(dispatch) =>{
    // console.log(exam_id)
    dispatch({type:"GET_EXAMBYID_REQUEST"})

    const successHandler = (res) =>{
        // console.log(res)
        dispatch({type:'GET_EXAMBYID_SUCCESS',payload:res.data})
    }

    return await axios.post("/api/exam/getExamByID",exam_id).then(successHandler).catch(err=>{
        dispatch(errorActionCreator({type:"GET_EXAMBYID_ERROR",err}))
    })
}

//Get the Result of a specific user....

export const getResultByUserIds = (exam_id) => async(dispatch) =>{
    //  console.log(exam_id)
    dispatch({type:"GET_RESULTBYUSERIDS_REQUEST"})

    const successHandler = (res) =>{
        //  console.log(res)
        dispatch({type:'GET_RESULTBYUSERIDS_SUCCESS',payload:res.data})
    }

    return await axios.post("/api/result/getResultByUserIds",exam_id).then(successHandler).catch(err=>{
        dispatch(errorActionCreator({type:"GET_RESULTBYUSERIDS_ERROR",err}))
    })
}

export const getResultByExamId = (exam_id) => async(dispatch) =>{
    // console.log(exam_id)
    dispatch({type:"GET_RESULTBYEXAMID_REQUEST"})

    const successHandler = (res) =>{
        //  console.log(res.data)
        dispatch({type:'GET_RESULTBYEXAMID_SUCCESS',payload:res.data})
    }

    return await axios.post("/api/result/getResultByExamId",exam_id).then(successHandler).catch(err=>{
        dispatch(errorActionCreator({type:"GET_RESULTBYEXAMID_ERROR",err}))
    })
}




