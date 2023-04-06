import {
	openPopup,

	popupImage,
	popupImageImage,
	popupImageCaption
} from './index.js';

export default class Card {
	static _template = document.querySelector('#card').content;

	constructor(item, container) {
		this._item = item;
		this._container = container;
	}

	_removeCard = (e) => {
		e.target.closest('.card').remove();
	}

	_likeCard = (e) => {
		e.target.classList.toggle('card__button_active');
	}

	_openFancybox = () => {
		const el = this._item;
		const elUrl = el.link;
		const elTitle = el.name;

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


	_cardTemplate() {
		return Card._template.cloneNode(true).children[0];
	}

	renderNewCard() {
		let newCard = this._cardTemplate();

		const item = this._item;

		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__image');

		cardTitle.textContent = item.name;
		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
		if (item.link) {
			cardImg.src = item.link;
		} else {
			cardImg.src = '#';
		}

		cardImg.setAttribute('alt', `${item.name}`);

		newCard.querySelector('.card__button-remove').addEventListener('click', this._removeCard);

		newCard.querySelector('.card__button').addEventListener('click', this._likeCard);

		newCard.querySelector('.card__image').addEventListener('click', this._openFancybox);

		return newCard;
	}


}