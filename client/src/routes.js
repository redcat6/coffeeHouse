import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './pages/Menu.js';
import Coffees from './pages/Coffees.js';
import Orders from './pages/Orders.js';
import Order from './pages/Order.js';
import Auth from './pages/Auth.js';
import Home from './pages/Home.js';

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route exact path="/adm/orders">
					<Orders></Orders>
				</Route>
				<Route exact path="/adm/coffees">
					<Coffees></Coffees>
				</Route>
				<Route path="/adm/orders/:id">
					<Order></Order>
				</Route>
				<Redirect to="/adm/orders"></Redirect>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/adm/login" exact>
				<Auth></Auth>
			</Route>
			<Route path="/" exact>
				<Home></Home>
			</Route>
			<Route path="/menu" exact>
				<Menu></Menu>
			</Route>
			<Redirect to="/"></Redirect>
		</Switch>
	)
}