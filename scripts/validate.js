/*
	* включение валидации вызовом enableValidation
	* все настройки передаются при вызове enableValidation
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
	const formItems = Array.from(document.querySelectorAll(validationConfig.formSelector));

	formItems.forEach(function(form){
		form.addEventListener('submit', disabledSubmitForm);
	});
};

enableValidation();

function disabledSubmitForm(e) {
		e.preventDefault();
}
