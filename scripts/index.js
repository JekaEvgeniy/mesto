import { initialCards } from './Data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('#popup-profile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');

const profileTitle = document.querySelector('.profile__header');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileBtnEdit = document.querySelector('.profile__button_type_edit');

const popupBtnsClose = document.querySelectorAll('.popup__close');
const popupToggleClass = 'popup_opened';

// # Cards

const cardsContainer = document.querySelector('#cards');

const newCardBtnAdd = document.querySelector('.profile__button_type_add');
const newCardPopup = document.querySelector('#popup-newcard');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupInputTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardPopupInputUrl = newCardPopup.querySelector('.popup__input_type_url');

export const popupImage = document.querySelector('#popup-image');
export const popupImageImage = popupImage.querySelector('.popup-figure__img');
export const popupImageCaption = popupImage.querySelector('.popup-figure__figcaption');

export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const newCard = (item) => {
	const card = new Card(item, cardsContainer);

	return card.renderNewCard();
}

initialCards.forEach((item) => {
	prependNewCard(item);
});

export function openPopup(popup) {
	// Открываем нужный нам popup по идишнику ${popup}
	popup.classList.add(popupToggleClass);

	document.addEventListener('keydown', closedPopupEsc);
}

function closedPopupEsc(e) {
	if (e.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		if (popupOpened) {
			closePopup(popupOpened);
		}
	}
}

function closePopup(el) {
	el.classList.remove(popupToggleClass);

	document.removeEventListener('keydown', closedPopupEsc);
}

// Закрываем popup при нажатии на крестик
popupBtnsClose.forEach((el) => {
	el.addEventListener('click', (e) => {
		const el = e.target;
		const parentPopup = el.closest('.popup');
		closePopup(parentPopup);
	});
});

// Закрываем popup по клику на overlay
popups.forEach((el) => {
	el.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) {
			closePopup(e.target);
		}
	});
});

// # popup newcard
newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	openPopup(newCardPopup);

	newCardPopupInputTitle.value = '';
	newCardPopupInputUrl.value = '';
});

newCardPopupForm.addEventListener('submit', submitPopupFormNewCard);

// # popup profile
profileBtnEdit.addEventListener('click', () => {

	validationProfilePopup.resetValidation();

	openPopup(profilePopup);

	const profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});

profilePopupForm.addEventListener('submit', submitPopupFormProfile);

function submitPopupFormProfile(e) {
	e.preventDefault();

	const popupInputNameValue = profilePopupInputName.value;
	profileTitle.textContent = popupInputNameValue;

	const popupInputStatusValue = profilePopupInputStatus.value;
	profileSubTitle.textContent = popupInputStatusValue;

	closePopup(profilePopup);
}

function submitPopupFormNewCard(e) {
	e.preventDefault();

	const popupInputTitleValue = newCardPopupInputTitle.value;
	const popupInputUrlValue = newCardPopupInputUrl.value;

	const newItem = {
		'name': popupInputTitleValue,
		'link': popupInputUrlValue,
	}

	prependNewCard(newItem);

	// очищаем заполненные поля формы, чтобы при повторном открытии popup
	// в инпутах не было предыдущих значений:
	validationNewCardPopup.resetValidation();

	closePopup(newCardPopup);
}

function prependNewCard(item) {
	// Добавляем новую карточку в DOM
	return cardsContainer.append(newCard(item));
}
