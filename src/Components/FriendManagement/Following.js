import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetUser from "./FriendInfo";

function Follow() {
    const [follow, setFollow] = useState();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/follow/getFollowers/` + localStorage.getItem("uid")).then(res => {
            setFollow(res.data.followers);
        }).catch(err => {
            console.error(err);
        });
    }
    return (
        <>
            {follow?.length ? follow.map((char) => {
                    return <GetUser id={char.followId} />;
            }) : "Your friend list is empty"}
        </>
    );
}

export default Follow;