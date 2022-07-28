
// Button Component
// Create a button on the page.
import ReportModal from "./ReportModal";

function ReportButton(props) {
    return (
        <div className="ButtonModal">
            <button
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target= {'#' + props.id}
            >
                Report this {props.id}
            </button>
            <ReportModal id={props.id} />
        </div>
    );
}

export default ReportButton;