console.warn(' >>> Card.js');

export default class Card {
	static _template = document.querySelector('#card').content;

	constructor(item, container){
		this._item = item;
		this._container = container;
	}

	render(){
		this._view = Card._template.cloneNode(true).children[0];
		this._container.append(this._view);
	}
}