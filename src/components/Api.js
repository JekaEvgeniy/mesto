export default class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;

		this._cardsUrl = this._url + '/cards';
		this._cardID   = this._url + '/cards/';
		this._cardLikes = this._url + '/cards/cardId/likes';

		this._userUrl  = this._url + '/users/me';
		this._userAvatarUrl = this._url + '/users/me/avatar';
	}

	/*
	* Работаем с карточками
	*/
	getCards() {
		return fetch(this._cardsUrl, {
			headers: this._headers
		})
			.then( (res) => {
				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка при выводе карточек');
			})
	}

	addNewCard(data){
		return fetch(this._cardsUrl, {
			method:'POST',
			headers: this._headers,
			body: JSON.stringify(data),
		})
		.then((data) => {
			if ( data.ok ) return data.json();
		})
		.catch((err) => {
			console.error('Ошибка! Ошибка добавлении новой карточки');
		})
	}


	removeCard(id){
		return fetch(`${this._cardsUrl}/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})

		.then( (res) => {
			if (res.ok) return res.json()

			return Promise.reject('Promise reject error');
		})
		.catch( (err) => {
			console.error('Ошибка! Ошибка удаления карточки');
		})
	}

	// addLike(data){
	// 	return fetch(this._cardLikes, {
	// 		method:'PUT',
	// 		headers: this._headers,
	// 		body: JSON.stringify(data),
	// 	})
	// 	.then((data) => {
	// 		console.warn('APi.js >>> addLike() ');
	// 		console.log(data);

	// 		if ( data.ok ) return data.json();
	// 	})
	// 	.catch((err) => {
	// 		console.error('Ошибка! Ошибка Like карточки');
	// 	})
	// }


	getLikes(data){
		// Получаем список лайков
		return fetch(this._cardLikes, {
			headers: this._headers,
			body: JSON.stringify(data),
		})
		.then((data) => {
			if ( data.ok ) return data.json();
		})
		.catch((err) => {
			console.error('Ошибка! Ошибка getLikes карточки');
		})
	}

	/*
		*	Чтобы лайкнуть карточку, отправьте PUT-запрос:
		* PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
	*/

	addLike(id) {
		return fetch(`${this._cardID}/likes//${id}`, {
			headers: this._headers,
			method: 'PUT',
		})
			.then((res) => {
				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка лайка карточки');
			})
	}

	removeLike(id) {
		return fetch(`${this._cardID}/likes//${id}`, {
			headers: this._headers,
			method: 'DELETE',
		})
			.then((res) => {
				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка дизлайка карточки');
			})
	}



	/*
	* Работаем с инфополем
	*/

	getUserInfo() {
		return fetch(this._userUrl, {
			headers: this._headers
		})
			.then((res) => {
				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка при получении данных о пользователе');
			})
	}

	setUserInfo(data) {

		return fetch(this._userUrl, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(data),
		})
			.then((res) => {
				console.warn('>>> API.JS >>> setUserInfo ');
				console.log(data);

				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка при Добавлении новых данных о пользователе');
			})
	}

	setUserAvatar(data) {

		return fetch(this._userAvatarUrl, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(data),
		})
			.then((res) => {
				console.warn('>>> API.JS >>> setUserAvatar ');
				console.log(data);

				if (res.ok) return res.json();
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка при Добавлении новых данных о пользователе');
			})
	}
}