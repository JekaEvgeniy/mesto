



const removeCard = (e) => {
	e.target.closest('.card').remove();
}

const likeCard = (e) => {
	e.target.classList.toggle('card__button_active');
}

const createCardItem = (item) => {
	const card = cardTemplate.content.cloneNode(true);
	const cardTitle = card.querySelector('.card__title');
	const cardImg = card.querySelector('.card__image');

	const cardBtnRemove = card.querySelector('.card__button-remove');
	const cardBtnLike = card.querySelector('.card__button');

	cardTitle.textContent = item.name;

	// Если изображения нет - заменить на no-photo или скрывать изображение (в ТЗ нет)
	if (item.link) {
		cardImg.src = item.link;
	} else {
		cardImg.src = '#';
	}

	cardImg.setAttribute('alt', `${item.name}`);

	cardBtnRemove.addEventListener('click', removeCard);
	cardBtnLike.addEventListener('click', likeCard);

	cardImg.addEventListener('click', openPopupFancyboxImage);

	return card;
}

const renderCardItem = (cardsContainer, item) => {
	cardsContainer.prepend(createCardItem(item));
}

initialCards.forEach((item) => {
	renderCardItem(cardsContainer, item);
});

// # popup profile
profileBtnEdit.addEventListener('click', () => {

	disableSubmitButton(profilePopup, validationConfig);
	hideErrors(profilePopup, validationConfig);

	openPopup(profilePopup);

	const profileTitleText = profileTitle.textContent; // ФИО
	if (profileTitleText) {
		profilePopupInputName.value = profileTitleText;
	}

	const profileSubTitleText = profileSubTitle.textContent; // Статус
	if (profileSubTitleText) {
		profilePopupInputStatus.value = profileSubTitleText;
	}

});

profilePopupForm.addEventListener('submit', submitPopupFormProfile);

// # popup newcard
newCardBtnAdd.addEventListener('click', () => {

	disableSubmitButton(newCardPopup, validationConfig);
	hideErrors(newCardPopup, validationConfig);

	openPopup(newCardPopup);

	newCardPopupInputTitle.value = '';
	newCardPopupInputUrl.value = '';
});

newCardPopupForm.addEventListener('submit', submitPopupFormNewCard);

// # Global all popup
popupBtnsClose.forEach((el) => {
	el.addEventListener('click', (e) => {
		const el = e.target;
		const parentPopup = el.closest('.popup');
		closePopup(parentPopup);
	}); // Global btn
});

function openPopup(popupID) {
	// Открываем нужный нам popup по идишнику ${popupID}
	popupID.classList.add(popupToggleClass);

	document.addEventListener('keydown', closedPopupEsc);
}

function submitPopupFormProfile(e) {
	e.preventDefault();

	const popupInputNameValue = profilePopupInputName.value;
	profileTitle.textContent = popupInputNameValue;

	const popupInputStatusValue = profilePopupInputStatus.value;
	profileSubTitle.textContent = popupInputStatusValue;

	closePopup(profilePopup);
}

function submitPopupFormNewCard(e) {
	const thisForm = e.target;
	e.preventDefault();

	const popupInputTitleValue = newCardPopupInputTitle.value;
	const popupInputUrlValue = newCardPopupInputUrl.value;

	const newItem = {
		'name': popupInputTitleValue,
		'link': popupInputUrlValue,
	}

	renderCardItem(cardsContainer, newItem);

	// очищаем заполненные поля формы, чтобы при повторном открытии popup
	// в инпутах не было предыдущих значений:
	thisForm.reset();

	closePopup(newCardPopup);
}

function closePopup(el) {
	el.classList.remove(popupToggleClass);

	document.removeEventListener('keydown', closedPopupEsc);
}

function openPopupFancyboxImage(e) {
	const el = e.target;
	const elUrl = el.getAttribute('src');
	const elTitle = el.getAttribute('alt');

	if (elUrl && popupImageImage) {
		popupImageImage.src = elUrl;
	}

	if (elTitle) {
		if (popupImageImage) {
			popupImageImage.alt = elTitle;
		}
		if (popupImageCaption) {
			popupImageCaption.textContent = elTitle;
		}
	}

	openPopup(popupImage);
}

function closedPopupEsc(e) {
	if (e.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		if (popupOpened) {
			closePopup(popupOpened);
		}
	}
}

// Закрываем popup по клику на overlay
popups.forEach((el) => {
	el.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) {
			closePopup(e.target);
		}
	});
});
