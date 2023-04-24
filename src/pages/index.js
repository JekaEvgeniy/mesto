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

	avatarBtnEdit,
	avatarPopup,
	avatarPopupSelector,
	avatarPopupForm,

	qustionBtnSelector,
	qustionPopupSelector,
	qustionPopup,
	qustionPopupForm,

	token,
	cohortID
} from '../vars/Data.js';


// import initialCards from '../vars/initialCards.js';

import validationConfig from '../vars/validationConfig.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css'; // добавьте импорт главного файла стилей


// fetch(`https://mesto.nomoreparties.co/v1/${cohortID}/cards`, {
// 	headers: {
// 		authorization: token,
// 		'Content-Type': 'application/json'
// 	}
// })
// 	.then(res => res.json())
// 	.then((result) => {
// 		console.log(result);
// 	});


const api = new Api({
	url: `https://mesto.nomoreparties.co/v1/cohort-64`,
	headers: {
		authorization: token,
		'Content-Type': 'application/json'
	}
});

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const validationAvatarPopup = new FormValidator(validationConfig, avatarPopupForm);
validationAvatarPopup.enableValidation();

const addNewCard = (item) => {
	const card = new Card(item, cardTemplateSelector, handleCardClick);

	return card.renderNewCard();
}

const cardList = new Section(
	{
		// items: initialCards,
		items: [],

		renderer: ( data ) => {
			return addNewCard(data);
		}
	},

	// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
	cardsSelector
);
// cardList.renderItems();

api.getCards()
	.then((res) => {
		console.log('getCards res >>> ');
		console.table(res[0]);

		res.forEach((item) => {
			cardList.addItem(addNewCard(item));
		})
	});



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
	avatarSelector: '.profile__avatar',
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

/* ================================= */

const popupEditorAvatar = new PopupWithForm({
	selector: '#popup-avatar',
	handleFormSubmit: (data) => {
		console.log('=========');
		console.log(data);
		console.log('=========');

		profileInfo.setUserInfo({
			avatar: data.avatar
		});

		popupEditorAvatar.close();
	}
});

popupEditorAvatar.setEventListeners();

// # popup avatar
avatarBtnEdit.addEventListener('click', () => {
	validationAvatarPopup.resetValidation();

	popupEditorAvatar.open();
});


/* ================================= */

const popupQuestion = new PopupWithForm({
	selector: qustionPopupSelector,
	handleFormSubmit: (data) => {
		console.log('=========');
		console.log(data);
		console.log('=========');

		// profileInfo.setUserInfo({
		// 	avatar: data.avatar
		// });

		popupQuestion.close();
	}
});

popupQuestion.setEventListeners();
/*
document.querySelector(qustionBtnSelector).addEventListener('click', () => {
	console.log('click >>>> qustionBtnSelector');
	popupQuestion.open();
});

*/


/*

https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60

*/