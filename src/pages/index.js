
import './index.css'; // добавьте импорт главного файла стилей

import { initialCards } from '../vars/Data.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import FormValidator from '../components/FormValidator.js';

const profilePopup = document.querySelector('#popup-profile');
const profilePopupSelector = '#popup-profile';

const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');

const profileBtnEdit = document.querySelector('.profile__button_type_edit');

export const popupToggleClass = 'popup_opened';

// # Cards

const cardsSelector  = '#cards';
const cardsContainer = document.querySelector(cardsSelector);

const newCardBtnAdd = document.querySelector('.profile__button_type_add');
const newCardPopup = document.querySelector('#popup-newcard');
const newCardPopupSelector = '#popup-newcard';
const newCardPopupForm = newCardPopup.querySelector('.popup__form');

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
	openFancybox.open(link, name);
}

openFancybox.setEventListeners();

const cardPopup = new PopupWithForm({
	selector: newCardPopupSelector,
	handleFormSubmit: (data) => {
		cardList.addItem(newCard(data) );

		cardPopup.close();
	}
});
cardPopup.setEventListeners();


newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	cardPopup.open();
});

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


