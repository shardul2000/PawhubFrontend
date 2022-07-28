
// Form component
// Create a form inside the Modal based on the report type, it has lisitng or profile.
import ReportFooter from "./ReportFooter";
import React, { useState } from 'react';

function ReportForm(props) {

    const [reason, setReason] = useState('');
    const [type, setType] = useState('');

    const getReason = (event) => {
        setReason(event.target.value);
    }

    const getType = (event) => {
        setType(event.target.value);
    }

    if (props.name === "profile") {
        return (
            <div>
                <div className="form">
                    <div className="mb-3">
                        <label className="form-label">
                            What does this {props.name} violates? Please select the violation type below. (Required)
                        </label>
                        <select className="form-select" aria-label="Violation" required value={type} onChange={getType}>
                            <option selected disabled value="">Please select the violation type</option>
                            <option value="Spam">Spam</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Pretending to be someone">Pretending to be someone</option>
                            <option value="Sexual content">Sexual content</option>
                            <option value="Violence">Violence/ Bully</option>
                            <option value="Other">Other (please specify)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Why do you think this {props.name} should be removed? Please provide the
                            reasons. (Required)
                        </label>
                        <textarea className="form-control" id="reason" rows={3} value={reason} onChange={getReason} required/>
                    </div>
                </div>
                <ReportFooter reason={reason} type={type} id="profile" />
            </div>

        );
    }
    else {
        return (
            <div>
                <div className="form">
                    <div className="mb-3">
                        <label className="form-label" >
                            What does this {props.name} violates? Please select the violation type below. (Required)
                        </label>
                        <select className="form-select" required aria-label="Violation" value={type} onChange={getType}>
                            <option selected disabled value="">Please select the violation type</option>
                            <option value="Spam">Spam</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Illegal item">Illegal item</option>
                            <option value="Other">Other (please specify)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Why do you think this {props.name} should be removed? Please provide the
                            reasons. (Required)
                        </label>
                        <textarea className="form-control" id="reason" rows={3} value={reason}  onChange={getReason} required/>
                    </div>
                </div>
                <ReportFooter reason={reason} type={type} id="listing"/>
            </div>

        );
    }
}
export default ReportForm;
