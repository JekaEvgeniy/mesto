import {
	profilePopupForm,
	profilePopupInputName,
	profilePopupInputAbout,
	profileBtnEdit,

	cardsSelector,
	cardTemplateSelector,

	newCardBtnAdd,
	newCardPopupSelector,
	newCardPopupForm,

	popupImageSelector,
	avatarBtnEdit,
	avatarPopupForm,
	qustionPopupSelector,
	token,
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

let myID;

// Валидация формы
const validationProfilePopup = new FormValidator(validationConfig, profilePopupForm);
validationProfilePopup.enableValidation();

const validationNewCardPopup = new FormValidator(validationConfig, newCardPopupForm);
validationNewCardPopup.enableValidation();

const validationAvatarPopup = new FormValidator(validationConfig, avatarPopupForm);
validationAvatarPopup.enableValidation();

const cardList = new Section(
	{
		renderer: (item) => {
			cardList.addItem(addNewCard(item));
		}
	},

	// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
	cardsSelector
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
						popupQuestion.close();
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления карточки');
					})
					.finally(() => {
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
			} else {
				api.removeLike(card._id)
					.then((res) => {
						card.updateLikes(res);
					})
					.catch((res) => {
						console.error('Ошибка! Ошибка удаления лайка карточки');
					})
			}
		},

		handleCardClick: () => {
			imageFancybox.open(item.link, item.name);
		}


	});

	return card.renderNewCard();
}


const popupQuestion = new PopupWithQuestion({
	selector: qustionPopupSelector,
});
popupQuestion.setEventListeners();


const popupEditorProfile = new PopupWithForm({
	selector: '#popup-profile',
	handleFormSubmit: (data) => {

		popupEditorProfile.replaceBtnText('Сохранить', 'Сохранение...', true);

		api.setUserInfo(data)
			.then((res) => {
				profileInfo.setUserInfo({
					name: data.name,
					about: data.about,
				});

				popupEditorProfile.close();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавления информации');
			})
			.finally(() => {
				popupEditorProfile.replaceBtnText('Сохранить', 'Сохранение...', false);
			})
	}
});



Promise.all([api.getUserInfo(), api.getCards()])
	.then((data) => {

		myID = data[0]._id;

		profileInfo.setUserInfo({
			name: data[0].name,
			about: data[0].about,
			avatar: data[0].avatar,
		});

		cardList.renderItems(data[1]);
	})
	.catch((err) => {
		console.error(err);
	})
	;



const cardPopup = new PopupWithForm({
	selector: newCardPopupSelector,
	handleFormSubmit: (data) => {
		cardPopup.replaceBtnText('Создать', 'Сохранение...', true);

		api.addNewCard(data)
			.then((res) => {
				cardList.addItem(addNewCard(res), true);
				cardPopup.close();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой карточки');
				console.error(err);
			})
			.finally(() => {
				cardPopup.replaceBtnText('Создать', 'Сохранение...', false);
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
				profileInfo.setUserInfo({
					avatar: res.avatar
				});

				popupEditorAvatar.close();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка добавлении новой фотографии');
				console.error(err);
			})
			.finally(() => {
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




