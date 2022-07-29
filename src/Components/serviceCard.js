
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../css/listingCard.css';
import { ButtonBase } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceCard({ listing }) {
	const [name, setName] = useState('');
	const [pic, setPic] = useState('');
	const [prop, setProp] = useState({});
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER}/api/profile/getInfoById/` +
					listing.userId,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				setName(res.data.response.firstName + ' ' + res.data.response.lastName);
				setPic(res.data.response.profileImage);
				setProp({
					name: res.data.response.firstName + ' ' + res.data.response.lastName,
					pic: res.data.response.profileImage,
					userId: res.data.response.userId,
				});
			})
			.catch((e) => {
				console.log('Request failed : ' + e);
			});
	}, []);

	return (
		<Link
			to={`/serviceDetails/${listing._id}`}
			state={{
				poster: prop,
			}}
		>
			{/* <Link to={`/serviceDetails/${listing._id}`} > */}
			<ButtonBase>
				<Card
					sx={{ width: '20rem', margin: 2, padding: 2, height: 500 }}
					className="cards"
				>
					<CardHeader
						avatar={
							<Avatar
								sx={{ bgcolor: red[500] }}
								aria-label="recipe"
								src={pic}
							></Avatar>
						}
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title={name}
						subheader={new Date(listing.createdAt).toString().substring(0, 15)}
					/>
					
					<CardMedia
						component="img"
						height="194"
						image={listing.image}
						alt=" "
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{listing.title}
					</Typography>
						<Typography variant="body2" color="text.secondary">
							{listing.description}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<IconButton aria-label="add to favorites">
							<FavoriteIcon />
						</IconButton>
						<IconButton aria-label="share">
							<EmailIcon />
						</IconButton>
					</CardActions>
				</Card>
			</ButtonBase>
		</Link>
	);
}
