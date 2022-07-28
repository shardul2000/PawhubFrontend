import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBContainer } from 'mdb-react-ui-kit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';
import Navbar from './Components/Navbar';
import logo from './Assets/login.png';
import './css/login.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Login() {
	let nav = useNavigate();
	const [values, setValues] = useState({
		email: '',
		pass: '',
	});

	/* Error handling help via: https://www.youtube.com/watch?v=EYpdEYK25Dc*/
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [loginError, setLoginError] = useState('');
	const uid = localStorage.getItem('uid');

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(errorCheck(values));
		setSubmitted(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	useEffect(() => {
		let token = '';
		/* When uid has a value (logged in) redirect to profile */
		if (uid === null) {
			nav('/login');
		} else {
			nav('/profile');
		}

		if (Object.keys(errors).length === 0 && submitted) {
			axios
				.post(
					`${process.env.REACT_APP_SERVER}/api/authentication/login`,
					values
				)
				.then((res) => {
					console.log('jwtToken:  ' + res.data.token);
					token = res.data.token;
					var decoded = jwt_decode(token);
					const uid = decoded.id;
					console.log('uid: ' + uid);
					console.log('jwt: ' + token);
					localStorage.setItem('jwtToken', token);
					localStorage.setItem('uid', uid);
					nav('/profile');
				})
				.catch((error) => {
					setLoginError(error.response.data.response);
				});
		}
	}, [errors]);

	// check for errors
	const errorCheck = (loginVals) => {
		const errorList = {};

		// Error for if email name is empty
		if (!loginVals.email) {
			errorList.email = 'Email is required';
		}
		// Error for if password is empty
		if (!loginVals.pass) {
			errorList.pass = 'Password is required';
		}
		return errorList;
	};

	return (
		<div>
			<Navbar />
			<MDBContainer style={{ marginBottom: '10em' }}>
				<div className="d-flex align-items-center justify-content-center">
					<Card
						sx={{ minWidth: '22em', marginTop: 15 }}
						className="shadow rounded"
					>
						<CardContent>
							<div className="container">
								<img src={logo} className="imageLogin" />
								<form style={{ marginTop: '5em' }}>
									<MDBInput
										type="email"
										value={values.email}
										name="email"
										onChange={handleChange}
										label="Email address"
									/>
									<p className="text-start text-danger mb-4">{errors.email}</p>
									<MDBInput
										type="password"
										value={values.pass}
										name="pass"
										onChange={handleChange}
										label="Password"
									/>

									<p className="text-start text-danger mb-5">{errors.pass}</p>
									<p className="text-center text-danger">{errors.incorrect}</p>

									<Button variant="contained" onClick={handleSubmit}>
										Sign In
									</Button>
									<Typography
										variant="h7"
										component="div"
										sx={{ color: 'red', margin: 3 }}
									>
										{loginError}
									</Typography>

									<div className="text-start" style={{ marginTop: '3em' }}>
										<a href="../resetPassword">Forgot password?</a>
										<p className="mt-2">
											No account? <a href="../register">Create one now</a>
										</p>
									</div>
								</form>
							</div>
						</CardContent>
					</Card>
				</div>
			</MDBContainer>
		</div>
	);
}
export default Login;
