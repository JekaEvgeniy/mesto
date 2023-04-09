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
		const errorElement = this._getErrorMessage(inputElement);

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

	_getErrorMessage(inputElement){
		return this._form.querySelector(`#${inputElement.id}-error`);
	}

	resetValidation() {
	// перед открытием модалки сбрасываем поля и кнопку.
	// очищаем заполненные поля формы, чтобы при повторном открытии popup
	// в инпутах не было предыдущих значений:

		const inputs = this._inputs;

		inputs.forEach((inputElement) => {
			const errorElement = this._getErrorMessage(inputElement);

			this._removeStateInputError(inputElement);
			this._hideMessageInputError(errorElement, inputElement);
		});

		this._disableButton();
	}

	enableValidation(){
		this._setEventListeners();
	}
}