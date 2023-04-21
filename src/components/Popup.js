export default class Popup {
	constructor(selector){
		this._selector = document.querySelector(selector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open(){
		this._selector.classList.add('popup_opened');

		document.addEventListener('keydown', this._handleEscClose);
	}

	close(){
		this._selector.classList.remove('popup_opened');
	}

	_handleEscClose(e){

			if (e.key === 'Escape') {
				this.close();
			}

	}

	setEventListeners(){

		this._selector.addEventListener('click', (e) => {
			// Закрываем popup по клику на overlay
			if (e.target === e.currentTarget) {
				this.close();
			}
		});

		this._selector.querySelector('.popup__close').addEventListener('click', (e) => {
			if (e.target === e.currentTarget) {
				this.close();
			}
		});

	}
}
