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

const addNewCardTitle = document.querySelector("#card-title-js");
const addNewCardImage = document.querySelector("#card-image-js");
const newCardTitleInput = document.querySelector("#card-name-input");
const newCardImageInput = document.querySelector("#card-image-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const newCardEditForm =
  addNewCardImageModal.querySelector(".modal__image-card");

const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addNewCardImageModal.querySelector(".modal__input");
const cardUrlInput = addNewCardImageModal.querySelector(".modal__input");

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

function togglePopup(popup) {
  if (popup.classList.contains("modal_opened")) {
    document.removeEventListener("keydown", closeByEscape);
  } else {
    document.addEventListener("keydown", closeByEscape);
  }
  popup.classList.toggle("modal_opened");
}

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
/**----------------------
 * Function for Cards being generated
 *------------------------**/
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  /**======================
   **      event listener for card images
   *========================**/

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    openImageModal(cardData.link, cardData.name);
  });
  return cardElement;
}
/**======================
 **      function to open image modal
 *========================**/
function openImageModal(url, name) {
  imagePopupModalImage.src = url;
  imagePopupModalImage.alt = `Photo of ${name}`;
  imageText.textContent = name;
  togglePopup(imagePopupModal);
}
/**------------------------------------------------------------------------------------------------
 *                                         EVENT HANDLERS
 *------------------------------------------------------------------------------------------------**/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  togglePopup(profileEditModal);
}

function handleNewCardEditFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  newCardEditForm.reset();
  togglePopup(addNewCardImageModal);
}
/**================================================================================================
 *                                         EVENT LISTENERS
 *================================================================================================**/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  togglePopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  togglePopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileAddButton.addEventListener("click", () => {
  togglePopup(addNewCardImageModal);
});

newCardEditForm.addEventListener("submit", handleNewCardEditFormSubmit);
addNewCardModalClose.addEventListener("click", () => {
  togglePopup(addNewCardImageModal);
});

imagePopupModalCloseBttn.addEventListener("click", () => {
  togglePopup(imagePopupModal);
});
const modals = [profileEditModal, addNewCardImageModal, imagePopupModal];

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    togglePopup(openModal);
  }
}

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

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
