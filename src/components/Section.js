export class Section {

    constructor({ items, renderer }, containerSelector) {

        this._items = items; 
        this._renderer = renderer;
        this._container = document.querySelector('.elements');

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
            this._renderer(item); 
        })
    }

}