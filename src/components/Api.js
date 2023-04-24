export default class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;

		this._cardsUrl = this._url + '/cards';

		console.log(this._url);
		console.warn(this._cardsUrl);
	}

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


}