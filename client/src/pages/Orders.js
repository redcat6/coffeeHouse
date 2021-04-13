import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { OrdersList } from '../components/OrdersList';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const fetchData = useCallback(async () => {
		try {
			const data = await request('/adm/orders', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setOrders(data);
		}
		catch (err) { }
	}, [token, request]);

	const fullfillOrder = async (id) => {
		try {
			const data = await request('/adm/orders/fullfill', 'POST', { id }, {
				Authorization: `Bearer ${token}`
			})
			setOrders(orders.filter(ord => ord._id !== data._id))
		}
		catch (err) { }
	}
	const deleteOrder = async (id) => {
		try {
			const data = await request('/adm/orders/delete', 'DELETE', { id }, {
				Authorization: `Bearer ${token}`
			})
			setOrders(orders.filter(ord => ord._id !== data._id))
		}
		catch (err) { }
	}

	useEffect(() => {
		fetchData()
	}, [fetchData]);

	if (loading) {
		return (<Loader />)
	}
	else if (orders) {
		return (<OrdersList orders={orders} onFullfill={fullfillOrder} onDelete={deleteOrder} />)
	}
	return (
		<>
			<h5>No orders yet</h5>
		</>
	)
}

export default Orders