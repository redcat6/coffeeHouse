import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';

const Menu = () => {

	const [coffees, setCoffees] = useState([]);
	const { loading, request } = useHttp();

	const fetchData = useCallback(async () => {
		try {
			const data = await request('/menu', 'GET', null, {});
			setCoffees(data);
		}
		catch (err) { }
	}, [request]);

	useEffect(() => {
		fetchData();
	}, [fetchData])
	return (
		<div>
			<h4>Menu</h4>
			<div className="offset-down row">
				{coffees.map(item => {
					return (
						<div key={item.id} className="col s3">
							<img src={`./images/coffees/${item.coffee}.png`} />
							<div className="text-white">{item.coffee}</div>
						</div>
					)
				})
				}
			</div>
		</div >
	)
}

export default Menu;