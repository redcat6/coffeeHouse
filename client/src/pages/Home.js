import React, { useEffect } from 'react';
import { Modal } from '../components/Modal';
import { Footer } from '../components/Footer';

const Home = () => {

	useEffect(() => {
		const orderForm = document.querySelectorAll('.modal');
		window.M.Modal.init(orderForm);
	}, []);

	return (
		<div>
			<div className="row">
				<div className="col s3">
					<p className="text-enjoy">Enjoy</p>
					<p className="text-your">Your</p>
					<p className="text-coffee">Coffee</p>
					<a href="/modal" data-target="modal1"
						className="button-buy btn modal-trigger">Buy now
				</a>
				</div>
				<div className="col s6">
					<img src="./images/coffeeBeans.png" alt="" />
					<div className="mug">
						<img src="./images/mug.png" alt="" />
					</div>
					<div className="shape">
						<img src="./images/shape.png" alt="" />
						<span className="shape-text">Offer prise</span>
						<span className="shape-price">$5.00</span>
					</div>
				</div>
				<div className="col s3">
					<ul className="right-list">
						<li>Cappuccino</li>
						<li>Espresso</li>
						<li>Latte</li>
					</ul>
				</div>
				<Modal />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Home;