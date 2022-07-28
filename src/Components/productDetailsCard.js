import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../css/carousel.css';

export default function ProductDetailsCard({ details }) {
	let date = details.createdAt;
	var datePosted = new Date(details.createdAt).toString();

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<div className="detailsCard">
					<div className="left">
						<h5>Product:</h5>
						<br />
						<br />
						<h5>Price:</h5>
						<br />
						<br />
						<h5>Location:</h5>
						<br />
						<br />
						<h5>Date Posted</h5>
					</div>
					<div className="right">
						<h6>{details.title}</h6>
						<br />
						<br />
						<h6>{details.price}$</h6>
						<br />
						<br />
						<h6>{details.location}</h6>
						<br />
						<br />
						<h6>{datePosted.substring(0, 15)}</h6>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
