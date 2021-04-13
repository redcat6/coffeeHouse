import React from 'react';
import { UserCard } from './UserCard';

export const OrdersList = ({ orders, onFullfill, onDelete }) => {
	return (
		<>
			<h5>Orders</h5>
			<ul className="collection">
				{orders.map(card => {
					return (<UserCard card={card} key={card._id} onFullfill={onFullfill} onDelete={onDelete} />)
				})}
			</ul >
		</>
	)
}