import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

	constructor(selector) {
		super(selector);

		this._popupFigure = this._selector.querySelector('.popup-figure__img');
		this._popupImageCaption = this._selector.querySelector('.popup-figure__figcaption');
	}

	open(link, name){
		const elUrl = link;
		const elTitle = name;

		if (elUrl && popupFigure) {
			this._popupFigure.src = elUrl;
		}

		if (elTitle) {
			if (popupFigure) {
				this._popupFigure.alt = elTitle;
			}
			if (popupImageCaption) {
				this._popupImageCaption.textContent = elTitle;
			}
		}

		super.open();
	}
}