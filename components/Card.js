export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card_like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card_delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      //".card_delete-button"
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");

    // const cardEl = this.querySelector('.card__like-button');

    // cardEl.classList.toggle('card__like-button_active');
  }

  _handleImageClick() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    // declare new variable for the image
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardTitleEl.textContent = this._name;
    // set the image src using this._link
    this._cardImageEl.src = this._link;

    //set event listeners
    this._setEventListeners();
    return this._cardElement;
    //return the card
  }
}
