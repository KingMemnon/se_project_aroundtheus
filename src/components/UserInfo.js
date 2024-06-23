export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userNameElement = document.querySelector(userName);
    this._userAboutElement = document.querySelector(userAbout);
    this._avatarElement = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
