(()=>{"use strict";var e=document.querySelector("#popup-profile"),t=e.querySelector(".popup__form"),r=e.querySelector(".popup__input_type_name"),n=e.querySelector(".popup__input_type_status"),o=document.querySelector(".profile__button_type_edit"),i="#cards",u=(document.querySelector(i),document.querySelector(".profile__button_type_add")),c=document.querySelector("#popup-newcard").querySelector(".popup__form"),a=document.querySelector("#popup-image"),s=(a.querySelector(".popup-figure__img"),a.querySelector(".popup-figure__figcaption"),document.querySelector(".profile__button_type_avatar")),l=document.querySelector("#popup-avatar").querySelector(".popup__form"),f="#popup-question";document.querySelector(f).querySelector(".popup__form");const p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==y(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===y(o)?o:String(o)),n)}var o}var v=function(){function e(t){var r=t.nameSelector,n=t.aboutSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(r),this._about=document.querySelector(n),this._avatar=document.querySelector(o)}var t,r;return t=e,(r=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent}}},{key:"getUserAvatar",value:function(){return{avatar:this._avatar.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,r=e.about,n=e.avatar;t&&(this._name.textContent=t),r&&(this._about.textContent=r),n&&(this._avatar.src=n)}}])&&h(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function _(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==b(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==b(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===b(o)?o:String(o)),n)}var o}var d=function(){function e(t,r){var n=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=n,this._container=document.querySelector(r)}var t,r;return t=e,(r=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e,r){t._renderer(e)}))}},{key:"addItem",value:function(e,t){t?this._container.prepend(e):this._container.append(e)}}])&&_(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function S(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==m(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}var g=function(){function e(t,r){var n=r.data,o=r.handleRemoveClick,i=r.handleLikeClick,u=r.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=t,this._data=n,this._name=n.name,this._link=n.link,this._likes=n.likes,this._id=n._id,this._author=n.owner._id,this._myID=n.myID,this._handleCardClick=u,this._handleRemoveClick=o,this._handleLikeClick=i}var t,r;return t=e,(r=[{key:"_cardTemplate",value:function(){return document.querySelector(this._container).content.querySelector(".card").cloneNode(!0)}},{key:"renderNewCard",value:function(){return this._view=this._cardTemplate(),this._btnLike=this._view.querySelector(".card__button"),this._btnRemove=this._view.querySelector(".card__button-remove"),this._cardImage=this._view.querySelector(".card__image"),this._cardTitle=this._view.querySelector(".card__title"),this._cardCounter=this._view.querySelector(".card__counter"),this._cardTitle.textContent=this._name,this._link?this._cardImage.src=this._link:this._cardImage.src="#",this._cardImage.setAttribute("alt","".concat(this._name)),this._cardCounter.textContent=this._likes?this._likes.length:0,this._myID===this._author||this._btnRemove.remove(),this.checkMyLike()&&this.addLike(),this._setEventListeners(),this._view}},{key:"updateLikes",value:function(e){this._likes=e.likes,this._cardCounter.textContent=e.likes.length,this.checkMyLike()?this.addLike():this.removeLike()}},{key:"checkMyLike",value:function(){for(var e=!1,t=this._likes,r=0;r<t.length;r++)if(t[r]._id===this._myID){e=!0;break}return e}},{key:"addLike",value:function(){this._btnLike.classList.add("card__button_active")}},{key:"removeLike",value:function(){this._btnLike.classList.remove("card__button_active")}},{key:"_setEventListeners",value:function(){var e=this;this._btnLike.addEventListener("click",(function(){e._handleLikeClick()})),this._cardImage.addEventListener("click",(function(){return e._handleCardClick(e._link,e._name)})),this._btnRemove&&this._btnRemove.addEventListener("click",(function(){e._handleRemoveClick()}))}},{key:"removeThisCard",value:function(){this._view.remove(),this._view=null}}])&&S(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==k(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===k(o)?o:String(o)),n)}var o}var O=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._button=this._popup.querySelector(".popup__button")}var t,r;return t=e,(r=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"replaceBtnText",value:function(e,t,r){this._button.textContent=r?t:e}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){t.target===t.currentTarget&&e.close()})),this._popup.querySelector(".popup__close").addEventListener("click",(function(t){t.target===t.currentTarget&&e.close()}))}}])&&w(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function E(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==j(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===j(o)?o:String(o)),n)}var o}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=L(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},P.apply(this,arguments)}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(u,e);var t,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(n);if(o){var r=L(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupFigure=t._popup.querySelector(".popup-figure__img"),t._popupImageCaption=t._popup.querySelector(".popup-figure__figcaption"),t}return t=u,(r=[{key:"open",value:function(e,t){e&&this._popupFigure&&(this._popupFigure.src=e),t&&(this._popupFigure&&(this._popupFigure.alt=t),this._popupImageCaption&&(this._popupImageCaption.textContent=t)),P(L(u.prototype),"open",this).call(this)}}])&&E(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),u}(O);function I(e){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(e)}function R(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==I(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==I(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===I(o)?o:String(o)),n)}var o}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},q.apply(this,arguments)}function B(e,t){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},B(e,t)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(u,e);var t,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(n);if(o){var r=x(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===I(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t,r=e.selector,n=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,r))._form=t._popup.querySelector(".popup__form"),t._handleFormSubmit=n,t._inputs=t._form.querySelectorAll(".popup__input"),t._button=t._popup.querySelector(".popup__button"),t._inputsValuesObj={},t}return t=u,(r=[{key:"_getInputValues",value:function(){var e=this;return this._inputs.forEach((function(t){e._inputsValuesObj[t.name]=t.value})),this._inputsValuesObj}},{key:"close",value:function(){q(x(u.prototype),"close",this).call(this),this._form&&this._form.reset()}},{key:"replaceBtnText",value:function(e,t,r){q(x(u.prototype),"replaceBtnText",this).call(this,e,t,r)}},{key:"setEventListeners",value:function(){var e=this;q(x(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}}])&&R(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),u}(O);function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function F(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==D(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==D(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===D(o)?o:String(o)),n)}var o}function M(){return M="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},M.apply(this,arguments)}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},V(e,t)}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}var N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}(u,e);var t,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(n);if(o){var r=A(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t,r=e.selector,n=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,r))._form=t._popup.querySelector(".popup__form"),t._button=t._popup.querySelector(".popup__button"),t._handleFormSubmit=n,t}return t=u,(r=[{key:"setEventListeners",value:function(){var e=this;M(A(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit()}))}},{key:"replaceBtnText",value:function(e,t,r){M(A(u.prototype),"replaceBtnText",this).call(this,e,t,r)}},{key:"formSubmit",value:function(e){this._handleFormSubmit=e}}])&&F(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),u}(O);function J(e){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},J(e)}function H(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,G(n.key),n)}}function z(e,t,r){return(t=G(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function G(e){var t=function(e,t){if("object"!==J(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==J(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===J(t)?t:String(t)}var K=function(){function e(t,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),z(this,"_setEventListeners",(function(){n._inputs.forEach((function(e){e.addEventListener("input",(function(t){n._toggleInputState(e),n._toggleBtnState()}))})),n._toggleBtnState()})),z(this,"_toggleInputState",(function(e){var t=e.validity.valid,r=n._getErrorMessage(e);t?(n._removeStateInputError(e),n._hideMessageInputError(r,e)):(n._addStateInputError(e),n._showMessageInputError(r,e))})),z(this,"_addStateInputError",(function(e){var t=n._classes;e.classList.add(t.inputErrorClass)})),z(this,"_removeStateInputError",(function(e){var t=n._classes;e.classList.remove(t.inputErrorClass)})),z(this,"_showMessageInputError",(function(e,t){var r=n._classes;e&&(e.textContent=t.validationMessage,e.classList.add(r.errorClass))})),z(this,"_hideMessageInputError",(function(e){var t=n._classes;e&&(e.textContent="",e.classList.remove(t.errorClass))})),z(this,"_toggleBtnState",(function(){n._inputs.every((function(e){return e.validity.valid}))?n._enableButton():n._disableButton()})),z(this,"_disableButton",(function(){var e=n._classes;n._btnSubmit.classList.add(e.inactiveButtonClass),n._btnSubmit.disabled=!0})),z(this,"_enableButton",(function(){var e=n._classes;n._btnSubmit.classList.remove(e.inactiveButtonClass),n._btnSubmit.disabled=!1})),this._classes=t,this._form=r,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputs=Array.from(this._form.querySelectorAll(t.inputSelector)),this._btnSubmit=this._form.querySelector(t.submitButtonSelector)}var t,r;return t=e,(r=[{key:"_getErrorMessage",value:function(e){return this._form.querySelector("#".concat(e.id,"-error"))}},{key:"resetValidation",value:function(){var e=this;this._inputs.forEach((function(t){var r=e._getErrorMessage(t);e._removeStateInputError(t),e._hideMessageInputError(r,t)})),this._disableButton()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&H(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function W(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==Q(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==Q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===Q(o)?o:String(o)),n)}var o}function X(e){return X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},X(e)}function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){$(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function $(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==X(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==X(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===X(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ee,te=new(function(){function e(t){var r=t.url,n=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=r,this._headers=n,this._cardsUrl=this._url+"/cards",this._cardID=this._url+"/cards/",this._cardLikes=this._url+"/cards/cardId/likes",this._userUrl=this._url+"/users/me",this._userAvatarUrl=this._url+"/users/me/avatar"}var t,r;return t=e,(r=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Promise reject error")}},{key:"getCards",value:function(){return fetch(this._cardsUrl,{headers:this._headers}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка при выводе карточек")}))}},{key:"addNewCard",value:function(e){return fetch(this._cardsUrl,{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка добавлении новой карточки")}))}},{key:"removeCard",value:function(e){return fetch("".concat(this._cardsUrl,"/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка удаления карточки")}))}},{key:"addLike",value:function(e){return fetch("".concat(this._cardID,"/likes//").concat(e),{headers:this._headers,method:"PUT"}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка лайка карточки")}))}},{key:"removeLike",value:function(e){return fetch("".concat(this._cardID,"/likes//").concat(e),{headers:this._headers,method:"DELETE"}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка дизлайка карточки")}))}},{key:"getUserInfo",value:function(){return fetch(this._userUrl,{headers:this._headers}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка при получении данных о пользователе")}))}},{key:"setUserInfo",value:function(e){return fetch(this._userUrl,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка при Добавлении новых данных о пользователе")}))}},{key:"setUserAvatar",value:function(e){return fetch(this._userAvatarUrl,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse).catch((function(e){console.error("Ошибка! Ошибка при Добавлении новых данных о пользователе")}))}}])&&W(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}())({url:"https://mesto.nomoreparties.co/v1/cohort-64",headers:{authorization:"3d7a6b3d-0c4e-42b2-9c9f-9a1fd7b681b9","Content-Type":"application/json"}}),re=new v({nameSelector:".profile__header",aboutSelector:".profile__subtitle",avatarSelector:".profile__avatar"}),ne=new K(p,t);ne.enableValidation();var oe=new K(p,c);oe.enableValidation();var ie=new K(p,l);ie.enableValidation();var ue=new d({renderer:function(e){ue.addItem(ce(e))}},i);function ce(e){var t=new g("#card",{data:Z(Z({},e),{},{myID:ee}),handleRemoveClick:function(){ae.open(t._id),ae.formSubmit((function(){ae.replaceBtnText("Да","Сохранение...",!0),te.removeCard(t._id).then((function(e){t.removeThisCard(e),ae.close()})).catch((function(e){console.error("Ошибка! Ошибка удаления карточки")})).finally((function(){ae.replaceBtnText("Да","Сохранение...",!1)}))}))},handleLikeClick:function(){t.checkMyLike()?te.removeLike(t._id).then((function(e){t.updateLikes(e)})).catch((function(e){console.error("Ошибка! Ошибка удаления лайка карточки")})):te.addLike(t._id).then((function(e){t.updateLikes(e)})).catch((function(e){console.error("Ошибка! Ошибка лайка карточки")}))},handleCardClick:function(){fe.open(e.link,e.name)}});return t.renderNewCard()}var ae=new N({selector:f});ae.setEventListeners();var se=new U({selector:"#popup-profile",handleFormSubmit:function(e){se.replaceBtnText("Сохранить","Сохранение...",!0),te.setUserInfo(e).then((function(t){re.setUserInfo({name:e.name,about:e.about}),se.close()})).catch((function(e){console.error("Ошибка! Ошибка добавления информации")})).finally((function(){se.replaceBtnText("Сохранить","Сохранение...",!1)}))}});Promise.all([te.getUserInfo(),te.getCards()]).then((function(e){ee=e[0]._id,re.setUserInfo({name:e[0].name,about:e[0].about,avatar:e[0].avatar}),ue.renderItems(e[1])})).catch((function(e){console.error(e)}));var le=new U({selector:"#popup-newcard",handleFormSubmit:function(e){le.replaceBtnText("Создать","Сохранение...",!0),te.addNewCard(e).then((function(e){ue.addItem(ce(e),!0),le.close()})).catch((function(e){console.error("Ошибка! Ошибка добавлении новой карточки"),console.error(e)})).finally((function(){le.replaceBtnText("Создать","Сохранение...",!1)}))}});le.setEventListeners(),u.addEventListener("click",(function(){oe.resetValidation(),le.open()}));var fe=new T("#popup-image");fe.setEventListeners(),se.setEventListeners(),o.addEventListener("click",(function(){ne.resetValidation(),se.open();var e=re.getUserInfo(),t=e.name;t&&(r.value=t);var o=e.about;o&&(n.value=o)}));var pe=new U({selector:"#popup-avatar",handleFormSubmit:function(e){pe.replaceBtnText("Сохранить","Сохранение...",!0),te.setUserAvatar(e).then((function(e){re.setUserInfo({avatar:e.avatar}),pe.close()})).catch((function(e){console.error("Ошибка! Ошибка добавлении новой фотографии"),console.error(e)})).finally((function(){pe.replaceBtnText("Сохранить","Сохранение...",!1)}))}});pe.setEventListeners(),s.addEventListener("click",(function(){ie.resetValidation(),pe.open()}))})();
//# sourceMappingURL=main.js.map