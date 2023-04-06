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

		this._inputs = Array.from( this._form.querySelectorAll(classes.inputSelector));
		this._btnSubmit = this._form.querySelector(classes.submitButtonSelector);
	}

	_setEventListeners = () => {
		const form = this._form;
		const classes = this._classes;
		const inputs = this._inputs;

		inputs.forEach((inputElement) => {

			inputElement.addEventListener('input', (e) => {
				this._toggleInputState(inputElement);
				this._toggleBtnState();
			});

		});

		// делаем так, чтобы при загрузке страницы кнопка была неактивна (disabled)
		this._toggleBtnState();
	};

	_toggleInputState = (inputElement) => {
		const isValid = inputElement.validity.valid;
		const inputElementId = inputElement.id;
		const errorElement = this._form.querySelector(`#${inputElementId}-error`);

		if (!isValid) {
			this._addStateInputError(inputElement);

			this._showMessageInputError(errorElement, inputElement);
		} else {
			this._removeStateInputError(inputElement);

			this._hideMessageInputError(errorElement, inputElement);
		}
	}

	_addStateInputError = (inputElement) => {
		const classes = this._classes;
		inputElement.classList.add(classes.inputErrorClass);
	}
	_removeStateInputError = (inputElement) => {
		const classes = this._classes;
		inputElement.classList.remove(classes.inputErrorClass);
	}

	_showMessageInputError = (errorElement, inputElement) => {
		const classes = this._classes;
		if (errorElement) {
			errorElement.textContent = inputElement.validationMessage;
			errorElement.classList.add(classes.errorClass)
		}
	}
	_hideMessageInputError = (errorElement) => {
		const classes = this._classes;
		if (errorElement) {
			errorElement.textContent = '';
			errorElement.classList.remove(classes.errorClass)
		}
	}


	_toggleBtnState = () => {
		const checkValid = this._inputs.every(el => {
			return el.validity.valid;
		});

		console.log(`checkValid = ${checkValid}`)
		if (!checkValid) {
			this._disableButton();
		} else {
			this._enableButton();
		}
	};

	_disableButton = () => {
		const classes = this._classes;
		this._btnSubmit.classList.add(classes.inactiveButtonClass);
		this._btnSubmit.disabled = true;
	}

	_enableButton = () => {
		const classes = this._classes;
		this._btnSubmit.classList.remove(classes.inactiveButtonClass);
		this._btnSubmit.disabled = false;
	}



	enableValidation(){
		this._setEventListeners();
	}
}