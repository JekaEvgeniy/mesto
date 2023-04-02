import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	// {
	// 	name: 'Иваново',
	// 	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	// },
	// {
	// 	name: 'Камчатка',
	// 	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	// },
	// {
	// 	name: 'Холмогорский район',
	// 	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	// },
	// {
	// 	name: 'Байкал',
	// 	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	// }
];

const popups       = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('#popup-profile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');

const profileTitle = document.querySelector('.profile__header');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileBtnEdit = document.querySelector('.profile__button_type_edit');

const popupBtnsClose = document.querySelectorAll('.popup__close');
const popupToggleClass = 'popup_opened';

// # Cards

const cardsContainer = document.querySelector('#cards');

const newCardBtnAdd = document.querySelector('.profile__button_type_add');
const newCardPopup = document.querySelector('#popup-newcard');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupInputTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardPopupInputUrl = newCardPopup.querySelector('.popup__input_type_url');

export const popupImage = document.querySelector('#popup-image');
export const popupImageImage = popupImage.querySelector('.popup-figure__img');
export const popupImageCaption = popupImage.querySelector('.popup-figure__figcaption');

// const cardTemplate = document.querySelector('#card');

export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}


initialCards.forEach((item) => {
	console.log(item);

	const card = new Card(item, cardsContainer);
	card.render();
});

export function openPopup(popupID) {
	console.log(`>>> run function openPopup()`);

	// Открываем нужный нам popup по идишнику ${popupID}
	popupID.classList.add(popupToggleClass);

	document.addEventListener('keydown', closedPopupEsc);
}

function closedPopupEsc(e) {
	if (e.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		if (popupOpened) {
			closePopup(popupOpened);
		}
	}
}

function closePopup(el) {
	el.classList.remove(popupToggleClass);

	document.removeEventListener('keydown', closedPopupEsc);
}

// Закрываем popup при нажатии на крестик
popupBtnsClose.forEach((el) => {
	el.addEventListener('click', (e) => {
		const el = e.target;
		const parentPopup = el.closest('.popup');
		closePopup(parentPopup);
	}); // Global btn
});

// Закрываем popup по клику на overlay
popups.forEach((el) => {
	el.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) {
			closePopup(e.target);
		}
	});
});

// # popup newcard
newCardBtnAdd.addEventListener('click', () => {

	// disableSubmitButton(newCardPopup, validationConfig);
	// hideErrors(newCardPopup, validationConfig);

	openPopup(newCardPopup);

	newCardPopupInputTitle.value = '';
	newCardPopupInputUrl.value = '';
});

// # popup profile
profileBtnEdit.addEventListener('click', () => {

	// disableSubmitButton(profilePopup, validationConfig);
	// hideErrors(profilePopup, validationConfig);

	openPopup(profilePopup);

	const profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});

profilePopupForm.addEventListener('submit', submitPopupFormProfile);

/* Валидация формы */
const enableValidation = (validationConfig) => {
	const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

	forms.forEach((el) => {
		const form = new FormValidator(validationConfig, el);
		form.enableValidation();
		// Для каждой формы делаем свой EventListener
		// setEventListeners(form, validationConfig);
	});
};
enableValidation(validationConfig);

function submitPopupFormProfile(e) {
	e.preventDefault();

	const popupInputNameValue = profilePopupInputName.value;
	profileTitle.textContent = popupInputNameValue;

	const popupInputStatusValue = profilePopupInputStatus.value;
	profileSubTitle.textContent = popupInputStatusValue;

	closePopup(profilePopup);
}

/*

https://images.unsplash.com/photo-1678384979913-5a1007bc4a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80

*/