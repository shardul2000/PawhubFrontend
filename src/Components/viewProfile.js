import React, { useState, useEffect } from 'react';
import {
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBModal,
	MDBModalContent,
	MDBModalBody,
	MDBModalTitle,
	MDBModalFooter,
	MDBModalHeader,
	MDBModalDialog,
} from 'mdb-react-ui-kit';
import Avatar from '@mui/material/Avatar';
import Navbar from './Navbar';
import Footer from './Footer';
import Rating from '@mui/material/Rating';
import { Card, CardContent, Button, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ViewPost from './Profile/viewPost';
import ReportButton from './Report/ReportButton';
import Reviews from './Profile/review';
import FollowButton from './FriendManagement/FollowButton';

export default function ViewProfile() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [data, setData] = useState({});
	const [posts, setPosts] = useState([]);

	const [reviewModal, setreviewModal] = useState(false);
	const toggleReview = () => setreviewModal(!reviewModal);

	const [postUpdate, setPostUpdate] = useState({});
	const [rating, setRating] = useState(1);

	//input state
	const [review, setReview] = useState('');
	//list of reviews for this user
	const [reviewList, setReviewList] = useState([]);

	if (id == localStorage.getItem('uid')) {
		navigate('/profile');
	}

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getData/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then((res) => {
				console.log(res.data.response);

				setData(res.data.response);
			})
			.catch((e) => {
				console.log(e);
				navigate('/login');
			});

		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getPosts/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then((res) => {
				setPosts(res.data.posts);
			})
			.catch((e) => {
				alert(e);
			});

		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getReviews/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then((res) => {
				setReviewList(res.data.reviews);
			})
			.catch((e) => {
				alert(e);
			});
	}, []);

	const postReview = (e) => {
		e.preventDefault();
		const data = {
			review,
			rating,
			userId: id,
			reviewerId: localStorage.getItem('uid'),
		};

		axios
			.post(`${process.env.REACT_APP_SERVER}/api/profile/postreview`, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then(() => {
				alert('Review Posted');
				toggleReview();
				window.location.reload();
			})
			.catch((e) => {
				alert('Something wen wrong : ' + e);
			});
	};

	return (
		<>
			<Navbar />
			<div className="m-5 pt-5">
				<MDBRow className="gx-5">
					{/* ------------ PROFILE DETAILS AND POSTS --------------*/}
					<MDBCol lg="5">
						<Card sx={{ padding: 1, marginTop: 4 }}>
							<CardContent>
								<div className="d-flex justify-content-center mt-5">
									<Avatar
										alt="Amy Wheeler"
										src={data.profileImage}
										sx={{ width: 200, height: 200 }}
										className="img-fluid"
									/>
								</div>
								<div className="p-4">
									<p className="fs-5">{data.firstName + ' ' + data.lastName}</p>
									<hr />
									<p className="fs-6">{data.bio}</p>
									<hr />
									<p className="fs-6">{data.location}</p>
									<hr />
									<p className="fs-6">{data.pet}</p>
								</div>
								<FollowButton />
								<br />
								<ReportButton id="profile" />
							</CardContent>
						</Card>
						<br />
						{posts.map((element) => {
							return <ViewPost values={data} elements={element} />;
						})}
					</MDBCol>
					{/* ------------------ PROFILE REVIEWS ----------------- */}
					<MDBCol lg="7" className="p-1 mt-4 justify-content-center">
						<Button
							className="mb-5"
							variant="contained"
							sx={{ backgroundColor: '#293241' }}
							onClick={toggleReview}
						>
							<CreateIcon className="p-1" />
							LEAVE A REVIEW
						</Button>
						<MDBRow className="d-flex justify-content-center">
							<MDBCol md="7">
								<h1>Profile Reviews</h1>
							</MDBCol>
						</MDBRow>

						{reviewList.map((element) => {
							return <Reviews reviews={element} />;
						})}
					</MDBCol>
					{/* -------------- MODAL FOR Reviwing ---------------*/}
					<MDBModal show={reviewModal} setShow={setreviewModal} tabIndex="-1">
						<MDBModalDialog centered>
							<MDBModalContent>
								<form onSubmit={postReview}>
									<MDBModalHeader>
										<MDBModalTitle className="w-100">
											Write A Review
										</MDBModalTitle>
									</MDBModalHeader>
									<MDBModalBody>
										<TextField
											fullWidth
											id="Rev"
											label="Reivew"
											multiline
											defaultValue="Great work responsible no issuse were faced will use the service again"
											className="mb-4"
											value={review}
											onChange={(e) => {
												setReview(e.target.value);
											}}
										/>

										<div>Rating</div>
										<Rating
											name="simple-controlled"
											value={rating}
											onChange={(event, newValue) => {
												setRating(newValue);
											}}
										/>
									</MDBModalBody>

									<MDBModalFooter>
										<Button onClick={toggleReview}>Close</Button>
										<Button
											variant="contained"
											sx={{ backgroundColor: '#3d5a80', margin: 2 }}
											type="submit"
										>
											Save changes
										</Button>
									</MDBModalFooter>
								</form>
							</MDBModalContent>
						</MDBModalDialog>
					</MDBModal>
				</MDBRow>
			</div>
			<Footer />
		</>
	);
}
