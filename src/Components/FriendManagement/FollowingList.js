import '../../css/follow.css';

import Follow from './Following';

function FollowList() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 p-4 mt-3">
					<h1>Your Friend List</h1>
					<Follow />
				</div>
			</div>
		</div>
	);
}

export default FollowList;
