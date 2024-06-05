import {
  initialCards,
  config,
  cardSelector,
  editProfileFormElement,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  newCardEditForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "eeca6a67-c0e1-4af7-ac48-d61d2e5d5520",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cards) => {
  console.log(cards);
  // loop through card data and create cards via the card class
});

api.getUserInfo().then((userData) => {
  console.log(userData);
  // use the UserInfo class to update the user data
});

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

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  profileEditPopup.close();
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
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

profileEditPopup.setEventListeners();

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

/**============================================
 *               Initialization
 *=============================================**/
cardSection.renderItems();
