import Card from './Card.js';

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

const cardTemplate = document.querySelector('#card');


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

// # Global all popup
popupBtnsClose.forEach((el) => {
	el.addEventListener('click', (e) => {
		const el = e.target;
		const parentPopup = el.closest('.popup');
		closePopup(parentPopup);
	}); // Global btn
});