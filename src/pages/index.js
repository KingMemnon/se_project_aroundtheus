import {
  initialCards,
  config,
  cardSelector,
  editProfileFormElement,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  newCardEditForm
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const editProfileValidator = new FormValidator(config, editProfileFormElement);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(config, newCardEditForm);
addCardValidator.enableValidation();

/**================================================================================================
 *                                         FUNCTION
 *================================================================================================**/

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
  profileEditPopup.close()
);

const userInfo = new UserInfo({
  userName: "#profile-title-js",
  userJob: "#profile-description-js",
});

const addCardPopup = new PopupWithForm("#add-image-modal", (inputValues) => {
  const cardElement = getCardElement(inputValues);
  cardSection.addItem(cardElement);
  addCardPopup.close();
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

addCardPopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

imagePopup.setEventListeners();

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

/**============================================
 *               Initialization
 *=============================================**/
cardSection.renderItems();
