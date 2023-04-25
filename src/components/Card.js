export default class Card {

	constructor({ name, link }, container, handleCardClick, id, author, likes, myID, handleRemoveClick) {
		this._name = name;
		this._link = link;
		this._container = container;
		this._handleCardClick = handleCardClick;
		this._handleRemoveClick = handleRemoveClick;

		this._id = id;
		this._author = author;
		this._likes = likes;
		this._myID = myID;
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
		this._cardCounter = this._view.querySelector('.card__counter');

		this._cardTitle.textContent = this._name;

		// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)

		if (this._link) {
			this._cardImage.src = this._link;
		} else {
			this._cardImage.src = '#';
		}

		this._cardImage.setAttribute('alt', `${this._name}`);


		//console.warn(`!!!!!! this._id = ${this._id}`);
		//console.warn(`!!!!!! this._myID = ${this._myID}`);
		// console.table(this._api);
		// console.table(this._api.likes);
		// console.log(this._id);
		// console.log(this._api);

		this._cardCounter.textContent = this._likes;


		const checkMyCard = (this._myID === this._author) ? true : false;

		if (! checkMyCard ){
			this._btnRemove.remove()
		}

		this._setEventListeners();

		return this._view;
	}

	_setEventListeners() {

		this._view.querySelector('.card__button').addEventListener('click', this._likeCard);

		if ( this._view.querySelector('.card__button-remove') ){
			// Добавляем кнопку удаления только у тех карточек, где она есть

			this._view.querySelector('.card__button-remove').addEventListener('click', () => {
				console.log(`>>> Card.js >>> _setEventListeners >>> this._id = ${this._id}`);

				this._handleRemove();
			});
		}

		this._view.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));

	}


	_removeCard = () => {
		console.log('>>> card.js _removeCard')
		this._view.remove();
	}









	_handleRemove() {
		console.warn(`>>> card.js _handleRemoveClick  + ID = ${this._id}`);
		this._handleRemoveClick(this._id);
	}

	removeThisCard() {
		console.log('>>> card.js >>>  removeThisCard');
		this._view.remove();
		this._view = null;
	}


	_likeCard = () => {
		this._btnLike.classList.toggle('card__button_active');
	}

}
