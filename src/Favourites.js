import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Footer from './Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import './css/favourites.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FavouriteCard from './Components/Favourites/favouriteCard';

export default function Favourites() {


	//create list of favourites for a specific client id
	//create post list using post id's from list mentioned above 
	const [favList, setFavList] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER}/api/favourites/getFavourites/${localStorage.getItem("uid")}`,{ headers: {
			"Content-Type":"application/json",
			Authorization: localStorage.getItem("jwtToken")
		}})
		.then((res) => {
             setFavList(res.data.listings);
		})
		.catch((e) => {
			console.log("Request failed : " + e);
		});


	},[]);

	

	//Sarah: Inheriting Components for header/nav/footer
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const menuId = 'primary-search-account-menu';

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link to="/profile">
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>
            <Link to="/favourites">
				<MenuItem onClick={handleMenuClose}>Favourites</MenuItem>
			</Link>
			<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size="large" color="inherit">
					<HomeIcon />
				</IconButton>
				<Link to="/" className="linkSidebar">
					Home
				</Link>
			</MenuItem>
			<MenuItem>
				<IconButton size="large" color="inherit">
					<StorefrontIcon />
				</IconButton>
				<Link to="/market" className="linkSidebar">
					Marketplace
				</Link>
			</MenuItem>
			<MenuItem>
				<IconButton size="large" color="inherit">
					<PersonSearchIcon />
				</IconButton>
				<Link to="/services" className="linkSidebar">
					Services
				</Link>
			</MenuItem>
			<MenuItem>
				<IconButton size="large" color="inherit">
					<AccountCircle />
				</IconButton>
				<Link to="/login" className="linkSidebar">
					Sign In
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to="/message" className="linkSidebar">
					<IconButton
						size="large"
						aria-label="show 4 new mails"
						color="inherit"
					>
						<Badge badgeContent={0} color="error">
							<MailIcon />
						</Badge>
					</IconButton>
					Messages
				</Link>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar>
					<Toolbar className="navi">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<Typography
							variant="h4"
							noWrap
							component="a"
							sx={{
								display: { xs: 'none', sm: 'none', lg: 'block' },
								textDecoration: 'none',
								fontFamily: 'Roboto',
								fontWeight: 900,
								letterSpacing: '.3rem',
								color: 'inherit',
							}}
						>
							<Link to="/" className="link">
								PawHub
							</Link>
						</Typography>

						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<Typography
								variant="h7"
								noWrap
								component="a"
								mt={1.5}
								mr={10}
								sx={{
									textDecoration: 'none',
									fontFamily: 'Roboto',
									fontWeight: 900,
									letterSpacing: '.3rem',
									color: 'inherit',
								}}
							>
								<Link to="/market" className="link">
									Marketplace
								</Link>
							</Typography>
							<Typography
								variant="h7"
								noWrap
								component="a"
								mt={1.5}
								mr={10}
								sx={{
									textDecoration: 'none',
									fontFamily: 'Roboto',
									fontWeight: 900,
									letterSpacing: '.3rem',
									color: 'inherit',
								}}
							>
								<Link to="/services" className="link">
									Services
								</Link>
							</Typography>
							<Typography
								variant="h7"
								noWrap
								component="a"
								mt={1.5}
								mr={10}
								sx={{
									textDecoration: 'none',
									fontFamily: 'Roboto',
									fontWeight: 900,
									letterSpacing: '.3rem',
									color: 'inherit',
								}}
							>
								<Link to="/login" className="link">
									Sign In
								</Link>
							</Typography>
							<IconButton
								size="large"
								aria-label="show 4 new mails"
								color="inherit"
								onClick={() => navigate('/message')}
							>
								<Badge badgeContent={0} color="error">
									<MailIcon />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								aria-label="show 17 new notifications"
								color="inherit"
							>
								<Badge badgeContent={17} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}

				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 0,
					}}
				>
					<Toolbar />
					
                    <Typography
                        variant="h7"
                        noWrap
                        component="a"
                        mt={1.5}
                        mr={10}
                        sx={{
                            textDecoration: 'none',
                            fontFamily: 'Roboto',
                            fontWeight: 900,
                            letterSpacing: '.2rem',
                        }}
                    >
                        <h1 className='favourite-title'>Favourites</h1>
					</Typography>

					{/* Sarah: inherit container and grid from marketplace to show all favourites for a specific client ID*/}
					<div className="container">
						<Box mt={3}>
							<Grid container>
									{/* sarah: loop through favList to show postId's favourites by current user*/}
								{	
									favList.map((element) => {
										return (
										    <Grid item xs={12} sm={12} md={6} lg={4} spacing={2}>
										       <FavouriteCard  listing={element}/>
								            </Grid>
										)
									})
								}
								
							</Grid>
						</Box>
					</div>
					<Footer />
				</Box>
			</Box>
		</div>
	);
}
