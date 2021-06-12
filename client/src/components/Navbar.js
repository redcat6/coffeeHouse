import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = isAuthenticated => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const logoutHandler = event => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	}

	if (isAuthenticated.isAuthenticated) {
		return (
			<nav>
				<div className="nav-wrapper blue-grey darken-1">
					<a href="/" className="brand-logo">CoffeeHouse</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><NavLink to="/adm/orders">Orders</NavLink></li>
						<li><NavLink to="/adm/coffees">Coffees</NavLink></li>
						<li><a href="/" onClick={logoutHandler}>LogOut</a></li>
					</ul>
				</div>
			</nav>
		)
	}
	else {
		return (
			<nav>
				<div className="nav-wrapper black">
					<a href="/" className="brand-logo">
						<img className="logo" src="./images/logo.png" alt="coffeeHouse" />
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><NavLink to="/">Home</NavLink></li>
						<li><NavLink to="/menu">Menu</NavLink></li>
						<li><NavLink to="/offers">Offers</NavLink></li>
					</ul>
				</div>
			</nav>
		)
	}
}











