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
			const isValid = inputElement.validity.valid;

			const inputElementId = inputElement.id;
			const errorElement = document.querySelector(`#${inputElementId}-error`);

			if (! isValid ){
				inputElement.classList.add(options.inputErrorClass);

				if (errorElement) {
					errorElement.textContent = inputElement.validationMessage;
					errorElement.classList.add(options.errorClass)
				}
			} else {
				inputElement.classList.remove(options.inputErrorClass);

				if (errorElement) {
					errorElement.textContent = '';
					errorElement.classList.remove(options.errorClass)
				}
			}

			toggleBtnState(inputs, buttonSubmit, options);

			// checkInputValidity(formElement);
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
		buttonSubmit.classList.add(options.inactiveButtonClass);
		buttonSubmit.disabled = true;
	} else {
		buttonSubmit.classList.remove(options.inactiveButtonClass);
		buttonSubmit.disabled = false;
	}
};



// function checkInputValidity(formElement){
	// let el = e.target;
	// let checkValid = el.validity.valid;
	// let elID = el.id;
	// console.log(el);
	// console.log(elID);

	// if (!checkValid) {
	// 	el.classList.add(options.inputErrorClass);
	// } else {
	// 	el.classList.remove(options.inputErrorClass);
	// }
// }


enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
});

