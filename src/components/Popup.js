export default class Popup {
	constructor(selector){
		this._popup = document.querySelector(selector);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._button = this._popup.querySelector('.popup__button');
	}

	open(){
		this._popup.classList.add('popup_opened');

		document.addEventListener('keydown', this._handleEscClose);
	}

	close(){
		this._popup.classList.remove('popup_opened');

		document.removeEventListener('keydown', this._handleEscClose);
	}

	_handleEscClose(e){

			if (e.key === 'Escape') {
				this.close();
			}

	}

	replaceBtnText(defaultText, replaceText, value) {
		// replaceBtnText('Создать', 'Сохранение...', true);
		console.log(`defaultText = ${defaultText}; replaceText = ${replaceText}; value = ${value}`);

		if (value) {
			console.log('1');
			this._button.textContent = replaceText;
		} else {
			console.log('2');
			this._button.textContent = defaultText;
		}

		// (value) ?
		// 	this._button.textContent = replaceText :
		// 	this._button.textContent = defaultText;
	}


	setEventListeners(){

		this._popup.addEventListener('click', (e) => {
			// Закрываем popup по клику на overlay
			if (e.target === e.currentTarget) {
				this.close();
			}
		});

		this._popup.querySelector('.popup__close').addEventListener('click', (e) => {
			if (e.target === e.currentTarget) {
				this.close();
			}
		});

	}
}
