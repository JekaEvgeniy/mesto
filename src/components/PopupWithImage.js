import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

	constructor(selector) {
		super(selector);

		this._popupFigure = this._popup.querySelector('.popup-figure__img');
		this._popupImageCaption = this._popup.querySelector('.popup-figure__figcaption');
	}

	open(link, name){
		const elUrl = link;
		const elTitle = name;

		const popupFigure = this._popupFigure;
		const popupImageCaption = this._popupImageCaption;

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