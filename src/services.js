import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import ReportIcon from '@mui/icons-material/Report';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Grid, TextField, Fab } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Footer from './Components/Footer';
import ListSubheader from '@mui/material/ListSubheader';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './css/market.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './Components/serviceCard';

const drawerWidth = 240;

export default function Services(props) {
	//state to store all listings
	const [listings, setListings] = useState([]);
	const navigate = useNavigate();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [city, setCity] = useState('');
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

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	useEffect(() => {
		if (city !== '') {
			axios
				.get(
					`${process.env.REACT_APP_SERVER}/api/services/getServiceByLocation/${city}`,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then((res) => {
					setListings(res.data.post);
				})
				.catch((e) => {
					console.log('Request failed : ' + e);
				});
		} else {
			axios
				.get(
					`${process.env.REACT_APP_SERVER}/api/services/getAllServices`,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then((res) => {
					setListings(res.data.posts);
				})
				.catch((e) => {
					console.log('Request failed : ' + e);
				});
		}
	}, [city]);

	const drawer = (
		<div className="container">
			<Toolbar />
			<Divider />
			<Divider />
			<List>
				<ListSubheader>Post Service Listing</ListSubheader>
				<Link to="/postService">
					<Fab color="primary" aria-label="add" sx={{ margin: 2 }}>
						<AddIcon />
					</Fab>
				</Link>
			</List>
			<ListSubheader>Filter by Service Type</ListSubheader>
			<List>
				{['Pet Sitting', 'Pet Grooming', 'Pet Walking', 'Other'].map(
					(text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
		</div>
	);

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
				<Link to="/reports" className="linkSidebar">
					<IconButton
						size="large"
						aria-label="show all reports"
						color="inherit"
					>
						<ReportIcon />
					</IconButton>
					<p>Reports</p>
				</Link>
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

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className="navi"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
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
							<Link to="/reports" className="link">
								<IconButton
									size="large"
									aria-label="show all reports"
									color="inherit"
								>
									<ReportIcon />
								</IconButton>
							</Link>
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
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', sm: 'block' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 0,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<div id="outer">
						<div className="inner">
							<TextField
								id="outlined-basic"
								label="search item"
								variant="outlined"
								sx={{ width: 350 }}
								className="msgBtn"
							/>
						</div>
						<div className="inner">
							<Button
								className="msgBtn2"
								variant="contained"
								size="large"
								sx={{ backgroundColor: ' #293241', marginTop: 3 }}
							>
								Search
							</Button>
						</div>
						<div className="inner">
							<Box sx={{ width: '10em' }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">City</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={city}
										label="City"
										onChange={handleChange}
									>
										<MenuItem value={''}>--</MenuItem>
										<MenuItem value={'Halifax'}>Halifax</MenuItem>
										<MenuItem value={'Toronto'}>Toronto</MenuItem>
										<MenuItem value={'Montreal'}>Montreal</MenuItem>
										<MenuItem value={'Vancouver'}>Vancouver</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>
					</div>

					<div className="container">
						<Box mt={3}>
							<Grid container>
								{listings.length === 0
									? `No service listings in ${city}`
									: listings.map((element) => {
											return (
												<Grid item xs={12} sm={12} md={6} lg={4} spacing={2}>
													<ServiceCard listing={element} />
												</Grid>
											);
									  })}
							</Grid>
						</Box>
					</div>
					<Footer />
				</Box>
			</Box>
		</div>
	);
}
