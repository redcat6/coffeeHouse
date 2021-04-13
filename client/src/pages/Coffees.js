import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { CoffeesList } from '../components/CoffeesList';
import { useMessage } from '../hooks/message.hook';

const Coffees = () => {
	const [coffees, setCoffees] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const message = useMessage();

	const fetchData = useCallback(async () => {
		try {
			const data = await request('/adm/coffees', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setCoffees(data);
		}
		catch (err) { }
	}, [token, request]);

	const addCoffee = async ({ coffee, price }) => {

		if (!coffee || !price) {
			return message('Print correct data, please')
		}
		try {
			const data = await request('/adm/coffees', 'POST', { coffee, price }, {
				Authorization: `Bearer ${token}`
			})
			setCoffees(coffees.concat([data]));
		}
		catch (err) { }
	}
	const deleteItem = async (id) => {
		try {
			const data = await request('/adm/coffees/delete', 'POST', { id }, {
				Authorization: `Bearer ${token}`
			})
			setCoffees(coffees.filter(it => it._id !== data._id));
		}
		catch (err) { }
	}

	useEffect(() => {
		fetchData()
	}, [fetchData]);

	if (loading) {
		return (<Loader />)
	}
	return (
		<>
			{!loading && coffees && <CoffeesList coffees={coffees} add={addCoffee} deleteItem={deleteItem} />}
		</>
	)
}

export default Coffees;