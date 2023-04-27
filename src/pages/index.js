import {
	// profilePopup,
	profilePopupForm,
	profilePopupInputName,
	profilePopupInputAbout,
	profileBtnEdit,

	// cardsSelector,
	cardTemplateSelector,
	// cardsContainer,

	newCardBtnAdd,
	// newCardPopup,
	newCardPopupSelector,
	newCardPopupForm,
	// popupImage,
	popupImageSelector,
	// popupFigure,
	// popupImageCaption,

	avatarBtnEdit,
	// avatarPopup,
	// avatarPopupSelector,
	avatarPopupForm,

	// qustionBtnSelector,
	qustionPopupSelector,
	// qustionPopup,
	// qustionPopupForm,

	token,
	// cohortID
} from '../vars/Data.js';


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
			popupQuestion.open(card._id);

			popupQuestion.formSubmit(() => {
				popupQuestion.replaceBtnText('Да', 'Сохранение...', true);

				api.removeCard(card._id)
					.then((res) => {
						card.removeThisCard(res);
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления карточки');
					})
					.finally(() => {
						popupQuestion.close();
						popupQuestion.replaceBtnText('Да', 'Сохранение...', false);
					})
			});
		},

		handleLikeClick: () => {
			if (!card.checkMyLike()) {

				api.addLike(card._id)
					.then((res) => {
						card.updateLikes(res);
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка лайка карточки');
					})
					.finally(() => {

					})

			} else {
				api.removeLike(card._id)
					.then((res) => {
						card.updateLikes(res);
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления лайка карточки');
					})
					.finally(() => {
					})

			}
		},

		handleCardClick: () => {
			// imageFancybox.open(link, name);
			imageFancybox.open(item.link, item.name);
		}


	});

	return card.renderNewCard();
}


const popupQuestion = new PopupWithQuestion({
	selector: qustionPopupSelector,
});
popupQuestion.setEventListeners();


api.getUserInfo()
	.then((res) => {
		profileInfo.setUserInfo({
			name: res.name,
			about: res.about,
			avatar: res.avatar,
		});
	});

const popupEditorProfile = new PopupWithForm({
	selector: '#popup-profile',
	handleFormSubmit: (data) => {

		popupEditorProfile.replaceBtnText('Сохранить', 'Сохранение...', true);

		profileInfo.setUserInfo({
			name: data.name,
			about: data.about
		});

		api.setUserInfo(data)

			.then((res) => {

			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавления информации');
			})
			.finally((res) => {
				profileInfo.setUserInfo({
					name: data.name,
					about: data.about,
				});

				popupEditorProfile.replaceBtnText('Сохранить', 'Сохранение...', false);
			})

		popupEditorProfile.close();
	}
});



Promise.all([api.getUserInfo(), api.getCards()])
	.then((data) => {

		myID = data[0]._id;
		cardList.renderItems(data[1]);

	})
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {

	})
	;



const cardPopup = new PopupWithForm({
	selector: newCardPopupSelector,
	handleFormSubmit: (data) => {
		cardPopup.replaceBtnText('Создать', 'Сохранение...', true);

		api.addNewCard(data)
			.then((res) => {
				cardList.addItem(addNewCard(res), true);
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой карточки');
				console.error(err);
			})
			.finally((res) => {
				cardPopup.replaceBtnText('Создать', 'Сохранение...', false);
				cardPopup.close();
			})

	}
});

cardPopup.setEventListeners();


newCardBtnAdd.addEventListener('click', () => {

	validationNewCardPopup.resetValidation();

	cardPopup.open();
});



const imageFancybox = new PopupWithImage(popupImageSelector);

imageFancybox.setEventListeners();


// # popup profile

popupEditorProfile.setEventListeners();

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

		popupEditorAvatar.replaceBtnText('Сохранить', 'Сохранение...', true);

		api.setUserAvatar(data)
			.then((res) => {

			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой фотографии');
				console.error(err);
			})
			.finally((res) => {

				profileInfo.setUserInfo({
					avatar: data.avatar
				});

				popupEditorAvatar.close();

				popupEditorAvatar.replaceBtnText('Сохранить', 'Сохранение...', false);

			})

	}
});

popupEditorAvatar.setEventListeners();




// # popup avatar
avatarBtnEdit.addEventListener('click', () => {
	validationAvatarPopup.resetValidation();

	popupEditorAvatar.open();
});




