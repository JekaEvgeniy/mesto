/*

Преобразуйте класс Card

Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.

*/



export default class Card {
	static _template = document.querySelector('#card').content;

	constructor({ name, link }, container, handleCardClick) {
		this._name = name;
		this._link = link;
		this._container = container;
		this._handleCardClick = handleCardClick;
	}

	_cardTemplate() {
		return Card._template.cloneNode(true).children[0];
	}

	renderNewCard() {
		this._view = this._cardTemplate();

		const view = this._view;

		const cardTitle = view.querySelector('.card__title');

		this._btnLike = view.querySelector('.card__button');

		this._btnRemove = view.querySelector('.card__button-remove');

		this._cardImage = view.querySelector('.card__image');
		const cardImg = this._cardImage;

		cardTitle.textContent = this._name;

		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
		if (this._link) {
			cardImg.src = this._link;
		} else {
			cardImg.src = '#';
		}

		cardImg.setAttribute('alt', `${this._name}`);

		this._setEventListeners();

		return view;
	}

	_setEventListeners() {
		this._btnRemove.addEventListener('click', this._removeCard);

		this._btnLike.addEventListener('click', this._likeCard);

		this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
	}


	_removeCard = () => {
		this._view.remove();
	}

	_likeCard = () => {
		this._btnLike.classList.toggle('card__button_active');
	}

}

/*

https://images.unsplash.com/photo-1661956603025-8310b2e3036d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60

*/