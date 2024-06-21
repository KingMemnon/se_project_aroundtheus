export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._userNameElement = document.querySelector(userName);
    this._userAboutElement = document.querySelector(userAbout);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
  }
}
