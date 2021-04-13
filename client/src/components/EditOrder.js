import React from 'react';

export const EditOrder = ({ order, user, deleteItem, edit }) => {

	const deleteHandler = event => {
		event.preventDefault();
		let key = event.target.name;
		if (!event.target.name) {
			key = event.target.parentElement.name;
		}
		deleteItem(key);
	}
	const changeHandler = event => {
		event.preventDefault();
		const coffee = event.target.name;
		const num = event.target.value;
		if (num) {
			edit({ num, coffee })
		}
	}
	return (
		<div className="container">
			<h5>Order's editing</h5>
			<div className="margin-bottom-2">Editor id: {user}</div>
			{Object.keys(order.order).map((item, index) => {
				return (
					<div className="row" key={index}>
						<div className="col s2">{item}</div>
						<div className="col s2">
							<input className="narrow" type="text" value={order.order[item]}
								name={item}
								onChange={changeHandler} />
						</div>
						<a className="btn-small waves-effect blue-grey darken-1"
							name={item}
							onClick={deleteHandler}>
							<i className="material-icons">delete</i>
						</a>
					</div>
				)
			})
			}
		</div>
	)
}