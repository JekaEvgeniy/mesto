
/*

Создайте класс PopupWithForm
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ selector, data }) {
		super(selector); // pupWithForm.js: 20 Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor


		this._selector = document.querySelector(selector);
	}

	_getInputValues(){

	}

	close(){
		super.close();
	}

	setEventListeners() {
		console.log('>>> PopupWithForm setEventListeners()');

	}

}