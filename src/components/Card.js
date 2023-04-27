export default class Card {
	constructor(container, { data, handleRemoveClick, handleLikeClick, handleCardClick }) {
		this._container = container;
		this._data = data;

		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;

		this._id = data._id;
		this._author = data.owner._id;

		this._myID = data.myID;

		this._handleCardClick = handleCardClick;
		this._handleRemoveClick = handleRemoveClick;
		this._handleLikeClick = handleLikeClick;
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

		this._cardCounter.textContent = (this._likes) ? this._likes.length : 0;

		const checkMyCard = (this._myID === this._author) ? true : false;
		if (!checkMyCard) {
			this._btnRemove.remove()
		}

		// при загрузке страницы toggle like
		if (this.checkMyLike()) {
			this.addLike();
		}

		this._setEventListeners();

		return this._view;
	}

	updateLikes(res) {
		this._likes = res.likes;

		this._cardCounter.textContent = res.likes.length;

		if (this.checkMyLike()) {
			this.addLike();
		} else {
			this.removeLike();
		}
	}

	checkMyLike() {
		/* Проверяем, есть ли мой лайк */
		let checkMyLike = false;

		const arrLikeUsers = this._likes;

		for (let i = 0; i < arrLikeUsers.length; i++) {
			let user = arrLikeUsers[i];
			let userID = user._id;

			if (userID === this._myID) {
				checkMyLike = true;
				break;
			}
		}

		return checkMyLike;
	}

	addLike() {
		this._btnLike.classList.add('card__button_active');
	}

	removeLike() {
		this._btnLike.classList.remove('card__button_active');
	}

	_setEventListeners() {
		this._btnLike.addEventListener('click', () => {
			this._handleLikeClick();
		});

		this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));

		if (this._btnRemove) {
			// // Добавляем слушатель только там, где есть кнопка

			this._btnRemove.addEventListener('click', () => {
				this._handleRemoveClick();
			});
		}
	}

	removeThisCard() {
		this._view.remove();
		this._view = null;
	}
}
