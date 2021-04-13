import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, request, error, clearError } = useHttp();
	const [form, setForm] = useState({
		email: '', password: ''
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, [])

	const registerHandler = async () => {
		try {
			const data = await request('/adm/register', 'POST', { ...form });
			message(data.message);
		}
		catch (err) {/*мы ошибки обрабатываем в hook*/ }
	}
	const loginHandler = async () => {
		try {
			const data = await request('/adm/login', 'POST', { ...form });
			auth.login(data.token, data.userId);
		}
		catch (err) {/*мы ошибки обрабатываем в hook*/ }
	}
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>CoffeeHouse</h1>
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">SignIn</span>
						<div>
							<div className="input-field">
								<input id="email"
									name="email"
									className="white-input"
									type="text"
									value={form.email}
									onChange={changeHandler} />
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input id="password"
									name="password"
									className="white-input"
									type="password"
									value={form.password}
									onChange={changeHandler} />
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-1 btn-small offset-right"
							onClick={loginHandler}
							disabled={loading}
						>SignIn
						</button>
						<button className="btn grey lighten-1 black-text btn-small"
							onClick={registerHandler}
							disabled={loading}
						>Registration
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth;