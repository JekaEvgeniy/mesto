import { initialCards } from './Data.js';

import UserInfo from './UserInfo.js';
import Section from './Section.js';
import Card from './Card.js';

import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('#popup-profile');
const profilePopupSelector = '#popup-profile';

const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');

const profileTitle = document.querySelector('.profile__header');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileBtnEdit = document.querySelector('.profile__button_type_edit');

const popupBtnsClose = document.querySelectorAll('.popup__close');
export const popupToggleClass = 'popup_opened';

// # Cards

const cardsSelector  = '#cards';
const cardsContainer = document.querySelector(cardsSelector);

const newCardBtnAdd = document.querySelector('.profile__button_type_add');
const newCardPopup = document.querySelector('#popup-newcard');
const newCardPopupSelector = '#popup-newcard';
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupInputTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardPopupInputUrl = newCardPopup.querySelector('.popup__input_type_url');

export const popupImage = document.querySelector('#popup-image');
export const popupImageSelector = '#popup-image';
export const popupFigure = popupImage.querySelector('.popup-figure__img');
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

// initialCards.forEach((item) => {
// 	prependNewCard(item);
// });


const cardList = new Section(
	{
		items: initialCards,

		renderer: ( data ) => {
			const card = new Card(data, cardsContainer, handleCardClick);

			return card.renderNewCard();

		}
	},

	// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
	cardsSelector
);

cardList.renderItems();

const openFancybox = new PopupWithImage(popupImageSelector);

function handleCardClick(link, name) {
	console.log('!!!!! >>> handleCardClick()');
	openFancybox.open(link, name);
}

openFancybox.setEventListeners();

/*

https://images.unsplash.com/photo-1661956603025-8310b2e3036d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60

*/

const cardPopup = new PopupWithForm({
	selector: newCardPopupSelector,
	handleFormSubmit: (data) => {
		console.warn(data);

		cardList.addItem(newCard(data) );

		cardPopup.close();
	}
});
cardPopup.setEventListeners();



// function closePopup(el) {
// 	el.classList.remove(popupToggleClass);

// 	document.removeEventListener('keydown', closedPopupEsc);
// }

// Закрываем popup при нажатии на крестик
// popupBtnsClose.forEach((el) => {
// 	el.addEventListener('click', () => {
	// Добавил в  popup.setEventListeners();
// 		openFancybox.close();
// 	});
// });

// Закрываем popup по клику на overlay
// popups.forEach((el) => {
// 	el.addEventListener('click', (e) => {
// 		if (e.target === e.currentTarget) {
// 			closePopup(e.target);
// 		}
// 	});
// });

// # popup newcard
// https://repl.it/@praktikum/post#script.js



newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	cardPopup.open();

	// newCardPopupInputTitle.value = '';
	// newCardPopupInputUrl.value = '';
});

// newCardPopupForm.addEventListener('submit', submitPopupFormNewCard);



// profilePopupForm.addEventListener('submit', submitPopupFormProfile);

// function submitPopupFormProfile(e) {
// 	e.preventDefault();

// 	const popupInputNameValue = profilePopupInputName.value;
// 	profileTitle.textContent = popupInputNameValue;

// 	const popupInputStatusValue = profilePopupInputStatus.value;
// 	profileSubTitle.textContent = popupInputStatusValue;

// 	closePopup(profilePopup);
// }

// function submitPopupFormNewCard(e) {
// 	e.preventDefault();

// 	const popupInputTitleValue = newCardPopupInputTitle.value;
// 	const popupInputUrlValue = newCardPopupInputUrl.value;

// 	const newItem = {
// 		'name': popupInputTitleValue,
// 		'link': popupInputUrlValue,
// 	}



// 	prependNewCard(newItem);

// 	closePopup(newCardPopup);
// }

function prependNewCard(item) {
	// Добавляем новую карточку в DOM

	return cardsContainer.append(newCard(item) );
}


const profileInfo = new UserInfo({
	nameSelector: '.profile__header',
	statusSelector: '.profile__subtitle',
});


const popupEditorProfile = new PopupWithForm({
	selector: '#popup-profile',
	handleFormSubmit: (data) => {
		profileInfo.setUserInfo({
			name: data.name,
			status: data.status
		});

		popupEditorProfile.close();
	}
});

popupEditorProfile.setEventListeners();

// # popup profile
profileBtnEdit.addEventListener('click', () => {
	validationProfilePopup.resetValidation();

	popupEditorProfile.open();

	const getDefaultValues = profileInfo.getUserInfo();

	const profileTitleText = getDefaultValues.name; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = getDefaultValues.status; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});






// const popupEditorProfile = new PopupWithForm('#popup-profile', ({ name, status }) => {
// 	userInfo.setUserInfo({ name, status })
// });

/*
https://images.unsplash.com/photo-1661956603025-8310b2e3036d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60
*/