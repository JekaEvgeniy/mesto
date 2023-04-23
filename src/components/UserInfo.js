export default class UserInfo {
	constructor({nameSelector, statusSelector, avatarSelector}){
		this._name = document.querySelector(nameSelector);
		this._status = document.querySelector(statusSelector);
		this._avatar = document.querySelector(avatarSelector);
	}

	getUserInfo(){
		const data = {
			name: this._name.textContent,
			status: this._status.textContent,
			avatar: this._avatar.textContent,
		}

		return data;
	}

	setUserInfo({name, status, avatar}){
		// Делаем проверку, чтобы случайно не отправить undefined

		if (name){
			this._name.textContent = name;
		}

		if ( status ){
			this._status.textContent = status;
		}

		if ( avatar ) {
			this._avatar.src = avatar;
		}

	}
}