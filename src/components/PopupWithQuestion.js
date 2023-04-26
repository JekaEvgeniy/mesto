import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {

	constructor({ selector, handleFormSubmit }) {
		super(selector);

		this._handleFormSubmit = handleFormSubmit;
		this._btnRemove = this._popup.querySelector('.popup__button');
	}

  // setTarget(target) {
  //   this._target = target;
  // }

	setEventListeners() {
		super.setEventListeners();

		this._btnRemove.addEventListener('click', (e) => {
			e.preventDefault();
			// console.log(`${this._target = target}`);
			// console.log(`>>> PopupWithQuestion.js REMOVE = ${this._target}`);

			this._handleFormSubmit(this._target);
		});
	}

}
