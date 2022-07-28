
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	TextField,
	MenuItem,
	InputLabel,
	Select,
	FormControl,
	Typography,
	Grid,
} from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import getBase64 from '../../Functions/getBase64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const handleChange = (event) => {};
const ServiceTypes = ['Pet Sitting', 'Pet Grooming', 'Pet Walking', 'Other'];
const Locations = ['Halifax', 'Toronto', 'Montreal', 'Vancouver'];

const validationSchema = Yup.object({
	title: Yup.string().required().min(2),
	location: Yup.string()
		.required()
		.oneOf(Locations, 'The location you chose does not exist'),
	description: Yup.string(),
	price: Yup.number()
		.typeError('Price must be a number')
		.min(0, 'You need to enter a positive amount or 0')
		.required(),
	serviceType: Yup.string()
		.required()
		.oneOf(ServiceTypes, 'The service type you chose does not exist'),
});

export default function CreateListingService() {
	let navigate = useNavigate();

	const [image, setImage] = useState(null);

	useEffect(() => {
		const body = {
			id: localStorage.getItem('uid'),
		};
		axios
			.post(
				`${process.env.REACT_APP_SERVER}/api/authorize`,
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
				//setAccess(false);
			})
			.catch((e) => {
				console.log(e);
				navigate('/login');
			});
	}, []);

	const formik = useFormik({
		initialValues: {
			title: '',
			price: 0,
			location: '',
			serviceType: 'Choose',
			description: '',
			image: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			values.userId = localStorage.getItem('uid');
			values.image = image;
			axios
				.post(
					`${process.env.REACT_APP_SERVER}/api/services/makeService`,
					values,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: localStorage.getItem('jwtToken'),
						},
					}
				)
				.then(() => {
					alert('Service Listing Posted');
					navigate('/services');
				})
				.catch((e) => alert(e));
		},
	});

	const uploadImage = (e) => {
		let img = e.target.files[0];

		getBase64(img)
			.then((result) => {
				return result;
			})
			.then((e) => {
				setImage(e);
				console.log(e);
			})
			.catch((e) => alert('error ' + e));
	};

	return (
		<div>
			<Navbar />
			<div
				className="container"
				style={{ marginTop: '9em', marginBottom: '5em' }}
			>
				<Typography sx={{ marginBlock: 3 }} variant="h4">
					Post a Service Listing
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={3}>
						<Grid item sx={12} sm={6} md={6} lg={6}>
							<TextField
								fullWidth
								id="title"
								name="title"
								label="Title *"
								value={formik.values.title}
								onChange={formik.handleChange}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
								sx={{ marginBlock: 3 }}
							/>
						</Grid>
						<Grid item sx={12} sm={6} md={6} lg={6}>
							<FormControl fullWidth sx={{ marginTop: 3.5 }}>
								<InputLabel id="demo-simple-select-label">
									Location *
								</InputLabel>
								<Select
									className="text-start"
									id="location"
									label="Location *"
									name="location"
									onChange={formik.handleChange}
									value={formik.values.location}
									error={
										formik.touched.location && Boolean(formik.errors.location)
									}
									helperText={formik.touched.location && formik.errors.location}
								>
									{Locations.map((loc, index) => (
										<MenuItem value={loc} key={index}>
											{loc}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<TextField
						fullWidth
						id="price"
						name="price"
						label="Price"
						value={formik.values.price}
						onChange={formik.handleChange}
						error={formik.touched.price && Boolean(formik.errors.price)}
						helperText={formik.touched.price && formik.errors.price}
						sx={{ marginBlock: 3 }}
					/>

					<InputLabel className="text-start">Upload a Picture:</InputLabel>
					<input
						type="file"
						class="form-control"
						id="image"
						name="image"
						onChange={uploadImage}
					/>

					<FormControl fullWidth sx={{ marginTop: 3.5 }}>
						<InputLabel id="demo-simple-select-label">
							Service Type *
						</InputLabel>
						<Select
							className="text-start"
							id="serviceType"
							label="Service Typ *"
							name="serviceType"
							onChange={formik.handleChange}
							value={formik.values.serviceType}
							error={
								formik.touched.serviceType && Boolean(formik.errors.serviceType)
							}
							helperText={
								formik.touched.serviceType && formik.errors.serviceType
							}
						>
							{ServiceTypes.map((cat, index) => (
								<MenuItem value={cat} key={index}>
									{cat}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						fullWidth
						id="description"
						name="description"
						label="description"
						value={formik.values.description}
						onChange={formik.handleChange}
						error={
							formik.touched.description && Boolean(formik.errors.description)
						}
						helperText={formik.touched.description && formik.errors.description}
						sx={{ marginBlock: 3 }}
					/>

					<Button
						color="primary"
						variant="contained"
						fullWidth
						type="submit"
						sx={{ marginBlock: 3 }}
					>
						Submit
					</Button>
				</form>
			</div>
			<Footer />
		</div>
	);
}
