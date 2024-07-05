import {
  config,
  cardSelector,
  editProfileFormElement,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  newCardEditForm,
  avatarForm,
  changeAvatarImageButton,
  removeCardForm,
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

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();

const removeCardValidator = new FormValidator(config, removeCardForm);
removeCardValidator.enableValidation();

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
  userInfo.setUserInfo(userData);
});

/**================================================================================================
 *                                         FUNCTION
 *================================================================================================**/

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeClick
  );
  return card.getView();
}
/**------------------------------------------------------------------------------------------------
 *                                         EVENT HANDLERS
 *------------------------------------------------------------------------------------------------**/

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    profileEditPopup.renderLoading(true);
    api
      .setUserInfo(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profileEditPopup.close();
      })
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });
  }
);

const addCardPopup = new PopupWithForm("#add-image-modal", (inputValues) => {
  addCardPopup.renderLoading(true);
  api
    .addCard(inputValues)
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

const deleteCardModal = new PopupWithForm("#remove-card-modal");
function handleCardDelete(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmitAction(() => {
    deleteCardModal.renderLoading(true);
    api
      .deleteCard(card.id)
      .then(() => {
        card.deleteCard();
        deleteCardModal.close();
      })
      .finally(() => {
        deleteCardModal.renderLoading(false);
      });
  });
}

const avatarModalPopup = new PopupWithForm("#avatar-modal", (formData) => {
  const avatarUrl = formData["avatar-form"];
  avatarModalPopup.renderLoading(true);
  api
    .setUserAvatar(avatarUrl)
    .then((userData) => {
      userInfo.setUserInfo({ avatar: userData.avatar });
      avatarModalPopup.close();
    })
    .finally(() => {
      avatarModalPopup.renderLoading(false);
    });
});

const imagePopup = new PopupWithImage("#preview-image-modal");

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function handleLikeClick(card) {
  api.setCardLikes(card.id, card.isLiked).then((newCardData) => {
    card.updateLikes(newCardData.isLiked);
  });
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

imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
avatarModalPopup.setEventListeners();
deleteCardModal.setEventListeners();

/**============================================
 *               Initialization
 *=============================================**/
