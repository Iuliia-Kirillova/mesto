export class Section {

	constructor({ items, renderer }, containerSelector) {

		this._items = items;
		this._renderer = renderer;
		this._container = containerSelector;
	}

	addItem(item, isArray) {
		if (isArray) {
			this._container.append(item);
		} else {
			this._container.prepend(item);
		}
	}

	renderItem(item) {
		this._renderer(item);
	}

	rendererItems() {
		this._items.forEach(item => {
				this._renderer({ name: item.name, link: item.link, _id: item._id, owner: item.owner._id, ownerId: item.owner._id, likes: item.likes });
			})
	}
}