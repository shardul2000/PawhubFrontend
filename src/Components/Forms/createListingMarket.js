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
const Categories = ['Pet Toys', 'Pet Furniture', 'Cages', 'Beauty'];
const Locations = ['Halifax', 'Toronto', 'Montreal', 'Vancouver'];

const validationSchema = Yup.object({
	title: Yup.string().required().min(2),
	location: Yup.string()
		.required()
		.oneOf(Locations, 'The location you chose does not exist'),
	category: Yup.string().oneOf(
		Categories,
		'The profession you chose does not exist'
	),
	price: Yup.number()
		.typeError('Price must be a number')
		.min(0, 'You need to enter a positive amount or 0')
		.required(),
	petType: Yup.string().required().min(2),
	category: Yup.string()
		.required()
		.oneOf(Categories, 'The Category you chose does not exist'),
});

export default function CreateListingMarket() {
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
			petType: '',
			price: 0,
			location: '',
			category: 'Choose',
			description: '',
			image: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			values.userId = localStorage.getItem('uid');
			values.image = image;
			axios
				.post(
					`${process.env.REACT_APP_SERVER}/api/market/makeListing`,
					values,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: localStorage.getItem('jwtToken'),
						},
					}
				)
				.then(() => {
					alert('Item Posted');
					navigate('/market');
				})
				.catch((e) => alert(e));
			alert(JSON.stringify(values, null, 2));
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
					Post an Ad
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={3}>
						<Grid item sx={12} sm={6} md={6} lg={6}>
							<TextField
								fullWidth
								id="title"
								name="title"
								label="title"
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
					<Grid container spacing={3}>
						<Grid item sx={12} sm={6} md={6} lg={6}>
							<TextField
								fullWidth
								id="price"
								name="price"
								label="price"
								value={formik.values.price}
								onChange={formik.handleChange}
								error={formik.touched.price && Boolean(formik.errors.price)}
								helperText={formik.touched.price && formik.errors.price}
								sx={{ marginBlock: 3 }}
							/>
						</Grid>
						<Grid item sx={12} sm={6} md={6} lg={6}>
							<TextField
								fullWidth
								id="petType"
								name="petType"
								label="petType"
								value={formik.values.petType}
								onChange={formik.handleChange}
								error={formik.touched.petType && Boolean(formik.errors.petType)}
								helperText={formik.touched.petType && formik.errors.petType}
								sx={{ marginBlock: 3 }}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							<Typography>Upload a Picture:</Typography>
						</Grid>
						<Grid item xs={12} sm={8} md={8} lg={8}>
							<input
								type="file"
								class="form-control"
								id="image"
								name="image"
								onChange={uploadImage}
							/>
						</Grid>
					</Grid>

					<FormControl fullWidth sx={{ marginTop: 3.5 }}>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							id="category"
							label="category"
							name="category"
							onChange={formik.handleChange}
							value={formik.values.category}
							error={formik.touched.category && Boolean(formik.errors.category)}
							helperText={formik.touched.category && formik.errors.category}
						>
							{Categories.map((cat, index) => (
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
