import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {

	constructor({ selector, handleFormSubmit }) {
		super(selector);

		this._form = this._popup.querySelector('.popup__form');

		this._handleFormSubmit = handleFormSubmit;
		// this._btnRemove = this._popup.querySelector('.popup__button');
	}

  // setTarget(target) {
  //   this._target = target;
  // }

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (e) => {
			e.preventDefault();
			console.log(`???`);
			// console.log(`${this._target = target}`);
			// console.log(`>>> PopupWithQuestion.js REMOVE = ${this._target}`);

			this._handleFormSubmit();
		});
	}

	formSubmit(action){
		this._handleFormSubmit = action;
	}

}
