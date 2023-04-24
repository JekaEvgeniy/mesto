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
		console.warn('>>>>>> cardPopup ');
		console.log(data);

		// api.addNewCard(data);
		api.addNewCard(data)
			.then( (res) => {
				console.log('1');
				cardList.addItem(addNewCard(data));
			})
			.catch((err)=>{
				console.error('Ошибка! Ошибка добавлении новой карточки');
			})
			.finally((res) => {
				console.log('2');
				cardList.addItem(addNewCard(data) );
			})

		cardPopup.close();
	}
});
cardPopup.setEventListeners();

/*
https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80

https://images.unsplash.com/photo-1564416437164-e2d131e7ec07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60

cat
https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60

cat2

https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60
*/


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