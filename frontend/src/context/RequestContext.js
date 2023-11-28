import { createContext, useReducer } from "react";

export const RequestContext= createContext();

export const requestReducer=(state, action)=>{
    switch(action.type){
        case 'set_request':
            return{
                request:action.payload
            }
        
        case 'create_request':
            return {request:[action.payload, ...state.request]}

        case 'delete_request':
            return {request:state.request.filter(value=>value._id !== action.payload._id)}
        
        case 'update_request':
            let index = state.req.findIndex(request => request._id === action.payload._id);
            let updatedRequest=[...state.request];
            updatedRequest[index]=action.payload
            return {request:updatedRequest}

        default:
            return state
    }
}

export const RequestContextProvider=({children})=>{

    const [state, deploy]= useReducer(requestReducer, {
        request:[]
    });


    return(
        <RequestContext.Provider value={{...state, deploy}}>
            {children}
        </RequestContext.Provider>
    )
}