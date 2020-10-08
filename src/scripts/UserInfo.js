export class UserInfo {

	constructor(nameSelector, infoSelector) {

		this._nameSelector = nameSelector;
		this._infoSelector = infoSelector;
	}

	getUserInfo() {
		const userInfo = {
			name: this._nameSelector.textContent,
			info: this._infoSelector.textContent
		}

		return userInfo;
	}

	setUserInfo(nameInput, jobInput) {
		this._nameSelector.textContent = nameInput.value;
		this._infoSelector.textContent = jobInput.value;
	}
}