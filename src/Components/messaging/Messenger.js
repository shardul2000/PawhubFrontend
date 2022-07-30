import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import MoreIcon from '@mui/icons-material/MoreVert';
import { Grid, TextField, Menu, MenuItem,ListSubheader, Divider, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Message from './message';

const drawerWidth = 240;

export default function Messenger(props) {

	const navigate = useNavigate();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const menuId = 'primary-search-account-menu';

	const [ typeText, setTypeText] = useState("");
    
	const handleTypeText = (e) => {
		setTypeText(e.target.value);
	}
	const submitMessage = () => {
       alert(typeText);
	   setTypeText("");
	}

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

	const drawer = (
		<div className="container">
			<Toolbar />
			<List>
				<ListSubheader>Your Chats</ListSubheader>
                    <Divider />
                    <ListItem disablePadding>
                         <ListItemButton>
                              <Avatar sx={{marginBlock:2, marginRight:2, height:'3em', width:'3em'}}></Avatar>
                              <ListItemText>Sarah Bond</ListItemText>
                         </ListItemButton>
				</ListItem>
				  {['Cages', 'rr','Beauty'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
                      ))} 
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
							{
							localStorage.getItem("uid")===null?(
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
							):(<></>)
						}
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
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
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
				<Box component="main" sx={{flexGrow: 1,p: 0,width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
				         <div style={{minHeight:'5em', width:'100%'}}>
                         </div>
                         <div style={{minHeight:'30em'}}>
                            <div className='container'>
						     	<Grid container spacing={2}>
								    <Grid item xs={0} sm={1} md={2}></Grid>
									<Grid item xs={12} sm={10} md={8}>			
										<Message message={'Hednekejne fhbr wkdme rfrr ene edned endeu no'} own={false}/>
										<Message message={'Hello'} own={false}/>
										<Message message={'Hello'} own={true}/>
										<Message message={'Hello'} own={false}/>
										<Message message={'Hello'} own={false}/>
										<Message message={'Hello'} own={false}/>
										<Message message={'Hello'} own={true}/>
										<Message message={'Hello'} own={false}/>
										<Message message={'Hello'} own={false}/>
									</Grid>
									<Grid item xs={0}sm={1} md={2}></Grid>
								</Grid>
								<Grid container spacing={2} sx={{marginBottom:6}}>
								    <Grid item xs={0} sm={1} md={2}></Grid>
									<Grid item xs={12} sm={10} md={8}>	
										<div style={{display:'inline-block', width: '90%'}}>
											<TextField variant='outlined'id="outlined-basic" label="Type message" value={typeText} sx={{marginInline:1.5, width:'100%'}} onChange={handleTypeText} />  
										</div>	
										<div style={{display:'inline-block', width: '10%'}}>
										   <IconButton aria-label="delete" size="large" sx={{display:'inline-block', marginTop:3.3, marginInline:1}} onClick={submitMessage} >
												<SendIcon sx={{ marginInline:1}} />
											</IconButton>
										</div>	
									</Grid>
									<Grid item xs={0}sm={1} md={2}></Grid>
								</Grid>





								
                            </div>                
                         </div>
					<Footer />
				</Box>
			</Box>
		</div>
	);
}
