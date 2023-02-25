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


let profilePopup = document.querySelector('#popup-profile');
let profilePopupForm = profilePopup.querySelector('.popup__form');
let profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
let profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');

let profileTitle = document.querySelector('.profile__header');
let profileSubTitle = document.querySelector('.profile__subtitle');
let profileBtnEdit = document.querySelector('.profile__button_type_edit');

const popupBtnsClose = document.querySelectorAll('.popup__close');
const popupToggleClass = 'popup_opened';

// # Cards

const cardsContainer = document.querySelector('#cards');

let newCardBtnAdd = document.querySelector('.profile__button_type_add');
let newCardPopup = document.querySelector('#popup-newcard');
let newCardPopupForm = newCardPopup.querySelector('.popup__form');
let newCardPopupInputTitle = newCardPopup.querySelector('.popup__input_type_title');
let newCardPopupInputUrl   = newCardPopup.querySelector('.popup__input_type_url');

let popupImage = document.querySelector('#popup-image');
let popupImageImage = popupImage.querySelector('.popup-figure__img');
let popupImageCaption = popupImage.querySelector('.popup-figure__figcaption');

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

	// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
	if (item.link) {
		cardImg.src = item.link;
	}else {
		cardImg.src = '#';
	}

	cardImg.setAttribute('alt', `${item.name}`);

	cardBtnRemove.addEventListener('click', removeCard);
	cardBtnLike.addEventListener('click', likeCard);

	cardImg.addEventListener('click', popupFancyboxImage );

	return cardTemplate;
}

const renderCardItem = (cardsContainer, item) => {
	cardsContainer.prepend(cardItem(cardsContainer, item));
}

initialCards.forEach((item) => {
	renderCardItem(cardsContainer, item);
});

// # popup profile
profileBtnEdit.addEventListener('click', () => {
	popupOpen(profilePopup);

	let profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	let profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});

profilePopupForm.addEventListener('submit', popupSubmit);

// # popup newcard
newCardBtnAdd.addEventListener('click', () => {
	newCardPopupInputTitle.value = '';
	newCardPopupInputUrl.value = '';

	popupOpen(newCardPopup);
});

newCardPopupForm.addEventListener('submit', newCardPopupSubmit);

// # Global all popup
popupBtnsClose.forEach( (el) => {
	el.addEventListener('click', closedPopup); // Global btn
});

function popupOpen(popupID) {
	// Открываем нужный нам popup по идишнику ${popupID}
	popupID.classList.add(popupToggleClass);
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

	closedPopup(e);
}

function newCardPopupSubmit(e){
	e.preventDefault();

	let popupInputTitleValue = newCardPopupInputTitle.value;
	let popupInputUrlValue = newCardPopupInputUrl.value;

	let newItem = {
		'name': popupInputTitleValue,
		'link': popupInputUrlValue,
	}

	renderCardItem(cardsContainer, newItem);

	closedPopup(e);
}

function closedPopup(e) {
	let el = e.target;
	let parentContainer = el.closest('.popup');
	parentContainer.classList.remove(popupToggleClass);
}

function popupFancyboxImage(e){
	let el = e.target;
	let elUrl = el.getAttribute('src');
	let elTitle = el.getAttribute('alt');

	if ( elUrl && popupImageImage){
		popupImageImage.src = elUrl;
	}

	if ( elTitle ){
		if ( popupImageImage ) {
			popupImageImage.alt = elTitle;
		}
		if ( popupImageCaption ) {
			popupImageCaption.textContent = elTitle;
		}
	}

	popupOpen(popupImage);
}

/*
Тестовое изображение:

https://images.unsplash.com/photo-1634992531782-1c988a2cb5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEzfHxubyUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60

*/