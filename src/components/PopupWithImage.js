import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

	constructor(selector) {
		super(selector);

		this._popupFigure = this._popup.querySelector('.popup-figure__img');
		this._popupImageCaption = this._popup.querySelector('.popup-figure__figcaption');
	}

	open(link, name) {

		if (link && this._popupFigure) {
			this._popupFigure.src = link;
		}

		if (name) {
			if (this._popupFigure) {
				this._popupFigure.alt = name;
			}
			if (this._popupImageCaption) {
				this._popupImageCaption.textContent = name;
			}
		}

		super.open();
	}
}