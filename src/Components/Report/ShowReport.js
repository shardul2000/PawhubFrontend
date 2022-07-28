// Author: Howard Luan
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from '../Footer';
import axios from "axios";

async function handleDelete(props) {
    const ans = window.confirm("Do you want to delete this report? You cannot undo this action.")
    if (ans) {
        // Delete the report from the database.
        await axios.delete(`${process.env.REACT_APP_SERVER}/api/report/deleteIdentical/` + props).then(result => {
            console.log(result.data);
            window.location.reload();
        }).catch(err => {
            console.error(err);
        });
    }
}

async function handleReport(props) {
    const uid = props.url.split('/').at(-1);
    console.log(uid);
    if (props.reportType === "profile") {
        const ans = window.confirm("Do you want to delete this " + props.reportType + "? You cannot undo this action.\nDeleting the profile will also delete ALL POST and LISTING this user created.");
        if (ans) {
            // Delete the profile and all associated posts, listings from the database.
            await axios.delete(`${process.env.REACT_APP_SERVER}/api/report/deleteProfile/` + uid).then(result => {
                console.log(result.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            });
            await axios.delete(`${process.env.REACT_APP_SERVER}/api/report/deleteIdentical/` + props._id).then(result => {
                console.log(result.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            });
        }

    } else {
        const ans = window.confirm("Do you want to delete this " + props.reportType + "? You cannot undo this action.")
        if (ans) {
            // Delete the listing from the database.
            await axios.delete(`${process.env.REACT_APP_SERVER}/api/report/deleteListing/` + uid).then(result => {
                console.log(result.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            });
            await axios.delete(`${process.env.REACT_APP_SERVER}/api/report/deleteIdentical/` + props._id).then(result => {
                console.log(result.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            });
        }
    }
}

function Reports() {
    const [report, setReport] = useState();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/report/getReport`).then(res => {
            console.log(res.data.reports);
            setReport(res.data.reports);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <>
            <Navbar /><br /><br /><br />
            <div className="container">
                <h1>All Reports</h1>
                <div className="row row-cols-3">
                    {report?.length ? report.map((char) => {
                        return (
                            <>
                                <div className="card" id={char._id}>
                                    <div className="card-body">
                                        <p className="card-text"><b>Report Type:</b> {char.reportType}</p>
                                        <p className="card-text"><b>Violation Type: </b>{char.category}</p>
                                        <p className="card-text"><b>Reason: </b>{char.comment}</p>
                                        <p className="card-text"><b>Link to </b>{char.reportType}: <a href={char.url} target="_blank" rel="noreferrer">{char.url}</a></p>
                                        <p className="card-text"><b>Reported on </b>{char.updatedAt.substring(0, 10)}</p>
                                        <button className="btn btn-danger" onClick={() => handleDelete(char._id)}>Delete this report</button>
                                        <button className="btn btn-primary" onClick={() => handleReport(char)}>Delete this {char.reportType}</button>
                                    </div>
                                </div>
                            </>
                        )
                    }) : "There are no reports to show"}
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Reports;