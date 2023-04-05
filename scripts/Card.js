import {
	openPopup,

	popupImage,
	popupImageImage,
	popupImageCaption
} from './index.js';

export default class Card {
	static _template = document.querySelector('#card').content;

	constructor(item, container){
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

	render(){
		this._view = Card._template.cloneNode(true).children[0];

		const item = this._item;
		const view = this._view;

		const cardTitle = view.querySelector('.card__title');
		const cardImg   = view.querySelector('.card__image');

		cardTitle.textContent = item.name;
		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
		if (item.link) {
			cardImg.src = item.link;
		} else {
			cardImg.src = '#';
		}

		cardImg.setAttribute('alt', `${item.name}`);

		view.querySelector('.card__button-remove').addEventListener('click', this._removeCard);

		view.querySelector('.card__button').addEventListener('click', this._likeCard);

		view.querySelector('.card__image').addEventListener('click', this._openFancybox);

		this._container.append(this._view);
	}
}