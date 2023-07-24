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
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

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
const cardTitleInput = addNewCardImageModal.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addNewCardImageModal.querySelector(
  ".modal__input_type_url"
);

/**========================================================================
 *                           Image Popup
 *========================================================================**/
document.querySelector("#card-template").content.firstElementChild;
const imagePopupModal = document.querySelector("#preview-image-modal");
const imagePopupModalCloseBttn = document.querySelector(
  "#image-modal-popup-close"
);
const imagePopupModalImage = document.querySelector("#preview-image-modal-img");
const imageText = document.querySelector("#image-caption");

/**================================================================================================
 *                                         FUNCTION
 *================================================================================================**/

function closePopop() {
  profileEditModal.classList.remove("modal_opened");
  addNewCardImageModal.classList.remove("modal_opened");
  imagePopupModal.classList.remove("modal_opened");
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
  const dislikeButton = cardElement.querySelector(".card__delete-button");

  /**======================
   **      event listener for card images
   *========================**/

  /**----------------------
   **      close button
   *------------------------**/

  //openModal with previewImageModal

  //read thread on stacKOverflow, hint will need to use visibility hidden, and not display none

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  dislikeButton.addEventListener("click", () => {
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
  imageText.textContent = name;
  imagePopupModal.classList.add("modal_opened");
}

function addEventListenersToCardImages() {
  const cardImages = document.querySelectorAll(".card__image");
  cardImages.forEach((cardImage) => {
    cardImage.addEventListener("click", handleCardImageClick);
  });
}
/**------------------------------------------------------------------------------------------------
 *                                         EVENT HANDLERS
 *------------------------------------------------------------------------------------------------**/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopop();
}

function handleNewCardEditFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  closePopop();
  newCardEditForm.reset();
}
function handleCardImageClick(e) {
  if (e.target.classList.contains("card__image")) {
    const imageUrl = e.target.getAttribute("src");
    openImageModal(imageUrl);
  }
}
/**================================================================================================
 *                                         EVENT LISTENERS
 *================================================================================================**/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", closePopop);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileAddButton.addEventListener("click", () => {
  addNewCardImageModal.classList.add("modal_opened");
});

newCardEditForm.addEventListener("submit", handleNewCardEditFormSubmit);
addNewCardModalClose.addEventListener("click", closePopop);

imagePopupModalCloseBttn.addEventListener("click", closePopop);

/**============================================
 *               Initialization
 *=============================================**/

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
