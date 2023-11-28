import { createContext, useReducer } from "react";

export const DogsContext= createContext();

export const dogsReducer=(state, action)=>{
    switch(action.type){
        case 'set_dog':
            return{
                dogs:action.payload
            }
        
        case 'create_dog':
            return {dogs:[action.payload, ...state.dogs]}

        case 'delete_dog':
            return {dogs:state.dogs.filter(value=>value._id !== action.payload._id)}
        
        case 'update_dog':
            let index = state.dogs.findIndex(dog => dog._id === action.payload._id);
            let updatedDogs=[...state.dogs];
            updatedDogs[index]=action.payload
            return {dogs:updatedDogs}

        default:
            return state
    }
}

export const DogsContextProvider=({children})=>{

    const [state, dispatch]= useReducer(dogsReducer, {
        dogs:[]
    });


    return(
        <DogsContext.Provider value={{...state, dispatch}}>
            {children}
        </DogsContext.Provider>
    )
}