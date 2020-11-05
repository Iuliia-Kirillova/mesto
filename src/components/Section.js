export class Section {

	constructor({ renderer }, containerSelector) {
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

	rendererItems(items) {
		items.forEach(item => {
			this._renderer({ name: item.name, link: item.link, _id: item._id, owner: item.owner._id, ownerId: item.owner._id, likes: item.likes });
		})
	}
}
