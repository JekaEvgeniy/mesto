import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ selector, handleFormSubmit }) {
		super(selector);

		this._form = this._popup.querySelector('.popup__form');
		this._handleFormSubmit = handleFormSubmit;

		this._inputs = this._form.querySelectorAll('.popup__input');
		this._button = this._popup.querySelector('.popup__button');
		this._inputsValuesObj = {};
	}

	_getInputValues(){
		this._inputs.forEach( (input)=>{
			this._inputsValuesObj[input.name] = input.value;
		});

		return this._inputsValuesObj;
	}

	close(){
		super.close();

		if ( this._form) {
			this._form.reset();
		}
	}

	replaceBtnText(defaultText, replaceText, value){
		super.replaceBtnText(defaultText, replaceText, value);
	}

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (e) => {
			e.preventDefault();

			this._handleFormSubmit( this._getInputValues() );
		});
	}

}