export class UserInfo {

	constructor(name, about, avatar) {

		this._nameSelector = name;
		this._infoSelector = about;
		this._avatar = avatar;
	}

	getUserInfo(data) {
		const userInfo = {
			name: data.name,
			about: data.about,
			avatar: data.avatar,
			id: data._id
		}

		return userInfo;
	}

	saveUserInfo(data, nameInput, jobInput, avatar) {
		nameInput.value = data.name;
		jobInput.value = data.about;
		avatar.src = data.avatar;
	}

	setUserInfo(data) {
		this._nameSelector.textContent = data.name;
		this._infoSelector.textContent = data.about;
		this._avatar.src = data.avatar;
	}
}