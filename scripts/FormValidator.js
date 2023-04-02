/*
* включение валидации вызовом enableValidation

# Создайте класс FormValidator, который настраивает валидацию полей формы:
* принимает в конструктор объект настроек с селекторами и классами формы;
* принимает вторым параметром элемент той формы, которая валидируется;
* имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
* имеет публичный метод enableValidation, который включает валидацию формы.
* Для каждой проверяемой формы создайте экземпляр класса FormValidator.

*/

export default class FormValidator {

	constructor(classes, form) {
		this._classes = classes; // validationConfig
		this._form = form; // Текущая форма

		// export const validationConfig = {
		// 	formSelector: '.popup__form',
		// 	inputSelector: '.popup__input',
		// 	submitButtonSelector: '.popup__button',
		// 	inactiveButtonClass: 'popup__button_disabled',
		// 	inputErrorClass: 'popup__input_type_error',
		// 	errorClass: 'popup__error_visible'
		// }

		this._formSelector  = classes.formSelector;
		this._inputSelector = classes.inputSelector;
		this._submitButtonSelector = classes.submitButtonSelector;
		this._inactiveButtonClass = classes.inactiveButtonClass;
		this._inputErrorClass = classes.inputErrorClass;
		this._errorClass = classes.errorClass;
	}

	enableValidation(){
		console.log('enableValidation()');
		console.warn(`this._inputSelector = ${this._inputSelector}`);

		this._setEventListeners();
	}

	_setEventListeners = () => {
		const form = this._form;
		const classes = this._classes;
		const inputs = Array.from(form.querySelectorAll(classes.inputSelector));
		const buttonSubmit = form.querySelector(classes.submitButtonSelector);

		inputs.forEach((inputElement) => {

			inputElement.addEventListener('input', (e) => {
				console.log(`addEventListener >>> input; val = ${e.target.value}`);
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
			console.error(`!isValid`);
			this._addStateInputError(inputElement);

			this._showMessageInputError(errorElement, inputElement);
		} else {
			console.log(`isValid`);
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
		const classes = this._classes;
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

/*

export const enableValidation = (validationConfig) => {
	const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

	forms.forEach( (form) => {
		// Для каждой формы делаем свой EventListener
		setEventListeners(form, validationConfig);
	});
};

const setEventListeners = (form, validationConfig) => {
	const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector) );
	const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);

	inputs.forEach( (inputElement) => {

		inputElement.addEventListener('input', () => {
			toggleInputState(inputElement, validationConfig);

			toggleBtnState(inputs, buttonSubmit, validationConfig);
		});

	});

	// делаем так, чтобы при загрузке страницы кнопка была неактивна (disabled)
	toggleBtnState(inputs, buttonSubmit, validationConfig);
};

const toggleBtnState = (inputs, buttonSubmit, validationConfig) => {
	const checkValid = inputs.every( el => {
		return el.validity.valid;
	});

	if (!checkValid) {
		disableButton(buttonSubmit, validationConfig);
	} else {
		enableButton(buttonSubmit, validationConfig);
	}
};

const toggleInputState = (inputElement, validationConfig) => {
	const isValid = inputElement.validity.valid;
	const inputElementId = inputElement.id;
	const errorElement = document.querySelector(`#${inputElementId}-error`);

	if (!isValid) {
		addStateInputError(inputElement, validationConfig);

		showMessageInputError(errorElement, inputElement, validationConfig);
	} else {
		removeStateInputError(inputElement, validationConfig);

		hideMessageInputError(errorElement, inputElement, validationConfig);
	}
}

const showMessageInputError = (errorElement, inputElement, validationConfig) => {
	if (errorElement) {
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(validationConfig.errorClass)
	}
}

const hideMessageInputError = (errorElement, inputElement, validationConfig) => {
	if (errorElement) {
		errorElement.textContent = '';
		errorElement.classList.remove(validationConfig.errorClass)
	}
}

const addStateInputError = (inputElement, validationConfig) => {
	inputElement.classList.add(validationConfig.inputErrorClass);
}
const removeStateInputError = (inputElement, validationConfig) => {
	inputElement.classList.remove(validationConfig.inputErrorClass);
}

const disableButton = (buttonSubmit, validationConfig) => {
	buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
	buttonSubmit.disabled = true;
}

export const enableButton = (buttonSubmit, validationConfig) => {
	buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
	buttonSubmit.disabled = false;
}

export const disableSubmitButton = (popupEl, validationConfig) => {
	// Блокируем кнопку при закрытии popup (в модалке fancybox кнопки нет!)

	const buttonSubmit = popupEl.querySelector(validationConfig.submitButtonSelector);
	if (buttonSubmit ){
		disableButton(buttonSubmit, validationConfig)
	}
}

export const hideErrors = (popupEl, validationConfig) => {
	// Скрываем сообщения об ошибках при закрытии popup + Удаляем ошибки с input

	const messagesError = popupEl.querySelectorAll('.' + validationConfig.errorClass);
	const inputsError = popupEl.querySelectorAll('.' + validationConfig.inputErrorClass);

	messagesError.forEach((el) => {
		el.classList.remove(validationConfig.errorClass);
	});

	inputsError.forEach((el) => {
		el.classList.remove(validationConfig.inputErrorClass);
	});

}


enableValidation(validationConfig);
*/