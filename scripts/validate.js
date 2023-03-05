/*
	* включение валидации вызовом enableValidation
*/

const enableValidation = (options) => {
	const forms = Array.from(document.querySelectorAll(options.formSelector));

	forms.forEach( (form) => {
		form.addEventListener('submit', disabledSubmitForm);

		// Для каждой формы делаем свой EventListener
		setEventListeners(form, options);
	});
};

function disabledSubmitForm(e) {
		e.preventDefault();
}

const setEventListeners = (form, options) => {
	const inputs = Array.from(form.querySelectorAll(options.inputSelector) );
	const buttonSubmit = form.querySelector(options.submitButtonSelector);

	inputs.forEach( (inputElement) => {

		inputElement.addEventListener('input', () => {
			toggleInputState(inputElement, options);

			toggleBtnState(inputs, buttonSubmit, options);
		});

	});

	// делаем так, чтобы при загрузке страницы кнопка была неактивна (disabled)
	toggleBtnState(inputs, buttonSubmit, options);
};

const toggleBtnState = (inputs, buttonSubmit, options) => {
	const checkValid = inputs.every( el => {
		return el.validity.valid;
	});

	if (!checkValid) {
		disableButton(buttonSubmit, options);
	} else {
		enableButton(buttonSubmit, options);
	}
};

const toggleInputState = (inputElement, options) => {
	const isValid = inputElement.validity.valid;
	const inputElementId = inputElement.id;
	const errorElement = document.querySelector(`#${inputElementId}-error`);

	if (!isValid) {
		addStateInputError(inputElement, options);

		showMessageInputError(errorElement, inputElement, options);
	} else {
		removeStateInputError(inputElement, options);

		hideMessageInputError(errorElement, inputElement, options);
	}
}

const showMessageInputError = (errorElement, inputElement, options) => {
	if (errorElement) {
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(options.errorClass)
	}
}

const hideMessageInputError = (errorElement, inputElement, options) => {
	if (errorElement) {
		errorElement.textContent = '';
		errorElement.classList.remove(options.errorClass)
	}
}

const addStateInputError = (inputElement, options) => {
	inputElement.classList.add(options.inputErrorClass);
}
const removeStateInputError = (inputElement, options) => {
	inputElement.classList.remove(options.inputErrorClass);
}

const disableButton = (buttonSubmit, options) => {
	buttonSubmit.classList.add(options.inactiveButtonClass);
	buttonSubmit.disabled = true;
}

const enableButton = (buttonSubmit, options) => {
	buttonSubmit.classList.remove(options.inactiveButtonClass);
	buttonSubmit.disabled = false;
}

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
});

