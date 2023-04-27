import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {

	constructor({ selector, handleFormSubmit }) {
		super(selector);

		this._form = this._popup.querySelector('.popup__form');
		this._button = this._popup.querySelector('.popup__button');

		this._handleFormSubmit = handleFormSubmit;
	}

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (e) => {
			e.preventDefault();

			this._handleFormSubmit();
		});
	}

	replaceBtnText(defaultText, replaceText, value) {
		super.replaceBtnText(defaultText, replaceText, value);
	}

	formSubmit(action){
		this._handleFormSubmit = action;
	}

}
