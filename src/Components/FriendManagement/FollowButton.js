// Author: Howard Luan
// Button Component
// Create a button on the page.
import axios from 'axios';

function FollowButton() {
    function handleFollow(e) {
        e.preventDefault();
        const uid = window.location.href.split('/').at(-1);
        const add = () => {
            axios.post(`${process.env.REACT_APP_SERVER}/api/follow/addFollower`, {
                userId: localStorage.getItem("uid"),
                followId: uid,
            }).then(result => {
                console.log(result.data);
                alert('This user has been added to your friend list.');
            }).catch(err => {
                alert(err.response.data.message);
                console.error(err);
            })
        }
        add();
    }
    return (
        <div className="ButtonModal">
            <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addFriend"
            >
                Add Friend
            </button>
            <div className="modal fade" id="addFriend" tabIndex={-1} aria-labelledby="add Friend" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addFriend">
                                    Add friend
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancel" />
                            </div>
                            <div className="modal-body">
                                Do you want to add this user to your friend list?
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFollow}>Yes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowButton;