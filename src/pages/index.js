import {
	profilePopup,
	profilePopupForm,
	profilePopupInputName,
	profilePopupInputStatus,
	profileBtnEdit,

	cardsSelector,
	cardTemplateSelector,
	cardsContainer,

	newCardBtnAdd,
	newCardPopup,
	newCardPopupSelector,
	newCardPopupForm,
	popupImage,
	popupImageSelector,
	popupFigure,
	popupImageCaption,
} from '../vars/Data.js';

import initialCards from '../vars/initialCards.js';

import validationConfig from '../vars/validationConfig.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import FormValidator from '../components/FormValidator.js';

import './index.css'; // добавьте импорт главного файла стилей

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const addNewCard = (item) => {
	const card = new Card(item, cardTemplateSelector, handleCardClick);

	return card.renderNewCard();
}

const cardList = new Section(
	{
		items: initialCards,

		renderer: ( data ) => {
			return addNewCard(data);
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
		cardList.addItem(addNewCard(data) );

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

	return cardsContainer.append(addNewCard(item) );
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


