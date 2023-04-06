Чужие вопросы/ответы:


Хотя снаружи ты обратится вряд ли сейчас сможешь, потому что инициализировал FormValidator таким образом что к получившимся объектам нельзя обратиться

const formList = Array.from(document.querySelectorAll(selectors.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, submitCreateCard, formElement);
  formValidator.enableValidation();
});

Плохой вариант

Ты инициалируешь классы внутри колбека forEach, снаружи к ним нет доступа

Тебе нужно каждую форму по отдельности найти и использовать каждую в отдельности чтобы инициализировать класс FormValidator

И избавится от formList.forEach



Владислав Балабанович [наставник]

00:48
Например с формой добавления карточки:

const addCardPopup = document.querySelector('.popup_create-card');
const addFormValidator = new FormValidator(selectors, addCardPopup);
И в этом случае потом можно будет в нужно месте адресно обратится к addFormValidator и через него дернуть метод типа disableSubmitButton (который в FormValidator надо реализовать)

//окно добавления карточек (вызов функций)
buttonOpenPopupAddCard.addEventListener('click', () => {
  clickOpenPopup(popupCreateCard);

  addFormValidator.disableSubmitButton();
});