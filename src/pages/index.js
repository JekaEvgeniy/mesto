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

console.clear();

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

const profileInfo = new UserInfo({
	nameSelector: '.profile__header',
	aboutSelector: '.profile__subtitle',
	avatarSelector: '.profile__avatar',
});

let myID; // 2c209b6a35c5ecd4a6566de9

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const validationAvatarPopup = new FormValidator(validationConfig, avatarPopupForm);
validationAvatarPopup.enableValidation();



/* Переписываем. Плохо работает удаление карточек.
	1. При добавлении карточки и удаления нет доступа к ID
	2. При обновлении страницы карточка удаляется из базы, но  при удалении со страницы - ошибка.
*/

const cardList = new Section(
	{
		// items: initialCards,
		// items: [],

		renderer: (item) => {
			cardList.addItem(addNewCard(item));
		}
	},

	// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
	// cardsSelector
	'#cards'
);



function addNewCard(item) {

	const card = new Card(cardTemplateSelector, {
		data: { ...item, myID },

		handleRemoveClick: () => {
			console.log(`Давай удалим карточку id=${card._id}`);
			popupQuestion.open(card._id);

			popupQuestion.formSubmit( () => {
				console.warn('popupQuestion.formSubmit');

				api.removeCard(card._id)
					.then((res) => {
						console.log('(1) removeCard');

						card.removeThisCard(res);
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления карточки');
					})
					.finally(() => {
						console.warn('success: remove card');
						popupQuestion.close();
					})
			});
		},

		handleLikeClick: () => {
			// console.warn('>>> index.js >>> handleLikeClick');
			/*
				*	8. Постановка и снятие лайка
				*	Чтобы лайкнуть карточку, отправьте PUT-запрос:
				*	PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
				*	Чтобы убрать лайк, нужно отправить DELETE-запрос с тем же URL:
				*	DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
				*	Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
			 */

			if (! card.checkMyLike() ){
				// console.log(`еще не ставил лайк`);

				api.addLike(card._id)
					.then((res) => {
						card.updateLikes(res);
						// card.addLike();
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка лайка карточки');
					})
					.finally(() => {
						console.warn('success: лайк card');
					})


			}else {
				// console.log(`есть лайк`);

				api.removeLike(card._id)
					.then((res) => {
						card.updateLikes(res);
						// card.removeLike();
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления лайка карточки');
					})
					.finally(() => {
						console.warn('success: дизлайк card');
					})

			}

		}


	});

	return card.renderNewCard();
}


const popupQuestion = new PopupWithQuestion({
	selector: qustionPopupSelector,
	// handleFormSubmit: (id) => {
	// 	console.warn(`>>>>>> В модалке нажали на кпопку удаления карточки = ${id}`);

	// 	api.removeCard(id)
	// 		.then(() => {
	// 			console.log('(1) removeCard');
	// 		})
	// 		.catch(() => {
	// 			console.error('Ошибка! Ошибка удаления карточки');
	// 		})
	// 		.finally(() => {
	// 			console.warn('success: remove card');

	// 			// Card.removeThisCard();

	// 			popupQuestion.close();
	// 		})
	// },
});


popupQuestion.setEventListeners();

// // cardList.renderItems();


// api.getUserInfo()
// 	.then((res) => {
// 		// console.table(res);
// 		profileInfo.setUserInfo({
// 			name: res.name,
// 			about: res.about,
// 			avatar: res.avatar,
// 		});
// 	});

// 	const popupEditorProfile = new PopupWithForm({
// 	selector: '#popup-profile',
// 	handleFormSubmit: (data) => {

// 		profileInfo.setUserInfo({
// 			name: data.name,
// 			about: data.about
// 		});

// 		api.setUserInfo(data)

// 			.then((res) => {
// 				console.warn('>>> api.setUserInfo ');
// 				console.log(data);
// 			})
// 			.catch((err) => {
// 				console.error('Ошибка! Ошибка добавления информации');
// 			})
// 			.finally((res) => {
// 				profileInfo.setUserInfo({
// 					name: data.name,
// 					about: data.about,
// 				});
// 			})

// 		popupEditorProfile.close();
// 	}
// });



Promise.all([api.getUserInfo(), api.getCards() ])
	.then(( data ) => {
		myID = data[0]._id;

		console.warn('START Promise.all >>>')
		console.warn(`>>> myID = ${myID}`);
		// console.log(`OWNER.ID = ${data[1].owner._id}`);

		// cardList.addItem(addNewCard(data[1]), myID );
		const items = data[1];
		// console.log( items[0] );
		cardList.renderItems(items);

		// items.forEach((item) => {

		// 	const itemID = item._id;
		// 	const itemAuthor = item.owner._id;

		// 	const itemLikes = item.likes.length;

		// 	// console.table(itemAuthor);
		// 	// console.log(`card LIKES = ${itemLikes}`);


		// 	cardList.addItem(addNewCard(item, itemID, itemAuthor, itemLikes, myID));
		// })

	})
	.catch((err) => {
			console.error(err);
	})
	.finally(() => {
		// console.warn('END Promise.all <<<');
	})
;



const cardPopup = new PopupWithForm({
	selector: newCardPopupSelector,
	handleFormSubmit: (data) => {
		console.warn('>>>index.js >>> const = cardPopup : handleFormSubmit');
		console.log(data);



		api.addNewCard(data)
			.then((res) => {
				console.log(`>>> res >>>`);
				console.log(res);
				// cardList.addItem(addNewCard(data), true);
				cardList.addItem(addNewCard(res), true);
				console.log(`<<< res <<<`);
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой карточки');
				console.error(err);
			})
			.finally((res) => {


			})

		cardPopup.close();
	}
});

cardPopup.setEventListeners();


newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	cardPopup.open();
});



/*

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





function handleRemoveClick(id) {
	console.log(`Давай удалим карточку = ${id}`);
	// qustionPopup.open();
	// document.querySelector('#popup-question').open()
	popupQuestion.setTarget(id);
	popupQuestion.open()
}


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

*/


