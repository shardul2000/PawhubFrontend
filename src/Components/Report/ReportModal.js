
// Modal Component
// Create a modal for reporting a listing or profile.

import ReportForm from './ReportForm.js';

function ReportModal(props) {

    return (
        <div className="ModalForm">
            <div className="modal fade" id={props.id} tabIndex={-1} aria-labelledby={props.id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={props.id}>
                                    Report this {props.id}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancel" />
                            </div>
                            <div className="modal-body">
                                <ReportForm name={props.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;