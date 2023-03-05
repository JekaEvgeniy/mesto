/*
	* включение валидации вызовом enableValidation
*/

const enableValidation = (options) => {
	const forms = Array.from(document.querySelectorAll(options.formSelector));

	forms.forEach(function(form){
		form.addEventListener('submit', disabledSubmitForm);

		setEventListenersInput(form, options);
	});
};

function disabledSubmitForm(e) {
		e.preventDefault();
}

function setEventListenersInput(form, options){
	// console.log(options.inputSelector);
	const inputs = Array.from(form.querySelectorAll(options.inputSelector) );

	inputs.forEach( (inputElement) => {

		inputElement.addEventListener('input', () => {
			const isValid = inputElement.validity.valid;
			const inputElementId = inputElement.id;
			const errorElement = document.querySelector(`#${inputElementId}-error`);
			// console.log(`#${inputElementId}-error`);

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

			// checkInputValidity(formElement);
		});

	});
}

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

