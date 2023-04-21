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

const imageFancybox = new PopupWithImage(popupImageSelector);

function handleCardClick(link, name) {
	imageFancybox.open(link, name);
}

imageFancybox.setEventListeners();

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

	const defaultValues = profileInfo.getUserInfo();

	const profileTitleText = defaultValues.name; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = defaultValues.status; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});


