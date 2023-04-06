export default class FormValidator {

	constructor(classes, form) {
		this._classes = classes; // validationConfig
		this._form = form; // Текущая форма

		this._formSelector  = classes.formSelector;
		this._inputSelector = classes.inputSelector;
		this._submitButtonSelector = classes.submitButtonSelector;
		this._inactiveButtonClass = classes.inactiveButtonClass;
		this._inputErrorClass = classes.inputErrorClass;
		this._errorClass = classes.errorClass;
	}

	enableValidation(){
		console.log(this);
		// this._setEventListeners();
	}
}