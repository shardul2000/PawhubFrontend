import React from 'react';
import '../css/friend.css';

const Friends = ({friend}) => {
  return (

     
       <div className='friend'>
        <link
				href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
				rel="stylesheet"
			/>
           

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                    
                      <h4>{friend.firstName+" "+friend.lastName}</h4>
                 </div>

            </div>

       </div>
  )
};

export default Friends;