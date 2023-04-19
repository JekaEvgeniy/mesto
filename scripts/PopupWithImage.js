/*

Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

*/

import {
	popupFigure,
	popupImageCaption,
} from './index.js';

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	open(link, name){
		const elUrl = link;
		const elTitle = name;

		if (elUrl && popupFigure) {
			popupFigure.src = elUrl;
		}

		if (elTitle) {
			if (popupFigure) {
				popupFigure.alt = elTitle;
			}
			if (popupImageCaption) {
				popupImageCaption.textContent = elTitle;
			}
		}

		super.open();
	}
}