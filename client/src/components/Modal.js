import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Loader } from './Loader';

export const Modal = () => {
	const [coffees, setCoffees] = useState([]);
	const [order, setOrder] = useState({});
	const [userName, setUserName] = useState('');
	const [phone, setPhone] = useState('');

	const message = useMessage();
	const { request, loading } = useHttp();
	const fetchData = useCallback(async () => {
		try {
			const data = await request('/modal', 'GET', null, {});
			setCoffees(data);
		}
		catch (err) { }
	}, [request]);

	useEffect(() => {
		fetchData();
	}, [fetchData])

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const toggleHandler = event => {
		const coffee = event.target.value;
		const input_num = document.querySelector(`#num_${coffee}`);
		if (event.target.checked) {
			input_num.value = 1;
			if (!order[coffee]) {
				setOrder({ ...order, [coffee]: input_num.value });
			}
		} else {
			input_num.value = 0;
			if (order[coffee]) {
				delete order[coffee];
				setOrder(order);
			}
		}
	}
	const changeHandler = event => {
		const id = event.target.id.split('_')[1];
		const box = document.querySelector(`#${id}`);
		if (event.target.value > 0) {
			box.checked = true;
			setOrder({ ...order, [id]: event.target.value });
		}
		else {
			box.checked = false;
			//console.log(order[id]);
			if (order[id]) {
				delete order[id]
				setOrder(order);
			}
		}
	}
	const clickHandler = async (event) => {
		event.preventDefault();
		//data validation
		if (!userName.trim()) {
			return message('Enter your name, please');
		}
		if (!phone.trim() || phone.trim()[0] !== '0' || phone.trim().length !== 9) {
			return message('Enter your phone in proper format, please');
		}
		if (!Object.keys(order).length) {
			return message('Choose coffee, please');
		}
		const keys = Object.keys(order);
		const suma = keys.reduce((sum, key) => {
			const coffee = coffees.find(item => item.coffee === key);
			return sum += coffee.price * parseInt(order[key])
		}, 0)
		//send data
		try {
			await request('/adm/orders', 'POST', { userName, phone, order, suma });
			message(`Your order is accepted. Expected delivery time is 10 minutes. Total cost: ${suma} Lei. Thank you`);
		}
		catch (err) {/*мы ошибки обрабатываем в hook*/ }
	}
	const calculate = (event) => {
		event.preventDefault();
		//data validation
		if (!Object.keys(order).length) {
			return message('Choose coffee, please');
		}
		const keys = Object.keys(order);
		const suma = keys.reduce((sum, key) => {
			const coffee = coffees.find(item => item.coffee === key);
			return sum += coffee.price * parseInt(order[key])
		}, 0)
		message(`Total cost will be: ${suma} Lei`);
	}
	if (loading) {
		<Loader />
	}
	return (
		<div id="modal1" className="modal offset-down">
			<div className="modal-content">
				<h5>Order coffee form</h5>
				<div className="row">
					<form className="col s12" action="/adm/order" method="POST" name="contact-form">
						<div className="row">
							<div className="input-field col s6 offset-right">
								<input id="userName" type="text" value={userName}
									onChange={event => setUserName(event.target.value)} />
								<label htmlFor="userName">Full name</label>
							</div>
							<div className="input-field col s5">
								<input placeholder="061234567" id="phone" type="text" value={phone}
									onChange={event => setPhone(event.target.value)} />
								<label htmlFor="phone">Phone</label>
							</div>
						</div>
						{coffees.map(item => {
							return (
								<div key={item.coffee}>
									<label htmlFor={item.coffee}>
										<input type="checkbox" id={item.coffee} value={item.coffee} onChange={toggleHandler} />
										<span>{item.coffee + ' - ' + item.price + ' Lei'}</span>
									</label>
									<span className="container-number">
										<input className="number" type="number" min="0"
											defaultValue="0"
											id={"num_" + item.coffee}
											onChange={changeHandler} />
									</span>
								</div>)
						})}
						<div className="modal-footer">
							<a className="waves-effect waves-light btn"
								onClick={calculate}>Calculate</a>
							<a className="waves-effect waves-light btn"
								onClick={clickHandler}>Send</a>
							<a className="modal-close waves-effect waves-green btn-flat">Decline</a>
						</div>
					</form>
				</div>
			</div>
		</div >
	)
}
