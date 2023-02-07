'use strict';

(function () {
	let popupBtn = document.querySelectorAll('.js-toggle-popup');
	let popupBtnClose = document.querySelectorAll('.js-popup-close');
	let popupToggleClass = 'popup_is-opened';

	for (let i = 0; i < popupBtn.length; i++) {
		let el = popupBtn[i];
		el.addEventListener('click', function () {
			let target = el.getAttribute('data-target');
			if (target) {
				let popup = document.querySelector('.js-popup[data-target="' + target + '"]');
				if (popup) {
					popup.classList.add(popupToggleClass);
				}
			}
		});
	}

	for (let i = 0; i < popupBtnClose.length; i++) {
		let el = popupBtnClose[i];
		el.addEventListener('click', function () {
			let activePopup = document.querySelector('.popup_is-opened');
			if (activePopup ){
				activePopup.classList.remove(popupToggleClass);
			}
		});
	}
})();
