'use strict';
//menu
const list = document.querySelectorAll('.menu__link');
function addActiveClass(event) {
	const active = event.target;
	//console.log(event);
	active.classList.add('active');
	for (let item of list) {
		if (item == active) {
			continue;
		}
		if (item.classList.contains("active")) {
			item.classList.remove('active');
		}
	}
}
for (let item of list) {
	item.addEventListener('click', addActiveClass);
}

// modal window
const modal = document.querySelector('.modal');
const modal_overlay = document.querySelector('.modal__overlay');

const form = document.querySelector('.contact__form');
//inputs HTML collections
const listBox = document.querySelectorAll('.modal__checkbox');
const listNums = document.querySelectorAll('.modal__number');

const userName = document.querySelector('#userName');
const phone = document.querySelector('#phone');

//buttons
const close_btn = document.querySelector('.close');//close modal
const byu_btn = document.querySelector('.button__buy');//open modal
const submit_btn = document.querySelector('#submit');
const reset_btn = document.querySelector('#reset');
//error, msg
const msg = document.querySelector('.modal__message');
//constants
const PRICE = 5;//$

//toggle modal
function openCloseModal() {
	modal.classList.toggle("open");
	modal_overlay.classList.toggle("open");
	resetData();
}
//reset data
function resetData() {
	msg.style.color = "black";
	msg.textContent = '';
}
close_btn.addEventListener('click', openCloseModal);
byu_btn.addEventListener('click', openCloseModal);
//check userName & phone
userName.addEventListener('focus', resetData);
phone.addEventListener('focus', resetData);

//submit order
submit_btn.addEventListener('click', async function (event) {
	event.preventDefault();
	//check form
	if (userName.value == '') {
		msg.style.color = "darkred";
		msg.textContent = 'Name is the required field!';
		return;
	};
	let userPhone = phone.value;

	if (userPhone.length != 9 || userPhone[0] != '0') {
		msg.style.color = "darkred";
		msg.textContent = 'Please, type your phone in proper format!';
		return;
	};
	//price
	let summ = 0;
	for (let item of listNums) {
		if (item.value > 0) {
			summ += parseInt(item.value);
		}
	}
	//chack num of coffee cup
	if (summ == 0) {
		msg.style.color = "darkred";
		msg.textContent = 'You have no orders!';
		return;
	}
	//collect data
	const obj = {
		userName: userName.value,
		phone: phone.value
	}
	//order
	let order = {};
	for (let item of listNums) {
		if (item.value > 0) {
			order[item.name] = parseInt(item.value);
		}
	}
	obj.order = order;
	//to JSON
	const jsonOrder = JSON.stringify(obj);
	//console.log(jsonOrder);
	try {
		//send to server
		let request = await fetch('/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset="utf-8"'
			},
			body: JSON.stringify(obj)
		});
		//ждём ответа
		let response = await request.json();
		//console.log(response);
		if (response) {
			//fitback
			msg.style.color = "black";
			msg.textContent = `Your order has been accepted. The price is $${PRICE * summ} Thank you`;
			setTimeout(openCloseModal, 5000);
		}
	}
	catch (error) {
		msg.style.color = "red";
		msg.textContent = `Error: ${error.message}`
	}
})
reset_btn.addEventListener('click', resetData);

for (let box of listBox) {
	box.addEventListener('change', function (event) {
		resetData();
		const element = event.target;
		const num = element.nextElementSibling;
		if (element.checked) {
			num.value = 1;
		}
		else {
			num.value = 0;
		}
	});
}
for (let item of listNums) {
	item.addEventListener('change', function (event) {
		resetData();
		const el = event.target;
		const box = el.previousElementSibling;
		if (el.value > 0) {
			box.checked = true;
		}
		else {
			box.checked = false;
		}
	});
}



