import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { EditOrder } from '../components/EditOrder';
import { useMessage } from '../hooks/message.hook';

const Order = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, request } = useHttp();
	const [order, setOrder] = useState(null);
	const orderId = useParams().id;

	const getOrder = useCallback(async () => {
		try {
			const fetched = await request(`/adm/orders/${orderId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`
			});
			setOrder(fetched);
		}
		catch (err) { }
	}, [auth.token, orderId, request]);

	const deleteItem = async (key) => {
		const keys = Object.keys(order.order).filter(item => item !== key)
		if (!keys.length) {
			//can't delete an order
			return message(`The ${key} is single item. Cancel your order, please`)
		}
		const newOrder = {}
		keys.map(i => newOrder[i] = order.order[i])
		const newOrd = await request(`/adm/orders/deleteItem`, 'DELETE', { orderId, key, newOrder }, {
			Authorization: `Bearer ${auth.token}`
		});
		setOrder({ ...order, 'order': newOrd.order });
		message(`The ${key} was canceled`);
	}
	const editItem = async ({ coffee, num }) => {
		if (num < 1) {
			return message(`Wrong value: ${num} caps of coffee`)
		}
		const edited = await request(`/adm/orders/update`, 'POST', { orderId, coffee, num }, { Authorization: `Bearer ${auth.token}` });
		setOrder({ ...order, 'order': edited.order });
	}
	useEffect(() => {
		getOrder();
	}, [getOrder]);

	if (loading) {
		return <Loader />
	}
	return (
		<>
			{!loading && order && <EditOrder order={order} user={auth.userId} deleteItem={deleteItem} edit={editItem} />}
		</>
	)
}

export default Order;