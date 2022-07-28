import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import {FRIEND_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_S_SUCCESS} from "../types/messengerType";
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';

export const getFriends = () => async(dispatch) => {
     

     try{
          //const response = await axios.get('https://corshl.herokuapp.com/https://api-group2.herokuapp.com/api/market/getAllListings');
        const response = await axios.get('https://corshl.herokuapp.com/https://api-group2.herokuapp.com/api/profile/get-friends');
             console.log("jee");
          console.log(response.data);
           dispatch({
                type: FRIEND_GET_SUCCESS,
                payload : {
                    // post because that is how it is in response.data will bne changed later
                     friends : response.data.friends
                }
           })

     }catch (error){
          console.log(error.response.data);
          console.log("f");
     }
}

export const messageSend = (data) =>
 async(dispatch) => {
          
     

     console.log(data);
     try{
      const response = await axios.post('https://corshl.herokuapp.com/https://api-group2.herokuapp.com/api/profile/send',data);
      console.log(response.data);
      dispatch({
          type:MESSAGE_S_SUCCESS,
          payload : {
               message : response.data.message
              }

      })
     }catch (error){
      console.log(error.response.data);
     }
 } 



 export const getMessage = (id,d) => {
     return async(dispatch) => {
          console.log("below");
          console.log(id);
         
         console.log(d);
          try{
               const response = await axios.post(`https://corshl.herokuapp.com/https://api-group2.herokuapp.com/api/profile/get-message/${id}`,d)
               console.log(response.data)
          dispatch({
               type : MESSAGE_GET_SUCCESS,
               payload : {
                message : response.data.message
               }
          })
          }catch (error){
               console.log(error.response.data)
          }
     }
}

