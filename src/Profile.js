import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import getBase64 from './Functions/getBase64';
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
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import {
	TextField,
	Avatar,
	Card,
	CardContent,
	Typography,
	Grid,
} from '@mui/material';
import FollowingList from './Components/FriendManagement/FollowingList';
import axios from 'axios';
import Post from './Components/Profile/post';
import './css/profile/post.css';
import Reviews from './Components/Profile/review';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Profile() {
	let navigate = useNavigate();

	//var to conditionally render based on login status. True means no access shall be given.
	const [access, setAccess] = useState(true);

	const [values, setValues] = useState({});
	const [postvalue, setpostvalue] = useState([]);
	const [image, setImage] = useState(null);
	const [profileImage, setProfileImage] = useState(null);
	const [caption, setCaption] = useState('');

	const [reviewList, setReviewList] = useState([]);
	//state variable to keep track of updates. Get request every time this variable is updated
	const [postUpdate, setPostUpdate] = useState({});

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getData/${localStorage.getItem('uid')}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then((res) => {
				setAccess(false);
				setEditValues({
					email: res.data.response.email,
					location: res.data.response.location,
					pet: res.data.response.pet,
					bio: res.data.response.bio,
					firstName: res.data.response.firstName,
					lName: res.data.response.lastName,
					profileImage: res.data.response.profileImage,
				});
				setValues({
					email: res.data.response.email,
					location: res.data.response.location,
					pet: res.data.response.pet,
					bio: res.data.response.bio,
					firstName: res.data.response.firstName,
					lastName: res.data.response.lastName,
					profileImage: res.data.response.profileImage,
				});
			})
			.catch((e) => {
				console.log(e);
				navigate('/login');
			});

		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getPosts/${localStorage.getItem('uid')}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwtToken'),
				},
			})
			.then((res) => {
				setpostvalue(res.data.posts);
			});

		axios
			.get(`${process.env.REACT_APP_SERVER}/api/profile/getReviews/${localStorage.getItem('uid')}`, {
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
	}, [postUpdate]);

	const [editValues, setEditValues] = useState({
		email: '',
		pass: '',
		location: '',
		pet: '',
		bio: '',
		fName: '',
		lName: '',
		profileImage: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditValues({ ...editValues, [name]: value });
	};
	const handleCreatePost = (e) => {
		toggleShowCreate();
		e.preventDefault();
		const body = {
			userId: localStorage.getItem('uid'),
			caption: caption,
			image: image,
		};
		axios
			.post(
				`${process.env.REACT_APP_SERVER}/api/profile/createPost`,
				body,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('jwtToken'),
					},
				}
			)
			.then((res) => {
				console.log(res.data.response);
				setPostUpdate(res.data.posts);
			})
			.catch((e) => console.log('eroor occured' + e));
	};

	const onProfileChange = (e) => {
		let img = e.target.files[0];
		let encoded;

		getBase64(img)
			.then((result) => {
				encoded = result;
				return encoded;
			})
			.then((e) => {
				setProfileImage(e);
				setEditValues({ ...editValues, profileImage: e });
				console.log(e);
			})
			.catch((e) => alert('error ' + e));
	};

	const onCaptionChange = (e) => {
		setCaption(e.target.value);
	};
	const onImageChange = async (e) => {
		let img = e.target.files[0];
		let encoded;

		getBase64(img)
			.then((result) => {
				encoded = result;
				return encoded;
			})
			.then((e) => {
				setImage(e);
				console.log(e);
			})
			.catch((e) => alert('error ' + e));
	};

	const update = async () => {
		try {
			const up = await axios.post(
				`${process.env.REACT_APP_SERVER}/api/profile/updateData/${localStorage.getItem(
					'uid'
				)}`,
				editValues,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('jwtToken'),
					},
				}
			);
			setPostUpdate(up);
			toggleShowEdit();
		} catch (e) {
			console.log('Something went wrong' + e);
		}
	};

	// Basic model functionality via: https://mdbootstrap.com/docs/b5/react/components/modal/
	const [editModal, setEditModal] = useState(false);
	const toggleShowEdit = () => setEditModal(!editModal);

	const [createModal, setCreateModal] = useState(false);
	const toggleShowCreate = () => setCreateModal(!createModal);

	// Basic drop-down menu functionality via:
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [deleteModal, setDeleteModal] = useState(false);
	const toggleDeletePost = () => {
		handleClose();
		setDeleteModal(!deleteModal);
	};

	return access ? (
		<>
			<Typography variant="h5" sx={{ marginTop: 15 }} component="div">
				You do not have access to this page
			</Typography>
		</>
	) : (
		<>
			<Navbar />
			<div className="m-5 pt-5">
				<MDBRow className="gx-5">
					{/* ------------ PROFILE DETAILS AND POSTS --------------*/}
					<MDBCol lg="5">
						<Card sx={{ padding: 1, marginTop: 4 }}>
							<CardContent>
								<div className="d-flex justify-content-center my-5">
									<Avatar
										alt="Amy Wheeler"
										src={values.profileImage}
										sx={{
											objectFit: 'cover',
											width: '25rem',
											height: 'auto',
											maxHeight: '25rem',
										}}
										className="img-fluid"
									/>
								</div>
								<Button
									onClick={toggleShowEdit}
									variant="contained"
									sx={{ backgroundColor: '#3d5a80' }}
								>
									Edit Profile
								</Button>
								<div className="p-4">
									<p className="fs-5">
										{values.firstName + ' ' + values.lastName}
									</p>
									<hr />
									<p className="fs-6">{values.bio}</p>
									<hr />
									<p className="fs-6">{values.email}</p>
									<hr />
									<p className="fs-6">{values.location}</p>
									<hr />
									<p className="fs-6">{values.pet}</p>
								</div>
							</CardContent>
						</Card>
						<Button
							className="my-5"
							variant="contained"
							onClick={toggleShowCreate}
							sx={{ backgroundColor: '#293241' }}
						>
							<CreateIcon className="p-1" />
							CREATE POST
						</Button>

						{/* -----------------POST CARD----------------------*/}
						{postvalue.map((element) => {
							return (
								<Post
									values={values}
									elements={element}
									setState={setPostUpdate}
								/>
							);
						})}
					</MDBCol>

					{/* ------------------ PROFILE REVIEWS -----------------*/}
					<MDBCol lg="7" className="p-1 mt-4 justify-content-center">
						<Tabs defaultActiveKey="friend" className="justify-content-center">
							<Tab eventKey="friend" title="Friend List">
								<FollowingList />
							</Tab>
							<Tab eventKey="reviews" title="Reviews">
								<div className="p-4 mt-3">
									<h1>Profile Reviews</h1>
									{reviewList.map((element) => {
										return <Reviews reviews={element} />;
									})}{' '}
								</div>
							</Tab>
						</Tabs>
					</MDBCol>
					{/* ------------- MODAL FOR EDITING PROFILE ---------------*/}
					<MDBModal show={editModal} setShow={setEditModal} tabIndex="-1">
						<MDBModalDialog centered>
							<MDBModalContent>
								<MDBModalHeader>
									<MDBModalTitle className="w-100">Edit Profile</MDBModalTitle>
								</MDBModalHeader>
								<MDBModalBody>
									<TextField
										fullWidth
										required
										id="name"
										label="Name"
										name="firstName"
										value={editValues.firstName}
										onChange={handleChange}
										className="mb-4"
									/>
									<TextField
										fullWidth
										id="outlined-multiline-static"
										label="Biography"
										multiline
										name="bio"
										value={editValues.bio}
										onChange={handleChange}
										className="mb-4"
									/>
									<Grid container spacing={3}>
										<Grid item sx={12} sm={4} md={4} lg={4}>
											<Typography>Update profile Picture:</Typography>
										</Grid>
										<Grid item sx={12} sm={8} md={8} lg={8}>
											<input
												type="file"
												class="form-control"
												id="image"
												name="profilepic"
												onChange={onProfileChange}
											/>
										</Grid>
									</Grid>
									<TextField
										fullWidth
										required
										id="location"
										label="Location"
										value={editValues.location}
										name="location"
										onChange={handleChange}
										className="mb-4"
										sx={{ marginTop: 3 }}
									/>
									<TextField
										fullWidth
										required
										id="petType"
										label="Pet Type"
										name="pet"
										onChange={handleChange}
										value={editValues.pet}
									/>
								</MDBModalBody>
								<MDBModalFooter>
									<Button onClick={toggleShowEdit}>Close</Button>
									<Button
										variant="contained"
										sx={{ backgroundColor: '#3d5a80', margin: 2 }}
										onClick={update}
									>
										Save changes
									</Button>
								</MDBModalFooter>
							</MDBModalContent>
						</MDBModalDialog>
					</MDBModal>

					{/* -------------- MODAL FOR CREATING POSTS ---------------*/}
					<MDBModal show={createModal} setShow={setCreateModal} tabIndex="-1">
						<MDBModalDialog centered>
							<MDBModalContent>
								<MDBModalHeader>
									<MDBModalTitle className="w-100">Create Post</MDBModalTitle>
								</MDBModalHeader>
								<form onSubmit={handleCreatePost}>
									<MDBModalBody>
										<input
											type="file"
											class="form-control"
											id="image"
											name="image"
											onChange={onImageChange}
										/>
										<TextField
											fullWidth
											id="caption"
											label="Caption"
											sx={{ marginTop: 3 }}
											name="caption"
											onChange={onCaptionChange}
											value={caption}
										/>
									</MDBModalBody>

									<MDBModalFooter>
										<Button onClick={toggleShowCreate}>Close</Button>
										<Button
											variant="contained"
											type="submit"
											sx={{ backgroundColor: '#3d5a80', margin: 2 }}
										>
											Save changes
										</Button>
									</MDBModalFooter>
								</form>
							</MDBModalContent>
						</MDBModalDialog>
					</MDBModal>
					{/* -------------- MODAL FOR DELETING POSTS ---------------*/}
					<MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex="-1">
						<MDBModalDialog centered>
							<MDBModalContent>
								<MDBModalHeader>
									<MDBModalTitle className="w-100">Create Post</MDBModalTitle>
								</MDBModalHeader>
								<MDBModalBody>
									Are you sure you want to delete this post?
								</MDBModalBody>
								<MDBModalFooter>
									<Button
										onClick={toggleDeletePost}
										variant="contained"
										sx={{ backgroundColor: 'red', margin: 2 }}
									>
										No
									</Button>
									<Button
										variant="contained"
										sx={{ backgroundColor: '#3d5a80', margin: 2 }}
									>
										Yes
									</Button>
								</MDBModalFooter>
							</MDBModalContent>
						</MDBModalDialog>
					</MDBModal>
				</MDBRow>
			</div>
			<Footer />
		</>
	);
}
export default Profile;
