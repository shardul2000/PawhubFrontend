import axios from 'axios';

function Unfollow(props) {
    function handleUnfollow() {
        const del = () => {
            axios.post(`${process.env.REACT_APP_SERVER}/api/follow/deleteFollower`, {
                    userId: props.uid,
                    followId: props.fid
            }).then(result => {
                console.log(result.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            })
        }
        del();
        alert('This profile has been removed from your friend list.');
    }
    return (
        <div className="modal fade" id="unfollow" tabIndex={-1} aria-labelledby="unfollow" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="unfollow">
                                Unfriend
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancel" />
                        </div>
                        <div className="modal-body">
                            Do you want to remove this user from your friend list?
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-light" onClick={handleUnfollow}>
                                Yes
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                No
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unfollow;