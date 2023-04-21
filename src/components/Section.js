export default class Section {
	constructor({items, renderer}, container ){
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	renderItems() {
		this._items.forEach( (item) => {
			const el = this._renderer(item);
			this.addItem(el);
		});
	}

	addItem(el) {
		// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
		this._container.prepend(el)
	}

}