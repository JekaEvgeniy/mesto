export default class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;

		this._cardsUrl = this._url + '/cards';
		this._userUrl  = this._url + '/users/me';

		// console.log(this._url);
		// console.warn(this._cardsUrl);
		console.warn(this._userUrl);
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


	/*
	* Работаем с инфополем
	*/

	getUserInfo() {
		return fetch(this._userUrl, {
			headers: this._headers
		})
			.then((res) => {
				console.warn('API.JS >>> getUserInfo >>> ');
				console.log(res);
				if (res.ok) return res.json();
				// return Promise.reject('Ошибка при выводе карточек');
			})
			.catch((err) => {
				console.error('Ошибка! Ошибка при получении данных о пользователе');
			})
	}



}