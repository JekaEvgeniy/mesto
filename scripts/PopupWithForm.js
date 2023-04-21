
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
	constructor({ selector, handleFormSubmit }) {
		super(selector); // pupWithForm.js: 20 Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
		console.log(this._selector);
		this._form = this._selector.querySelector('.popup__form');
		this._handleFormSubmit = handleFormSubmit;

		this._inputs = this._form.querySelectorAll('.popup__input');
		this._inputsValuesArray = {};
	}

	_getInputValues(){
		this._inputs.forEach( (input)=>{
			// this._inputsValuesArray.push( input.value );
			this._inputsValuesArray[input.name] = input.value;

		});

		return this._inputsValuesArray;
	}

	close(){
		super.close();

		if ( this._form) {
			this._form.reset();
		}
	}

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (e) => {
			e.preventDefault();

			this._handleFormSubmit( this._getInputValues() );

			console.log('>>> Popup.js submit');
		});
	}

}