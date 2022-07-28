import React, { useState, useEffect } from 'react';
import {
	MDBInput,
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
} from 'mdb-react-ui-kit';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Card, CardContent } from '@mui/material';

function ResetPassword() {
	const [values, setValues] = useState({
		email: '',
	});

	/* Error handling help via: https://www.youtube.com/watch?v=EYpdEYK25Dc*/
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [success, setSuccess] = useState(false);

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
		if (Object.keys(errors).length === 0 && submitted) {
			setSuccess(true);
		}
	}, [errors]);

	// check for errors
	const errorCheck = (val) => {
		const errorList = {};

		// regex for only allowing valid emails
		const emailReg = new RegExp(
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		);

		// Error for if email name is empty
		if (!val.email) {
			errorList.email = 'Email is required';
		}
		// Error for if email name is invalid
		else if (!emailReg.test(val.email)) {
			errorList.email = 'Invalid email';
		}

		return errorList;
	};

	return (
		<>
			<Navbar />
			<MDBContainer style={{ marginBottom: '10em' }}>
				<Card
					sx={{ minWidth: '22em', marginTop: 15 }}
					className="shadow rounded"
				>
					<CardContent>
						<h2 className="mb-5">Reset password</h2>
						{success ? (
							<div>
								<div className="d-flex align-items-center justify-content-center mb-5">
									<Alert severity="success">
										<AlertTitle>Email sent!</AlertTitle>
										Success! If an account with this email address exists, a
										link to reset your password will be sent to your inbox.
									</Alert>
								</div>
								<MDBBtn outline className="mx-2" color="dark">
									<a className="back" href="../login">
										Back to Login
									</a>
								</MDBBtn>
							</div>
						) : (
							<div className="d-flex align-items-center justify-content-center">
								<form>
									<p className="text-center ">
										Please enter your email address below and we will send you
										an email to change your password.
									</p>
									<MDBInput
										type="email"
										value={values.email}
										name="email"
										onChange={handleChange}
										label="Email address"
									/>
									<p className="text-start text-danger">{errors.email}</p>
									<MDBRow className="mt-5 justify-content-center">
										<MDBCol size={3}>
											<MDBBtn onClick={handleSubmit}>Send Email</MDBBtn>
										</MDBCol>
										<MDBCol size={4}>
											<a className="back btn btn-outline-dark" href="../login">
												Back to Login
											</a>
										</MDBCol>
									</MDBRow>
								</form>
							</div>
						)}
					</CardContent>
				</Card>
			</MDBContainer>
			<Footer />
		</>
	);
}
export default ResetPassword;
