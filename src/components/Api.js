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


}