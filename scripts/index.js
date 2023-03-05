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

const popupImage = document.querySelector('#popup-image');
const popupImageImage = popupImage.querySelector('.popup-figure__img');
const popupImageCaption = popupImage.querySelector('.popup-figure__figcaption');

const cardTemplate = document.querySelector('#card');

const removeCard = (e) => {
	e.target.closest('.card').remove();
}

const likeCard = (e) => {
	e.target.classList.toggle('card__button_active');
}

const createCardItem = (item) => {
	const card = cardTemplate.content.cloneNode(true);
	const cardTitle = card.querySelector('.card__title');
	const cardImg = card.querySelector('.card__image');

	const cardBtnRemove = card.querySelector('.card__button-remove');
	const cardBtnLike = card.querySelector('.card__button');

	cardTitle.textContent = item.name;

	// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
	if (item.link) {
		cardImg.src = item.link;
	} else {
		cardImg.src = '#';
	}

	cardImg.setAttribute('alt', `${item.name}`);

	cardBtnRemove.addEventListener('click', removeCard);
	cardBtnLike.addEventListener('click', likeCard);

	cardImg.addEventListener('click', openPopupFancyboxImage);

	return card;
}

const renderCardItem = (cardsContainer, item) => {
	cardsContainer.prepend(createCardItem(item));
}

initialCards.forEach((item) => {
	renderCardItem(cardsContainer, item);
});

// # popup profile
profileBtnEdit.addEventListener('click', () => {
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

// # popup newcard
newCardBtnAdd.addEventListener('click', () => {
	openPopup(newCardPopup);
});

newCardPopupForm.addEventListener('submit', submitPopupFormNewCard);

// # Global all popup
popupBtnsClose.forEach((el) => {
	el.addEventListener('click', (e) =>{
		let el = e.target;
		let parentPopup = el.closest('.popup');
		closedPopup(parentPopup);
	}); // Global btn
});

function openPopup(popupID) {
	// Открываем нужный нам popup по идишнику ${popupID}
	popupID.classList.add(popupToggleClass);

	document.addEventListener('keydown', closedPopupEsc);
}

function submitPopupFormProfile(e) {
	e.preventDefault();

	const popupInputNameValue = profilePopupInputName.value;
	if (popupInputNameValue) {
		profileTitle.textContent = popupInputNameValue;
	}

	const popupInputStatusValue = profilePopupInputStatus.value;
	if (popupInputStatusValue) {
		profileSubTitle.textContent = popupInputStatusValue;
	}

	closedPopup(profilePopup);
}

function submitPopupFormNewCard(e) {
	const thisForm = e.target;
	e.preventDefault();

	const popupInputTitleValue = newCardPopupInputTitle.value;
	const popupInputUrlValue = newCardPopupInputUrl.value;

	const newItem = {
		'name': popupInputTitleValue,
		'link': popupInputUrlValue,
	}

	renderCardItem(cardsContainer, newItem);

	// очищаем заполненные поля формы, чтобы при повторном открытии popup
	// в инпутах не было предыдущих значений:
	thisForm.reset();

	// После того как добавили новую карточку, в модалке
	// кнопка должна быть неактивна (disabled) при повторном открытии этой модалки
	const popupBtn = thisForm.querySelector('.popup__button');
	if ( popupBtn ) {
		popupBtn.classList.add('popup__button_disabled');
	}

	closedPopup(newCardPopup);
}

function closedPopup(el) {
	el.classList.remove(popupToggleClass);
}

function openPopupFancyboxImage(e) {
	const el = e.target;
	const elUrl = el.getAttribute('src');
	const elTitle = el.getAttribute('alt');

	if (elUrl && popupImageImage) {
		popupImageImage.src = elUrl;
	}

	if (elTitle) {
		if (popupImageImage) {
			popupImageImage.alt = elTitle;
		}
		if (popupImageCaption) {
			popupImageCaption.textContent = elTitle;
		}
	}

	openPopup(popupImage);
}

function closedPopupEsc(e) {
	if (e.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		if (popupOpened ){
			closedPopup(popupOpened);
		}
	}
}

// Закрываем popup по клику на overlay
popups.forEach( (el) => {
	el.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) {
			closedPopup(e.target);
		}
	});
});
