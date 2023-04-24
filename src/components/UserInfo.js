export default class UserInfo {
	constructor({nameSelector, aboutSelector, avatarSelector}){
		this._name = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
		this._avatar = document.querySelector(avatarSelector);
	}

	getUserInfo(){
		const data = {
			name: this._name.textContent,
			about: this._about.textContent,
			avatar: this._avatar.textContent,
		}

		return data;
	}

	setUserInfo({name, about, avatar}){
		// Делаем проверку, чтобы случайно не отправить undefined
		console.log(name);
		console.log(about);
		console.log(avatar);
		if (name){
			this._name.textContent = name;
		}

		if ( about ){
			this._about.textContent = about;
		}

		if ( avatar ) {
			this._avatar.src = avatar;
		}

	}
}