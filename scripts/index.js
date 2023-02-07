'use strict';

(function () {
	let popupBtn = document.querySelectorAll('.js-toggle-popup');
	let popupBtnClose = document.querySelectorAll('.js-popup-close');
	let popupToggleClass = 'popup_opened';

	let profileTitle = document.querySelector('.js-profile-header');
	let profileTitleText;
	let profileSubTitle = document.querySelector('.js-profile-subtitle');
	let profileSubTitleText;

	for (let i = 0; i < popupBtn.length; i++) {
		let el = popupBtn[i];
		el.addEventListener('click', function () {
			let target = el.getAttribute('data-target');
			if (target) {
				let popup = document.querySelector('.js-popup[data-target="' + target + '"]');
				if (popup) {
					popup.classList.add(popupToggleClass);
				}

				if (target == 'profile' && popup) {
					let popupInputName = popup.querySelector('.js-popup-input-name');
					if (profileTitle) {
						profileTitleText = profileTitle.innerText;
					}
					if (profileTitleText && popupInputName) {
						popupInputName.value = profileTitleText;
					}


					let popupInputStatus = popup.querySelector('.js-popup-input-status');
					if (profileSubTitle) {
						profileSubTitleText = profileSubTitle.innerText;
					}
					if (profileSubTitleText) {
						popupInputStatus.value = profileSubTitleText;
					}
				}
			}
		});
	}

	for (let i = 0; i < popupBtnClose.length; i++) {
		let el = popupBtnClose[i];
		el.addEventListener('click', function () {
			let activePopup = document.querySelector('.' + popupToggleClass);
			if (activePopup) {
				activePopup.classList.remove(popupToggleClass);
			}
		});
	}
})();
