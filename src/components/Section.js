export default class Section {
	constructor({items, renderer}, container ){
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	renderItems() {
		console.warn(this._container);
		this._items.forEach( (item) => {
			const el = this._renderer(item);
			console.log(`=====`);
			console.log(el);
			console.log(`=====`);
			this.addItem(el);
		});
	}

	addItem(el) {
		// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
		console.error(this._container);
		this._container.prepend(el)
	}

}