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

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputStatus = popup.querySelector('.popup__input_type_status');

let popupBtn = document.querySelector('.profile__button_type_edit');
let popupBtnClose = document.querySelector('.popup__close');
let popupToggleClass = 'popup_opened';

let profileTitle = document.querySelector('.profile__header');
let profileSubTitle = document.querySelector('.profile__subtitle');

// # Рендеринг карточек

const cardItem = (cardsContainer, item) => {
	const cardTemplate = document.querySelector('#card').content.cloneNode(true);
	const cardTitle = cardTemplate.querySelector('.card__title');
	const cardImg = cardTemplate.querySelector('.card__image');

	cardTitle.textContent = item.name;
	cardImg.src = item.link;
	cardImg.setAttribute('alt', `Изображение - ${item.name}`);

	return cardTemplate;
}

const renderCardItem = (cardsContainer, item) => {
	cardsContainer.append(cardItem(cardsContainer, item));
}

initialCards.forEach((item) => {
	renderCardItem(cardsContainer, item);
});

// # popup

popupBtn.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', closedPopup);
popupForm.addEventListener('submit', popupSubmit);

function popupOpen() {
	popup.classList.add(popupToggleClass);

	let profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		popupInputName.value = profileTitleText;
	}

	let profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		popupInputStatus.value = profileSubTitleText;
	}
}

function popupSubmit(e) {
	e.preventDefault();

	let popupInputNameValue = popupInputName.value;
	if (popupInputNameValue) {
		profileTitle.textContent = popupInputNameValue;
	}

	let popupInputStatusValue = popupInputStatus.value;
	if (popupInputStatusValue) {
		profileSubTitle.textContent = popupInputStatusValue;
	}

	closedPopup();
}

function closedPopup() {
	popup.classList.remove(popupToggleClass);
}