export default class FormValidator{
constructor(config, formElelemt) {
  this._formElement = formElelemt;
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._errorClass = config.errorClass;
  this._inputElements = Array.from(formElement.querySelectorAll(this.inputSelector));
  this._submitButton = formElelemt.querySelector(this._submitButtonSelector);
}

//escape and overlay

_showInputError(inputElement){
  const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(this.errorClass);
}

_hideInputError(inputElement) {
  const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(this._errorClass);
}

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
  this._showInputError(inputElement);
  }else
  this._hideInputError(inputElement);
 }
}

_hasInvalidInput() {
  return this._inputElements.some((inputElement)=> !inputElement.validity.valid);
}
//disableButton
//enableButton
_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }else{
  this._submitButton.classList.remove(this._inactiveButtonClass);
  this._submitButton.disabled = false;
  }
}

//Event Listeners
_setEventListeners() {
 this.inputElements.forEach((inputElement)=>{
  inputElement.addEventListener("input", () =>{
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  });
 });

enableValidation() {
  this._setEventListeners();
}

disableValidation(){
  this._inputElements.ForEach((inputEl)=>{
    this._hideInputError(inputEl);
  });
 this._toggleButtonState();
 this._formElement.reset();
  }
}

const formElelemt = document.querySelector(config.formSelector);
const formValidator = new FormValidator(config,formElelemt);
FormValidator.enableValidation();
