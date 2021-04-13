import React from 'react';
import { useHistory } from 'react-router-dom';
import { OrderCard } from './OrderCard';

export const UserCard = ({ card, onFullfill, onDelete }) => {

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	const history = useHistory();
	const changeHandler = async (event) => {
		event.preventDefault();
		if (event.target.checked) {
			onFullfill(card._id);
		}
	}
	const deleteHandler = event => {
		event.preventDefault();
		onDelete(card._id);
	}
	const editHandler = event => {
		event.preventDefault();
		history.push(`/adm/orders/${card._id}`);
	}
	return (
		<li className="dark-color collection-item"
			key={card._id}>
			<label>
				<input type="checkbox" onChange={changeHandler} />
				<span className="offset-right">Order for: {card.userName}</span>
			</label>
			<span className="offset-right">Phone: {card.phone}</span>
			<span className="offset-right">Data: {new Date(card.data).toLocaleDateString("en", options)}</span>
			<span className="right">
				<a className="btn-small waves-effect blue-grey darken-1 offset-right"
					onClick={editHandler}>
					<i className="material-icons">edit</i>
				</a>
				<a className="btn-small waves-effect blue-grey darken-1"
					onClick={deleteHandler}>
					<i className="material-icons">delete</i>
				</a>
			</span>
			<OrderCard order={card.order} orderId={card._id} key={card._id} />
			<div className="strong">Suma: {card.suma} Lei</div>
		</li>
	)
}