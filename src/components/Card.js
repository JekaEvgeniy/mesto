export default class Card {

	constructor({ name, link }, container, handleCardClick, reverse) {
		this._name = name;
		this._link = link;
		this._container = container;
		this._handleCardClick = handleCardClick;
		this._reverse = reverse;
	}

	_cardTemplate() {
		const item = document.querySelector(this._container).content
			.querySelector('.card')
			.cloneNode(true);

		return item;
	}

	renderNewCard() {
		this._view = this._cardTemplate();

		this._btnLike = this._view.querySelector('.card__button');
		this._btnRemove = this._view.querySelector('.card__button-remove');
		this._cardImage = this._view.querySelector('.card__image');
		this._cardTitle = this._view.querySelector('.card__title');

		this._cardTitle.textContent = this._name;

		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
		// console.log(this._link);
		console.log(`this._reverse1 = ${this._reverse}` );

		if (this._link) {
			this._cardImage.src = this._link;
		} else {
			this._cardImage.src = '#';
		}

		this._cardImage.setAttribute('alt', `${this._name}`);

		this._setEventListeners();

		return this._view;
	}

	_setEventListeners() {

		this._view.querySelector('.card__button').addEventListener('click', this._likeCard);

		// this._view.querySelector('.card__button-remove').addEventListener('click', () => this._removeCard());

		this._view.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));

	}


	_removeCard = () => {
		this._view.remove();
	}

	_likeCard = () => {
		this._btnLike.classList.toggle('card__button_active');
	}

}
