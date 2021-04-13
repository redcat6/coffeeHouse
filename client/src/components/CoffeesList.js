import { useState } from "react";

export const CoffeesList = ({ coffees, add, deleteItem }) => {

	const [coffee, setCoffee] = useState('');
	const [price, setPrice] = useState('');

	const addHandler = event => {
		event.preventDefault();
		add({ coffee, price });
	}
	const deleteHandler = event => {
		event.preventDefault();
		let id = event.target.name;
		if (!event.target.name) {
			id = event.target.parentElement.name;
		}
		deleteItem(id);
	}
	return (
		<>
			<h5>Coffees</h5>
			<div className="dark-color row">
				<div className="input-field col s3">
					<input id="coffee" type="text" value={coffee}
						className="white-input"
						onChange={event => setCoffee(event.target.value)} />
					<label htmlFor="coffee">Coffee</label>
				</div>
				<div className="input-field col s1 offset-right">
					<input id="price" type="text" value={price}
						className="white-input"
						onChange={event => setPrice(event.target.value)} />
					<label htmlFor="price">Price</label>
				</div>
				<a className="btn-small waves-effect blue-grey darken-1"
					onClick={addHandler}>add
				</a>
			</div>
			<ul className="collection">
				{coffees.map(item => {
					return (
						<li key={item._id} className="dark-color collection-item">
							<div className="row">
								<div className="col s2">{item.coffee}</div>
								<div className="col s1">{item.price}</div>
								<div className="col right">
									<a className="btn-small waves-effect blue-grey darken-1"
										name={item._id}
										onClick={deleteHandler}>
										<i className="material-icons">delete</i>
									</a>
								</div>
							</div>
						</li>
					)
				})}
			</ul >
		</>
	)
}
