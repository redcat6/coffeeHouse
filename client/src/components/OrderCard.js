import React from 'react';

export const OrderCard = ({ order, orderId }) => {
	return (
		<ul>
			{Object.keys(order).map((coffee, index) => {
				return <li key={orderId + index}> {coffee}: {order[coffee]}</li>
			})}
		</ul>
	)
}