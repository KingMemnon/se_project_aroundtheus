import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";

const config = {
  formSelector: "modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardSelector = "#card-template";
const editProfileFormElement = document.querySelector("#edit-profile-modal");
const editProfileValidator = new FormValidator(config, editProfileFormElement);
editProfileValidator.enableValidation();

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
/**================================================================================================
 *                                         ELEMENT
 *================================================================================================**/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-modal-closed"
);
const profileTitle = document.querySelector("#profile-title-js");
const profileDescription = document.querySelector("#profile-description-js");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");

/*================================ Add New Card ==============================*/

const profileAddButton = document.querySelector("#profile-add-button");
const addNewCardImageModal = document.querySelector("#add-image-modal");
const addNewCardModalClose = document.querySelector("#add-image-modal-close");
const newCardEditForm =
  addNewCardImageModal.querySelector(".modal__image-card");
const addCardValidator = new FormValidator(config, newCardEditForm);
addCardValidator.enableValidation();

const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addNewCardImageModal.querySelector("#card-name-input");
const cardUrlInput = addNewCardImageModal.querySelector("#card-image-input");

/**========================================================================
 *                           Image Popup
 *========================================================================**/

const imagePopupModal = document.querySelector("#preview-image-modal");
const imagePopupModalCloseBttn = document.querySelector(
  "#image-modal-popup-close"
);
const imagePopupModalImage = document.querySelector("#preview-image-modal-img");
const imageText = document.querySelector("#image-caption");

/**================================================================================================
 *                                         FUNCTION
 *================================================================================================**/

/**----------------------
 * Function for Cards being generated
 *------------------------**/
function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}
//   /**======================
//    **      event listener for card images
//    *========================**/
/**======================
 **      function to open image modal
 *========================**/
// function handleImageClick(name, url) {
//   imagePopupModalImage.src = url;
//   imagePopupModalImage.alt = `Photo of ${name}`;
//   imageText.textContent = name;
//   togglePopup(imagePopupModal);
// }
/**------------------------------------------------------------------------------------------------
 *                                         EVENT HANDLERS
 *------------------------------------------------------------------------------------------------**/

// update user profile info with inputValues from PopupWithForm

function handleFormSubmit(formData) {
  profileTitle.textContent = formData.title;
  profileDescription.textContent = formData.description;
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleFormSubmit
);

const imagePopup = new PopupWithImage("#add-image-modal", (inputVales) => {
  const cardElement = createCard(inputVales);
  cardListEl.prepend(cardElement);
});
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}
// function handleFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   const cardData = { name, link };
//   const cardElement = getCardElement(cardData);
//   cardSection.addItem(cardElement);
//   newCardEditForm.reset();
//   togglePopup(addNewCardImageModal);
// }

/**================================================================================================
 *                                         EVENT LISTENERS
 *================================================================================================**/

profileEditPopup.setEventListeners();

document
  .querySelector("#profile-edit-button")
  .addEventListener("click", () => profileEditPopup.open());

imagePopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  imagePopup.open();
});
addCardValidator.resetValidation();
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

imagePopupModalCloseBttn.addEventListener("click", () => {
  togglePopup(imagePopupModal);
});
const modals = [profileEditModal, addNewCardImageModal, imagePopupModal];

// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     togglePopup(openModal);
//   }
// }

function handleCloseByClick(evt) {
  if (evt.target.classList.contains("modal")) {
    togglePopup(evt.target);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("click", handleCloseByClick);
});

/**============================================
 *               Initialization
 *=============================================**/
cardSection.renderItems();
