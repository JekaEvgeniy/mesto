export const initialCards = [
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


export const profilePopup = document.querySelector('#popup-profile');
export const profilePopupSelector = '#popup-profile';
export const profilePopupForm = profilePopup.querySelector('.popup__form');
export const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
export const profilePopupInputStatus = profilePopup.querySelector('.popup__input_type_status');
export const profileBtnEdit = document.querySelector('.profile__button_type_edit');
export const popupToggleClass = 'popup_opened';
export const cardsSelector = '#cards';
export const cardsContainer = document.querySelector(cardsSelector);
export const newCardBtnAdd = document.querySelector('.profile__button_type_add');
export const newCardPopup = document.querySelector('#popup-newcard');
export const newCardPopupSelector = '#popup-newcard';
export const newCardPopupForm = newCardPopup.querySelector('.popup__form');
export const popupImage = document.querySelector('#popup-image');
export const popupImageSelector = '#popup-image';
export const popupFigure = popupImage.querySelector('.popup-figure__img');
export const popupImageCaption = popupImage.querySelector('.popup-figure__figcaption');
export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}
