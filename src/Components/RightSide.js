import React from 'react';
import '../css/rightside.css';
import Message from './Message';
import MessageSend from './MessageSend'


const RightSide = (props) => {

     const {currentfriend,inputHandle,newMessage,sendMessage,message}=props;

     console.log(currentfriend);
     
  return (
     
       <div className='col-9'>
        <link
				href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
				rel="stylesheet"
			/>
            <div className='right-side'>
            <input type="checkbox" id='dot' />
                 <div className='row'>
                      <div className='col-8'>
          <div className='message-send-show'>
               <div className='header'>
                    <div className='image-name'>
                         
                         <div className='name'>
                              <h3> {currentfriend.title} </h3>
                         </div>
                    </div>

          <div className='icons'>
     

     

    

    </div>
    
         </div>
         <Message
          message = { message}
          currentfriend = {currentfriend}
          />

         <MessageSend
         inputHandle = {inputHandle}
         newMessage = {newMessage}
         sendMessage = {sendMessage}
         />
             </div>
                      </div>  

                  


                 </div>
            </div>
       </div>
  )
};

export default RightSide;