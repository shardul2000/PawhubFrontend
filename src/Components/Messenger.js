import React,{ useEffect,useState } from 'react';
import '../css/Messenger.css';
import '../css/grid.css';
import { useNavigate } from 'react-router-dom';
import Friends from './Friends';
import RightSide from './RightSide';
import {useDispatch,useSelector} from 'react-redux';
import {getFriends,messageSend,getMessage} from '../store/actions/MessengerAction';
import axios from 'axios';



const Messenger = () => {
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

     const[currentfriend,setCurrentFriend]=useState('');
     const[newMessage,setNewMessage]=useState('');
     
     const inputHandle = (e) => {
          setNewMessage(e.target.value);
     
      }
      
     
      const sendMessage = (e) => {
          e.preventDefault();
          console.log(newMessage);
          const data = {
              senderId:values.id,
              senderName : values.firstName + " " + values.lastName,
              reseverId : currentfriend._id,
              message : newMessage
         }
         dispatch(messageSend(data));
     
      }
      
     console.log(currentfriend);

     const {friends,message} = useSelector(state => state.messenger );
        console.log(friends);
     const dispatch = useDispatch();


     useEffect(() => {
          dispatch(getFriends());
     },[]);
    

     useEffect(() => {
          const dat = {
               SenderId:values.id
          }
        
          dispatch(getMessage(currentfriend._id,dat))
      },[ currentfriend._id]);
    
     
  return (
     
       <div className='messenger'>
       
          <link
				href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
				rel="stylesheet"
			/>
<div className='row'>
     <div className='col-3'>
          <div className='left-side'>
               <div className='top'>
                    <div className='image-name'>
                         
                         <div className='name'>
                         <h3> Hi {values.firstName + " " + values.lastName} </h3>
                         </div>
                       </div>
                       
               </div>
              

              

               <div className='friends'>
                    

                   {friends && friends.length>0 ? friends.map((fd) => <div onClick={()=> setCurrentFriend(fd)} className={currentfriend._id === fd._id ? 'hover-friend active' : 'hover-friend' }> 
          <Friends friend={fd} />
          </div> ) : 'No Friend'}

               </div>
               </div>
                      
                 </div>
                 {
          currentfriend ?  <RightSide 
          currentfriend={currentfriend}
          inputHandle={inputHandle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          message={message}
          /> : 'Please Select someone to chat'
     }
            </div>
            
       </div>
  )
};
export default Messenger;