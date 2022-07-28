import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBRow, MDBCol, MDBInput, MDBContainer } from 'mdb-react-ui-kit';
import { Card, CardContent, Button, Typography } from '@mui/material';
import logo from './Assets/regAvatar.png';
import './css/login.css';
import Navbar from './Components/Navbar';
import axios from 'axios';

function Register() {
	let nav = useNavigate();

	const [values, setValues] = useState({
		fName: '',
		lName: '',
		email: '',
		pass: '',
		confirmPass: '',
	});

	/* Error handling help via: https://www.youtube.com/watch?v=EYpdEYK25Dc*/
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [successM, setSuccessM] = useState("");
	const [RegError, setRegError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setSuccessM("");
		setRegError("");
		setErrors(errorCheck(values));
		setSubmitted(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
		
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && submitted) {
            axios.post(`${process.env.REACT_APP_SERVER}/api/authentication/register`, values)
			.then((resp)=>{
				if(resp.data.success){
					setSuccessM(resp.data.response);
				}
				else{
					setRegError(resp.data.response);
				}
				
			})
			.catch((e)=>{
				console.log(e.response.data.response);
			})
			
		}
	}, [errors]);

	// check for errors
	const errorCheck = (regVals) => {
		const errorList = {};
		// regex for only allowing letters
		const letterReg = new RegExp(/^[A-Za-z]+$/);
		// regex for only allowing valid emails
		const emailReg = new RegExp(
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		);
		// regex for only allowing strong password
		const passReg = new RegExp(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
		);

		// Error for if first name is empty
		if (!regVals.fName) {
			errorList.fName = 'First name is required';
		} // Error for if first name is invalid
		else if (!letterReg.test(regVals.fName)) {
			errorList.fName = 'Invalid characters in name';
		}
		// Error for if last name is empty
		if (!regVals.lName) {
			errorList.lName = 'Last name is required';
		}
		// Error for if last name is invalid
		else if (!letterReg.test(regVals.lName)) {
			errorList.lName = 'Invalid characters in name';
		}
		// Error for if email name is empty
		if (!regVals.email) {
			errorList.email = 'Email is required';
		}
		// Error for if email name is invalid
		else if (!emailReg.test(regVals.email)) {
			errorList.email = 'Invalid email';
		}
		// Error for if password is empty
		if (!regVals.pass) {
			errorList.pass = 'Password is required';
		}
		// Error for if password is weak
		else if (!passReg.test(regVals.pass)) {
			errorList.pass =
				'Password must be at least 8 characters long and contain one letter, one number and one special character, e.g., !@#$%^&*().';
		}
		// Error for if confirm password is empty
		if (!regVals.confirmPass) {
			errorList.confirmPass = 'Confirm password is required';
		} else if (regVals.confirmPass !== regVals.pass) {
			errorList.matchPass = 'Passwords do not match';
		}

		return errorList;
	};

	return (
		<div>
			<Navbar />
			<MDBContainer>
				<div className="d-flex align-items-center justify-content-center">
					<Card sx={{ minWidth: 50, marginTop: 14 }} className="shadow rounded">
						<CardContent>
							<div className="container">
								<img src={logo} className="image" alt="Register icon" />
								<form>
									<MDBRow className="mb-4">
										<MDBCol>
											<MDBInput
												value={values.fName}
												name="fName"
												onChange={handleChange}
												label="First name"
											/>
											<p className="text-start text-danger">{errors.fName}</p>
										</MDBCol>
										<MDBCol>
											<MDBInput
												value={values.lName}
												name="lName"
												onChange={handleChange}
												label="Last name"
											/>
											<p className="text-start text-danger">{errors.lName}</p>
										</MDBCol>
									</MDBRow>
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
									<p className="text-start text-danger mb-4">{errors.pass}</p>
									<MDBInput
										type="password"
										value={values.confirmPass}
										name="confirmPass"
										onChange={handleChange}
										label="Confirm Password"
									/>
									<p className="text-start text-danger mb-5">
										{errors.confirmPass} {errors.matchPass}
									</p>
									<Typography variant="h6" component="div" sx={{color:"green", margin:3}}>{successM}</Typography>
									<Typography variant="h6" component="div" sx={{color:"red", margin:3}}>{RegError}</Typography>

									<Button
										variant="contained"
										sx={{ marginBlock: 3 }}
										onClick={handleSubmit}
									>
										Register
									</Button>

									<div className="text-center">
										<p>
											Already have an account? <a href="../login">Login</a>
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
export default Register;
