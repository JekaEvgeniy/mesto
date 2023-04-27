export default class Section {
	constructor({ renderer }, container ){
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	renderItems(items) {
		items.forEach( (item, counter) => {
			if (counter < 10){
			}
			this._renderer(item);
		});
	}

	addItem(el, reverse) {
		// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
		// this._container.prepend(el)

		(reverse) ? this._container.prepend(el) : this._container.append(el);
	}

}