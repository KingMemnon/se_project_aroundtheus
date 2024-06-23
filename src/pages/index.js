import {
  config,
  cardSelector,
  editProfileFormElement,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  newCardEditForm,
  avatarModal,
  avatarForm,
  avatarUrlInput,
  changeAvatarImageButton,
  cardListEl,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// 1. Add new modal for avatar edit-checkmark**
// 2. Create FormValidator instance for that form**
// 3. Create PopupWithForm instance for the avatar edit modal**
// 4.  Create new method in Api.js called updateAvatar and call it in the submit handler
// 5.  After you call the Api, update the avatar image UI

const editProfileValidator = new FormValidator(config, editProfileFormElement);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(config, newCardEditForm);
addCardValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "eeca6a67-c0e1-4af7-ac48-d61d2e5d5520",
    "Content-Type": "application/json",
  },
});

let cardSection;

api.getInitialCards().then((cards) => {
  cardSection = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        cardSection.addItem(cardElement);
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});
const userInfo = new UserInfo({
  userName: "#profile-title-js",
  userAbout: "#profile-description-js",
  userAvatar: ".profile__image",
});
api.getUserInfo().then((userData) => {
  console.log(userData);
  userInfo.setUserInfo(userData);
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

// function handleProfileFormSubmit(formData) {
//   userInfo.setUserInfo({ name: formData.title, job: formData.description });
//   profileEditPopup.close();
// }

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    api.setUserInfo(formData).then((userData) => {
      userInfo.setUserInfo(userData); // { name: '', about: ''}
      profileEditPopup.close();
    });
  }
);
// const profileEditPopup = new PopupWithForm(
//   "#profile-edit-modal",
//  handleProfileFormSubmit
// );

const addCardPopup = new PopupWithForm("#add-image-modal", (inputValues) => {
  api.addCard(inputValues).then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardSection.addItem(cardElement);
    addCardPopup.close();
  });
});

const avatarModalPopup = new PopupWithForm("#avatar-modal", (formData) => {
  api.setUserAvatar(formData.avatar).then((userData) => {
    userInfo.setUserInfo({ avatar: userData.avatar });
    avatarModalPopup.close();
  });
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
  profileDescriptionInput.value = currentUserInfo.about;
  profileEditPopup.open();
});

addCardPopup.setEventListeners();
profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

changeAvatarImageButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarModalPopup.open();
});

// avatarUrlInput.addEventListener("input", () => {
//   avatarFormValidator.checkInputValidity(avatarUrlInput);
//   avatarFormValidator.toggleButtonState();
// });

imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
avatarModalPopup.setEventListeners();

/**============================================
 *               Initialization
 *=============================================**/
