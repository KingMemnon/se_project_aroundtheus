import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".card-image-js");
    this.imageText = this._popupElement.querySelector(".card-title-js");
  }

  open(imageData) {
    this._image.src = imageData.link;
    this._image.alt = `Photo of ${imageData.name}`;
    this._imageText.textContent = imageData.name;

    super.open;
  }
}
