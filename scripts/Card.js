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

	_removeCard = () => {
		this._view.remove();
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

	_setEventListeners(){
		const view = this._view;

		this._btnRemove.addEventListener('click', this._removeCard);

		this._btnLike.addEventListener('click', this._likeCard);

		this._cardImage.addEventListener('click', this._openFancybox);
	}

	renderNewCard() {
/*
Следует вынести установку слушателей в отдельный метод (_setEventListeners), чтобы разделить код. При этом вам потребуется сохранить изображение карточки не в локальную переменную cardImg, а в свойство класса. Например this._cardImage
*/

		this._view = this._cardTemplate();

		const item = this._item;
		const view = this._view;

		const cardTitle = view.querySelector('.card__title');

		this._btnLike = view.querySelector('.card__button');

		this._btnRemove = view.querySelector('.card__button-remove');

		this._cardImage = view.querySelector('.card__image');
		const cardImg = this._cardImage;

		cardTitle.textContent = item.name;

		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
		if (item.link) {
			cardImg.src = item.link;
		} else {
			cardImg.src = '#';
		}

		cardImg.setAttribute('alt', `${item.name}`);


		this._setEventListeners();

		return view;
	}


}