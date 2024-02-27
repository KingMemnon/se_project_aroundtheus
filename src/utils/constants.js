export const initialCards = [
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

export const config = {
  formSelector: "modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const cardSelector = "#card-template";
export const editProfileFormElement = document.querySelector(
  "#edit-profile-modal"
);
/**================================================================================================
 *                                         ELEMENT
 *================================================================================================**/
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");

export const profileTitle = document.querySelector("#profile-title-js");
export const profileDescription = document.querySelector(
  "#profile-description-js"
);
export const profileTitleInput = document.querySelector("#profile-name");
export const profileDescriptionInput = document.querySelector(
  "#profile-description"
);
/*================================ Add New Card ==============================*/
export const profileAddButton = document.querySelector("#profile-add-button");
export const addNewCardImageModal = document.querySelector("#add-image-modal");

export const newCardEditForm =
  addNewCardImageModal.querySelector(".modal__image-card");

export const cardListEl = document.querySelector(".cards__list");

/**========================================================================
 *                           Image Popup
 *========================================================================**/
export const imagePopupModal = document.querySelector("#preview-image-modal");
