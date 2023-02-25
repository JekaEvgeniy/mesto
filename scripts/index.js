'use strict';


const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];


const cardsContainer = document.querySelector('#cards');

let profilePopup = document.querySelector('#popup-profile');
let profilePopupForm = profilePopup.querySelector('.popup__form');
let profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
let profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');
let profilePopupBtn = document.querySelector('.profile__button_type_edit');

let profileTitle = document.querySelector('.profile__header');
let profileSubTitle = document.querySelector('.profile__subtitle');

const popupBtnClose = document.querySelector('.popup__close');
const popupToggleClass = 'popup_opened';

// # Cards

const removeCard = (e) => {
	e.target.closest('.card').remove();
}

const likeCard = (e) => {
	e.target.classList.toggle('card__button_active');
}


const cardItem = (cardsContainer, item) => {
	const cardTemplate = document.querySelector('#card').content.cloneNode(true);
	const cardTitle = cardTemplate.querySelector('.card__title');
	const cardImg = cardTemplate.querySelector('.card__image');

	const cardBtnRemove = cardTemplate.querySelector('.card__button-remove');
	const cardBtnLike = cardTemplate.querySelector('.card__button');

	cardTitle.textContent = item.name;

	cardImg.src = item.link;
	cardImg.setAttribute('alt', `Изображение - ${item.name}`);

	cardBtnRemove.addEventListener('click', removeCard);
	cardBtnLike.addEventListener('click', likeCard);

	return cardTemplate;
}

const renderCardItem = (cardsContainer, item) => {
	cardsContainer.append(cardItem(cardsContainer, item));
}

initialCards.forEach((item) => {
	renderCardItem(cardsContainer, item);
});

// # popup

profilePopupBtn.addEventListener('click', popupOpen);
profilePopupForm.addEventListener('submit', popupSubmit);

popupBtnClose.addEventListener('click', closedPopup); // Global btn

function popupOpen() {
	// FIXME: в функции оставить только открытие, замену текста перенести.
	profilePopup.classList.add(popupToggleClass);

	let profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	let profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}
}

function popupSubmit(e) {
	e.preventDefault();

	let popupInputNameValue = profilePopupInputName.value;
	if (popupInputNameValue) {
		profileTitle.textContent = popupInputNameValue;
	}

	let popupInputStatusValue = profilePopupInputStatus.value;
	if (popupInputStatusValue) {
		profileSubTitle.textContent = popupInputStatusValue;
	}

	closedPopup();
}

function closedPopup() {
	profilePopup.classList.remove(popupToggleClass);
}