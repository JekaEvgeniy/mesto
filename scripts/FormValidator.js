/*
	* включение валидации вызовом enableValidation
*/

const enableValidation = (validationConfig) => {
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

const enableButton = (buttonSubmit, validationConfig) => {
	buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
	buttonSubmit.disabled = false;
}

const disableSubmitButton = (popupEl, validationConfig) => {
	// Блокируем кнопку при закрытии popup (в модалке fancybox кнопки нет!)

	const buttonSubmit = popupEl.querySelector(validationConfig.submitButtonSelector);
	if (buttonSubmit ){
		disableButton(buttonSubmit, validationConfig)
	}
}

const hideErrors = (popupEl, validationConfig) => {
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

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}
enableValidation(validationConfig);
