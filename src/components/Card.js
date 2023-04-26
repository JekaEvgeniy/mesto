export default class Card {

// { name, link },
// , handleCardClick, id, author, likes, myID, handleRemoveClick
	constructor(container, { data, handleRemoveClick } ) {
		this._container = container;
		this._data = data;

		// console.log(data);

		this._name = this._data.name;
		this._link = this._data.link;
		this._likes = this._data.likes;

		// this._id     = data._id;
		// this._author = data.owner._id;

		// this._myID = myID;

		// console.log(`this._name    = ${this._name   }`);
		// console.log(`this._link    = ${this._link   }`);
		// console.log(`this._likes   = ${this._likes  }`);

		// console.log(`this._id      = ${this._id     }`);
		// console.log(`this._author  = ${this._author }`);


		// this._handleCardClick = handleCardClick;
		this._handleRemoveClick = handleRemoveClick;

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

		this._cardCounter.textContent = (this._likes) ? this._likes.length : 0;


		const checkMyCard = (this._myID === this._author) ? true : false;

		if (! checkMyCard ){
			this._btnRemove.remove()
		}

		this._setEventListeners();

		return this._view;
	}

	_setEventListeners() {

		// this._view.querySelector('.card__button').addEventListener('click', this._likeCard);

		// this._view.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));

		// if ( this._view.querySelector('.card__button-remove') ){
			// Добавляем кнопку удаления только у тех карточек, где она есть

			this._btnRemove.addEventListener('click', () => {
				console.warn(`>>> Card.js >>> _setEventListeners >>> this._id = ${this._id}`);

				this._handleRemoveClick(this);
			});
		// }



	}


	// _removeCard = () => {
	// 	console.log('>>> card.js _removeCard')
	// 	this._view.remove();
	// }



	// _handleRemove() {
	// 	console.warn(`>>> card.js _handleRemoveClick  + ID = ${this._id}`);
	// 	this._handleRemoveClick(this._id);
	// }

	removeThisCard() {
		console.log('>>> card.js >>>  removeThisCard');
		// this._view.remove();
		// this._view = null;
	}


	// _likeCard = () => {
	// 	this._btnLike.classList.toggle('card__button_active');
	// }

}
