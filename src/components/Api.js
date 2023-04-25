export default class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;

		this._cardsUrl = this._url + '/cards';
		this._cardID   = this._url + '/cards/';
		this._cardLikes = this._url + '/cards/cardId/likes';

		this._userUrl  = this._url + '/users/me';
		this._userAvatarUrl = this._url + '/users/me/avatar';

		// console.log(this._url);
		console.log(this._cardsUrl);
		console.log(this._cardID);

		// console.warn(this._userUrl);
		// console.warn(this._cardLikes);
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
				// return Promise.reject('Ошибка при выводе карточек');
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
			console.warn('APi.js >>> addNewCard() ');
			console.log(data);

			if ( data.ok ) return data.json();
		})
		.catch((err) => {
			console.error('Ошибка! Ошибка добавлении новой карточки');
		})
	}


	removeCard(id){
		/*
		Чтобы удалить карточку, отправьте DELETE - запрос:
		DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
		*/
		console.warn(`${this._cardsUrl}/${id}`);

		return fetch(`${this._cardsUrl}/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})

		.then( (res) => {
			if (res.ok) return res.json()
		})
		.catch( (err) => {
			// card.removeThisCard();
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
			console.warn('APi.js >>> getLikes() ');
			console.log(data);

			if ( data.ok ) return data.json();
		})
		.catch((err) => {
			console.error('Ошибка! Ошибка getLikes карточки');
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

	// getUserAvatar() {
	// 	return fetch(this._userUrl, {
	// 		headers: this._headers
	// 	})
	// 		.then((res) => {
	// 			if (res.ok) return res.json();
	// 		})
	// 		.catch((err) => {
	// 			console.error('Ошибка! Ошибка при получении аватарки');
	// 		})
	// }

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