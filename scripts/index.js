'use strict';

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputStatus = popup.querySelector('.popup__input_type_status');

let popupBtn = document.querySelector('.profile__button_type_edit');
let popupBtnClose = document.querySelector('.popup__close');
let popupToggleClass = 'popup_opened';

let profileTitle = document.querySelector('.profile__header');
let profileSubTitle = document.querySelector('.profile__subtitle');

popupBtn.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', closedPopup);
popupForm.addEventListener('submit', popupSubmit);

function popupOpen() {
	popup.classList.add(popupToggleClass);

	let profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		popupInputName.value = profileTitleText;
	}

	let profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		popupInputStatus.value = profileSubTitleText;
	}
}

function popupSubmit(e) {
	e.preventDefault();

	let popupInputNameValue = popupInputName.value;
	if (popupInputNameValue) {
		profileTitle.textContent = popupInputNameValue;
	}

	let popupInputStatusValue = popupInputStatus.value;
	if (popupInputStatusValue) {
		profileSubTitle.textContent = popupInputStatusValue;
	}

	closedPopup();
}

function closedPopup() {
	popup.classList.remove(popupToggleClass);
}