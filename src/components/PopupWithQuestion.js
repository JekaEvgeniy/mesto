import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {

	constructor({ selector, handleFormSubmit }) {
		super(selector);

		this._handleFormSubmit = handleFormSubmit;
		this._btnRemove = this._popup.querySelector('.popup__button');
	}

	open(id) {
		console.warn('id => ' + id);
		super.open();
	}
  setTarget(target) {
    this._target = target;
		console.log(`this._target = ${this._target}`);
  }
	setEventListeners() {
		super.setEventListeners();

		this._btnRemove.addEventListener('click', (e) => {
			e.preventDefault();
			console.log(`>>> PopupWithQuestion.js REMOVE = ${this._target}`);

			this._handleFormSubmit(this._target);
		});
	}

}

/*

https://images.unsplash.com/photo-1564416437164-e2d131e7ec07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60


*/