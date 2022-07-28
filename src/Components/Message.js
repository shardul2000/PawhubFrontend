import '../css/Message.css';
import React,{ useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { useSelector } from 'react-redux';
const Message = ({message,currentfriend}) => {
    // const {myInfo} = useSelector(state=>state.auth);
    let navigate = useNavigate();
    const[access, setAccess]= useState(true);
    const[values, setValues]= useState({});
    const[postvalue, setpostvalue]= useState([]);
    const [postUpdate, setPostUpdate] = useState({});
    
    useEffect(() => {  
         axios.get(`${process.env.REACT_APP_SERVER}/api/profile/getData/${localStorage.getItem("uid")}`,{ headers: {
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("jwtToken")
           }})
           .then((res)=>{
                console.log(res.data.response);
                setAccess(false);
                setEditValues({
                    id:res.data.response._id,
                     email: res.data.response.email,
                     location: res.data.response.location,
                     pet: res.data.response.pet,
                     bio: res.data.response.bio,
                     firstName: res.data.response.firstName,
                     lName: res.data.response.lastName,
                     profileImage: res.data.response.profileImage
                })
                setValues({
                    id:res.data.response._id,
                     email: res.data.response.email,
                     location: res.data.response.location,
                     pet: res.data.response.pet,
                     bio: res.data.response.bio,
                     firstName: res.data.response.firstName,
                     lastName: res.data.response.lastName,
                     profileImage: res.data.response.profileImage
                })
           })
           .catch((e)=>{
                console.log(e);
                navigate("/login")
           });
 
           axios.get(`${process.env.REACT_APP_SERVER}/api/profile/getPosts/${localStorage.getItem("uid")}`,{ headers: {
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("jwtToken")
           }})
           .then((res)=>{
             setpostvalue(res.data.posts);
           })
      },[postUpdate]);
      const [editValues, setEditValues] = useState({
         email: '',
         pass: '',
         location:'',
         pet:'',
         bio:'',
         fName:'',
         lName:'',
         profileImage:''
    });

     return (
          <div className='message-show'>


{
                message && message.length > 0 ? message.map(m => 
                    m.senderId === values.id ? <div className='my-message'>
                    <div className='image-message'>
                         <div className='my-text'>
                              <p className='message-text'> {m.message} </p>
                         </div>
                    </div>
                  
                 </div> : <div className='fd-message'>
                   <div className='image-message-time'>
                
                   <div className='message-time'>
                        <div className='fd-text'>
                        <p className='message-text'>{m.message} </p>
                        </div>
                     
                       
                   </div>
                   </div>
              </div>
                    ) : ''
            }
             </div>
  )
};
export default Message;