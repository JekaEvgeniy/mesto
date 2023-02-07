'use strict';

(function () {
	let popupBtn = document.querySelectorAll('.js-toggle-popup');
	let popupBtnClose = document.querySelectorAll('.js-popup-close');
	let popupToggleClass = 'popup_opened';

	let profileTitle = document.querySelector('.js-profile-header');
	let profileTitleText;
	let profileSubTitle = document.querySelector('.js-profile-subtitle');
	let profileSubTitleText;

	let popupForm = document.querySelectorAll('.js-popup-form');

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
			if (typeof closedAllPopup === 'function') {
				closedAllPopup();
			}
		});
	}

	for (let i = 0; i < popupForm.length; i++) {
		let el = popupForm[i];
		el.addEventListener('submit', function (e) {
			e.preventDefault();

			let inputName = el.querySelector('.js-popup-input-name');
			let inputStatus = el.querySelector('.js-popup-input-status');
			if (inputName) {
				let inputNameVal = inputName.value;
				if (inputNameVal && profileTitle) {
					profileTitle.textContent = inputNameVal;
				}
			}

			if (inputStatus) {
				let inputStatusVal = inputStatus.value;
				if (inputStatusVal && profileSubTitle) {
					profileSubTitle.textContent = inputStatusVal;
				}
			}

			if (typeof closedAllPopup === 'function') {
				closedAllPopup();
			}

		});
	}

	function closedAllPopup() {
		let activePopup = document.querySelector('.js-popup.' + popupToggleClass) ?? document.querySelector('.popup_opened');
		if (activePopup) {
			activePopup.classList.remove(popupToggleClass);
		}
	}
})();

(function(){

	let btnsToggleFavorite = document.querySelectorAll('.js-toggle-favorite');
	for (let i = 0; i < btnsToggleFavorite.length; i++) {
		let btnToggleFavorite = btnsToggleFavorite[i];

		btnToggleFavorite.addEventListener('click', function () {
			btnToggleFavorite.classList.toggle('card__button_active');
		});
	}
})();
