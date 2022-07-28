import React, { useState, useEffect } from 'react';
import {
	Card,
	IconButton,
	CardHeader,
	Menu,
	CardMedia,
	CardContent,
	MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../css/profile/post.css';
import axios from 'axios';
export default function Post({ values, elements, setState }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [deleteModal, setDeleteModal] = useState(false);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const toggleDeletePost = () => {
		handleClose();
		var id = elements._id;
		let body = { id: id };
		setDeleteModal(!deleteModal);
		axios
			.delete(
				`${process.env.REACT_APP_SERVER}/api/profile/deletePost/` +
					id,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('jwtToken'),
					},
				}
			)
			.then(() => {
				alert('deleted');
				setState({});
			})
			.catch((e) => alert(e));
	};

	return (
		<Card className="mb-5 text-start">
			<CardHeader
				action={
					<IconButton
						size="small"
						edge="end"
						id="delete-menu"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						color="inherit"
					>
						<MoreVertIcon />
					</IconButton>
				}
				title={values.firstName + ' ' + values.lastName}
				subheader={new Date(elements.createdAt).toString().substring(0, 15)}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'delete-menu',
				}}
			>
				<MenuItem onClick={toggleDeletePost}>Delete</MenuItem>
			</Menu>
			<CardMedia
				className="px-3"
				component="img"
				id="imagecard"
				image={elements.image}
				alt="Two puppies"
			/>
			<CardContent>{elements.caption}</CardContent>
		</Card>
	);
}
