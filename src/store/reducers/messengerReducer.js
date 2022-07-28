import {FRIEND_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_S_SUCCESS} from "../types/messengerType";

const messengerState = {
     friends : [],
     message: []
}

export const messengerReducer = (state=messengerState,action) => {
     const {type,payload} = action;
     if(type === FRIEND_GET_SUCCESS){
          return {
               ...state,
               friends : payload.friends
          }
     }

     if(type === MESSAGE_GET_SUCCESS){
          return {
               ...state,
               message : payload.message
          }
     }
     if(type === MESSAGE_S_SUCCESS){
          return {
               ...state,
               message : [...state.message,payload.message]
          }
     }

     return state;
}