
import axios from 'axios';

function ReportFooter(props) {
    function handleSubmit(e) {
        e.preventDefault();
        const add = (props) => {
            console.log(props.reason + props.type);
            console.log(props.id);
            const url = window.location.href;
            axios.post(`${process.env.REACT_APP_SERVER}/api/report/addReport`, {
                reportType: props.id,
                category: props.type,
                comment: props.reason,
                url: url
            }).then(result => {
                console.log(result.data.status);
            }).catch(err => {
                console.error(err);
            })
        }
        if (props.type === "") {
            alert('Error: Please select a violation type!');
        } else if (props.reason === ""){
            alert('Error: Please put in the reason why you think this ' + props.id + ' should be removed.')
        } else {
            add(props);
            alert('Your report has been submitted. We will review your report and decide soon.');
        }
    }
    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Cancel
            </button>
            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleSubmit}>
                Submit report
            </button>
        </div>
    );
}


export default ReportFooter;
