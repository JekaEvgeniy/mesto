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