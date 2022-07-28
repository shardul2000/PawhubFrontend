import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unfollow from "./Unfriend";
import { Link } from "react-router-dom";

function GetUser(props) {
    const [values, setValues] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/profile/getInfoById/` + props.id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwtToken")
            }
        })
            .then((res) => {
                setValues(res.data.response);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return (
                <div className="friend-box">
                    <div className="row">
                        <div className="col-md-2 col-sm-2">
                            <img src={values.profileImage} alt="Profile Image" className="profile" />
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <Link to={`/viewprofile/${values.userId}`}>
                                <h5>{values.firstName + " " + values.lastName} </h5>
                            </Link>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#unfollow" className="btn btn-primary pull-right">Unfollow</button>
                            <Unfollow uid={localStorage.getItem("uid")} fid={values.userId} />
                        </div>
                    </div>
                </div>
    );
}
export default GetUser;