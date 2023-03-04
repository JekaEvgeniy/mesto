/*
	* включение валидации вызовом enableValidation
*/

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

const enableValidation = () => {
	const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

	forms.forEach(function(form){
		form.addEventListener('submit', disabledSubmitForm);

		setEventListenersInput(form);
	});
};

enableValidation();

function disabledSubmitForm(e) {
		e.preventDefault();
}

function setEventListenersInput(form){
	const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector) );

	inputs.forEach( (input) => {
		input.addEventListener('input', () => {
			console.log('keydown input');
		});
	});
}