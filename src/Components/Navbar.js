
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ReportIcon from '@mui/icons-material/Report';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import '../css/navbar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleLogout = () => {
		localStorage.clear();
		alert('Logout Successful, redirecting to login');
		navigate('/login');
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
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
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
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
					Marketplce
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
						<Badge badgeContent={4} color="error">
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
					Reports
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

	return (
		<Box sx={{ flexGrow: 1 }} className="navi">
			<AppBar position="fixed" className="navi">
				<Toolbar className="navi">
					<Link to="/" className="link">
						<PetsIcon sx={{ display: { md: 'flex' }, mr: 2 }} />
					</Link>
					<Typography
						variant="h4"
						noWrap
						component="a"
						sx={{
							display: { xs: 'none', sm: 'block' },
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
		</Box>
	);
}
