/*

Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.

*/

import {
	popupToggleClass,
	popupFigure,
	popupImageCaption,
} from './index.js';

export default class Popup {
	constructor(selector){
		this._selector = document.querySelector(selector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open(){
		console.log(this._selector);
		this._selector.classList.add(popupToggleClass);

		// document.addEventListener('keydown', closedPopupEsc);
		document.addEventListener('keydown', this._handleEscClose);
	}

	close(){
		console.warn(`===> close()`);
		this._selector.classList.remove(popupToggleClass);
	}

	_handleEscClose(e){
			console.log('Escape');
			if (e.key === 'Escape') {
				this.close();
			}
	}


	setEventListeners(){
		console.log('>>> setEventListeners()');

		this._selector.addEventListener('click', (e) => {
			// Закрываем popup по клику на overlay
			if (e.target === e.currentTarget) {
				this.close();
			}
		});
	}
}

// function closedPopupEsc(e) {

// }