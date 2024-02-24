import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import UserInfo from "../components/userInfo.js";
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
/**------------------------------------------------------------------------------------------------
 *                                         EVENT HANDLERS
 *------------------------------------------------------------------------------------------------**/

function handleFormSubmit(formData) {
  profileTitle.textContent = formData.title;
  profileDescription.textContent = formData.description;
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleFormSubmit
);

const userInfo = new UserInfo({
  userName: "#profile-title-js",
  userJob: "#profile-description-js",
  handleFormSubmit,
});

const addCardPopup = new PopupWithForm("#add-image-modal", (inputValues) => {
  const cardElement = getCardElement(inputValues);
  cardListEl.prepend(cardElement);
});

const imagePopup = new PopupWithImage("#preview-image-modal");

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

/**================================================================================================
 *                                         EVENT LISTENERS
 *================================================================================================**/

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;

  profileEditPopup.open();
});

profileEditPopup.setEventListeners();

document
  .querySelector("#profile-edit-button")
  .addEventListener("click", () => profileEditPopup.open());

addCardPopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

imagePopup.setEventListeners();

addCardValidator.resetValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardSelector, handleImageClick);
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const modals = [profileEditModal, addNewCardImageModal, imagePopupModal];

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
