import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import ResetPassword from './ResetPassword';
import Market from './Market';
import ProductDetails from './productDetails';
import Services from './services';
import ViewProfile from './Components/viewProfile';
import Messenger from './Components/messaging/Messenger';
import CreateListingMarket from './Components/Forms/createListingMarket';
import CreateListingService from './Components/Forms/createListingService';
import Reports from './Components/Report/ShowReport';
import ServiceDetails from './serviceDetails';
import Favourites from './Favourites';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/viewprofile/:id" element={<ViewProfile />} />
					<Route path="/resetPassword" element={<ResetPassword />} />
					<Route path="/market" element={<Market />} />
					<Route path="/services" element={<Services />} />
					<Route path="/productDetails/:id" element={<ProductDetails />} />
					<Route path="/serviceDetails/:id" element={<ServiceDetails />} />
					<Route path="/messenger" element={<Messenger />} />
					<Route path="/postAd" element={<CreateListingMarket />} />
					<Route path="/postService" element={<CreateListingService />} />
					<Route path="/reports" element={<Reports />} />
					<Route path="/favourites" element={<Favourites />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
