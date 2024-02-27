export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    console.log("name", name);
    console.log("link", link);

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._likeButtonEl = this._cardElement.querySelector(".card__like-button");
    this._deleteButtonEl = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Image of ${this._name}`;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._likeButtonEl.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButtonEl.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl.addEventListener("click", () => {
      console.log("this._name", this._name);
      console.log("this._link", this._link);
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButtonEl.classList.toggle("card__like-button_active");
  }

  getView() {
    return this._cardElement;
  }
}
