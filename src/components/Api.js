import {
  avatarModal,
  avatarUrlInput,
  handleFetchError,
} from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _catchError(err) {
    console.log(err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error fetching initals cards"));
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error adding card"));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error deleting card"));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error fetching user info"));
  }

  setUserInfo(formData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formData),
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error setting user info"));
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error setting user avatar"));
  }

  updateAvatar(avatarURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarURL }),
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error updating avatar"));
  }

  setCardLikes(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(handleFetchError("Error updating card likes"));
  }
}
