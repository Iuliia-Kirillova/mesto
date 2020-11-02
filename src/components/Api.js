export class Api {
	constructor(options) {
		this._url = options.url;
		this._headers = options.headers;
		this._body = options.body;
		this._users = options.users;
		this._me = options.me;
	}

	getResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	}

	getUserData() {
		return fetch(`${this._url}${'users'}/${'me'}`, {
			headers: this._headers
		})
			.then(this.getResponse)
	}

	editUserData({ name, about }) {
		return fetch(`${this._url}${'users'}/${'me'}`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				about
			})
		})
			.then(this.getResponse)
	}

	editAvatar({ avatar }) {
		return fetch(`${this._url}${'users'}/${'me'}/${'avatar'}`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ avatar })
		})
			.then(this.getResponse)
	}

	getInitialCards() {
		return fetch(`${this._url}${'cards'}`, {
			headers: this._headers
		})
			.then(this.getResponse)
	}

	addCards(name, link) {
		return fetch(`${this._url}${'cards'}`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(name, link)
		})
			.then(this.getResponse)
	}

	deleteCard(data) {
		return fetch(`${this._url}${'cards'}/${data._id}`, {
			method: 'DELETE',
			headers: this._headers,
			body: JSON.stringify()
		})
			.then(this.getResponse)
	}

	addLike(data) {
		return fetch(`${this._url}${'cards'}/${'likes'}/${data._id}`, {
			method: 'PUT',
			headers: this._headers,
			body: JSON.stringify(data)
		})
			.then(this.getResponse)
	}

	removeLikes(data) {
		return fetch(`${this._url}${'cards'}/${'likes'}/${data._id}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(this.getResponse)
	}
}
