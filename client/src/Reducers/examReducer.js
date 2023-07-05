import { errorReducer } from "./userReducer"

export const getExamReducer = (state={exam:[]},action) =>{
    switch(action.type){
        case 'GET_ALLEXAMS_REQUEST':
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GET_ALLEXAMS_SUCCESS':
            return{
                Allexam: action.payload,
                loading: false
            }
        case 'GET_ALLEXAMS_ERROR':
            return{
                ...errorReducer(state,action),
                loading: false
            }
        default : 
            return state;
    }
}

export const getAllQuestionsReducer = (state={questions:[]},action) =>{
    switch(action.type){
        case "GET_ALLQUESTIONS_REQUEST":
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case "GET_ALLQUESTIONS_SUCCESS":
            return{
                Questions: action.payload,
                loading: false
            }
        case "GET_ALLQUESTIONS_ERROR":
            return{
                ...errorReducer(state,action),
                loading:false
            }
        default : 
            return state;
    }
}

export const getExamByIdReducer = (state={ },action) =>{
    switch(action.type){
        case 'GET_EXAMBYID_REQUEST':
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GET_EXAMBYID_SUCCESS':
            return{
                Allexam: action.payload,
                loading: false
            }
        case 'GET_EXAMBYID_ERROR':
            return{
                ...errorReducer(state,action),
                loading: false
            }
        default : 
            return state;
    }
}

export const getResultByExamIdReducer = (state={results:[] },action) =>{
    switch(action.type){
        case 'GET_RESULTBYEXAMID_REQUEST':
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GET_RESULTBYEXAMID_SUCCESS':
            return{
                Result: action.payload,
                loading: false
            }
        case 'GET_RESULTBYEXAMID_ERROR':
            return{
                ...errorReducer(state,action),
                loading: false
            }
        default : 
            return state;
    }
}


export const getResultByUserIdsReducer = (state={results:[] },action) =>{
    switch(action.type){
        case 'GET_RESULTBYUSERIDS_REQUEST':
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GET_RESULTBYUSERIDS_SUCCESS':
            return{
                Results: action.payload,
                loading: false
            }
        case 'GET_RESULTBYUSERIDS_ERROR':
            return{
                ...errorReducer(state,action),
                loading: false
            }
        default : 
            return state;
    }
}



