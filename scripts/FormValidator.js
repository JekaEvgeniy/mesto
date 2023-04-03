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
		this._setEventListeners();
	}

	_setEventListeners = () => {
		const form = this._form;
		const classes = this._classes;
		const inputs = Array.from(form.querySelectorAll(classes.inputSelector));
		const buttonSubmit = form.querySelector(classes.submitButtonSelector);

		inputs.forEach((inputElement) => {

			inputElement.addEventListener('input', (e) => {
				this._toggleInputState(inputElement);
				this._toggleBtnState(inputs, buttonSubmit);
			});

		});

		// делаем так, чтобы при загрузке страницы кнопка была неактивна (disabled)
		this._toggleBtnState(inputs, buttonSubmit);
	};

	_toggleInputState = (inputElement) => {
		const isValid = inputElement.validity.valid;
		const inputElementId = inputElement.id;
		const errorElement = document.querySelector(`#${inputElementId}-error`);

		if (!isValid) {
			this._addStateInputError(inputElement);

			this._showMessageInputError(errorElement, inputElement);
		} else {
			this._removeStateInputError(inputElement);

			this._hideMessageInputError(errorElement, inputElement);
		}
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

	_addStateInputError = (inputElement) => {
		const classes = this._classes;
		inputElement.classList.add(classes.inputErrorClass);
	}
	_removeStateInputError = (inputElement) => {
		const classes = this._classes;
		inputElement.classList.remove(classes.inputErrorClass);
	}

	_toggleBtnState = (inputs, buttonSubmit) => {
		const checkValid = inputs.every(el => {
			return el.validity.valid;
		});

		if (!checkValid) {
			this._disableButton(buttonSubmit);
		} else {
			this._enableButton(buttonSubmit);
		}
	};

	_disableButton = (buttonSubmit) => {
		const classes = this._classes;
		buttonSubmit.classList.add(classes.inactiveButtonClass);
		buttonSubmit.disabled = true;
	}

	_enableButton = (buttonSubmit) => {
		const classes = this._classes;
		buttonSubmit.classList.remove(classes.inactiveButtonClass);
		buttonSubmit.disabled = false;
	}

}