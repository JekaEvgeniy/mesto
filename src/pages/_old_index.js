import {
	profilePopup,
	profilePopupForm,
	profilePopupInputName,
	profilePopupInputAbout,
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
import PopupWithQuestion from '../components/PopupWithQuestion.js';

import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css'; // добавьте импорт главного файла стилей

const api = new Api({
	url: `https://mesto.nomoreparties.co/v1/cohort-64`,
	headers: {
		authorization: token,
		'Content-Type': 'application/json'
	}
});

let myID; // 2c209b6a35c5ecd4a6566de9

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const validationAvatarPopup = new FormValidator(validationConfig, avatarPopupForm);
validationAvatarPopup.enableValidation();

const addNewCard = (item, api, id, likes, myID) => {
	const card = new Card(item, cardTemplateSelector, handleCardClick, api, id, likes, myID, handleRemoveClick);

	return card.renderNewCard();
}

const cardList = new Section(
	{
		// items: initialCards,
		items: [],

		renderer: (data) => {
			return addNewCard(data);
		}
	},

	// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
	cardsSelector
);
// cardList.renderItems();

/*
https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80

https://images.unsplash.com/photo-1564416437164-e2d131e7ec07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60

cat
https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60

cat2

https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60
*/

const profileInfo = new UserInfo({
	nameSelector: '.profile__header',
	aboutSelector: '.profile__subtitle',
	avatarSelector: '.profile__avatar',
});


api.getUserInfo()
	.then((res) => {
		// console.table(res);
		profileInfo.setUserInfo({
			name: res.name,
			about: res.about,
			avatar: res.avatar,
		});
	});

const popupEditorProfile = new PopupWithForm({
	selector: '#popup-profile',
	handleFormSubmit: (data) => {

		profileInfo.setUserInfo({
			name: data.name,
			about: data.about
		});

		api.setUserInfo(data)

			.then((res) => {
				console.warn('>>> api.setUserInfo ');
				console.log(data);
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавления информации');
			})
			.finally((res) => {
				profileInfo.setUserInfo({
					name: data.name,
					about: data.about,
				});
			})

		popupEditorProfile.close();
	}
});

Promise.all([api.getUserInfo(), api.getCards()])
	.then((data) => {
		myID = data[0]._id;

		// console.warn('START Promise.all >>>')
		// console.warn(`myID = ${myID}`);
		// console.log(`OWNER.ID = ${data[1].owner._id}`);
		// console.log(data[1]);

		// cardList.addItem(addNewCard(data[1]), myID );
		const items = data[1];

		items.forEach((item) => {

			const itemID = item._id;
			const itemAuthor = item.owner._id;

			const itemLikes = item.likes.length;

			// console.table(itemAuthor);
			// console.log(`card LIKES = ${itemLikes}`);


			cardList.addItem(addNewCard(item, itemID, itemAuthor, itemLikes, myID));
		})

	})
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		// console.warn('END Promise.all <<<');
	})



// api.getCards()
// 	.then((res) => {

// 		let testItem = res[0];
// 		// console.table(testItem);
// 		console.log('***********************************')
// 		console.log(`testItem._id = ${testItem._id} Это ID карточки`);

// 		console.log(`OWNER.NANE = ${testItem.owner.name}`);
// 		console.log(`OWNER.ID = ${testItem.owner._id}`);
// 		// console.warn(api.getUserInfo())
// 		// console.table(res[0].owner);

// 		// console.log(`card LIKES = ${res[0].likes.length}`);
// 		// console.log(`card ID = ${res[0]._id}`);

// 		res.forEach((item, res) => {
// 			const itemAPI = item.api;
// 			const itemID = item._id;
// 			const itemLikes = item.likes.length;
// 			// console.table(itemAPI); // undefined
// 			// console.table(itemAPI);
// 			// console.log(`card LIKES = ${itemLikes}`);


// 			cardList.addItem(addNewCard(item, itemAPI, itemID, itemLikes));
// 		})
// 	});












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

		api.addNewCard(data)
			.then((res) => {
				// cardList.addItem(addNewCard(data));
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой карточки');
			})
			.finally((res) => {
				cardList.addItem(addNewCard(data), true);
			})

		cardPopup.close();
	}
});
cardPopup.setEventListeners();

popupEditorProfile.setEventListeners();

newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	cardPopup.open();
});

/*
const popupQuestion = new PopupWithQuestion(qustionPopupSelector, () => {

});
popupQuestion.setEventListeners();

function handleRemoveClick(id){
	console.log('Давай удалим карточку');
	// qustionPopup.open();
	// document.querySelector('#popup-question').open()

	popupQuestion.open()
}
*/

const popupQuestion = new PopupWithQuestion({
	selector: qustionPopupSelector,
	handleFormSubmit: (id) => {
		console.warn(`>>>>>> В модалке нажали на кпопку удаления карточки = ${id}`);

		api.removeCard(id)
			.then(() => {
				console.log('(1) removeCard');
			})
			.catch(() => {
				console.error('Ошибка! Ошибка удаления карточки');
			})
			.finally(() => {
				console.warn('success: remove card');

				// card.removeThisCard();

				popupQuestion.close();
			})
	},
});

/*

https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60

*/





















popupQuestion.setEventListeners();

function handleRemoveClick(id) {
	console.log(`Давай удалим карточку = ${id}`);
	// qustionPopup.open();
	// document.querySelector('#popup-question').open()
	popupQuestion.setTarget(id);
	popupQuestion.open()
}

/*
https://images.unsplash.com/photo-1674574124475-16dd78234342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60
*/
























// # popup profile
profileBtnEdit.addEventListener('click', () => {
	validationProfilePopup.resetValidation();

	popupEditorProfile.open();

	const defaultValues = profileInfo.getUserInfo();

	const profileTitleText = defaultValues.name; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = defaultValues.about; // Статус
	if (profileSubTitleText) {
		profilePopupInputAbout.value = profileSubTitleText;
	}

});

/* ================================= */

const popupEditorAvatar = new PopupWithForm({
	selector: '#popup-avatar',
	handleFormSubmit: (data) => {

		console.warn(data);

		api.setUserAvatar(data)
			.then((res) => {
				console.log(`===========>`);
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
				console.error('Ошибка! Ошибка добавлении новой фотографии');
			})
			.finally((res) => {

				profileInfo.setUserInfo({
					avatar: data.avatar
				});

			})

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


/*
document.querySelector(qustionBtnSelector).addEventListener('click', () => {
	console.log('click >>>> qustionBtnSelector');
	popupQuestion.open();
});

*/

