import Card from "../components/Card.js";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
function handleNewCardEditFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);
  cardSection.addItem(cardElement);
  newCardEditForm.reset();
  togglePopup(addNewCardImageModal);
}
newCardEditForm.addEventListener("submit", handleNewCardEditFormSubmit);
const cardSection = new Section(
  {
    items: intitialCards,
    renderer: (cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();
