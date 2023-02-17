// variables

const form = document.querySelector('#form');
const formSubmitButton = document.querySelector('#form-submit');
const clearDataButton = document.querySelector('#clear-data');
const getDataButton = document.querySelector('#get-data');
const container = document.querySelector('#container');
const inputSpanishWord = document.querySelector('#form-spanish-word');
const inputEnglishWord = document.querySelector('#form-english-word');
const spanishValidationMessage = document.querySelector('#spanish-validation-message');
const englishValidationMessage = document.querySelector('#english-validation-message');
let cardList = [];
let cardListResponseVariable = [];
let card = {};

// event listeners
function formSubmit() {
  form.addEventListener('submit', (event) => {
    preventReloadOnFormSubmit();
    formValidateInputs();
    if (inputSpanishWord.value !== '' && inputEnglishWord.value !== '') {
      createCardObject();
      pushCardIntoArray();
      setArrayInLocalStorage();
      clearFormInputValues();
    }
  }); 
}
function clearUserData() {
  clearDataButton.addEventListener('click', (event) => {
    clearDataCardList();
    clearDataLocalStorage();
    deleteHTMLFromData();
  });
}
function getUserData() {
  getDataButton.addEventListener('click', (event) => {
    deleteHTMLFromData();
    makeHTMLFromData();
  });
}
function clearSpanishValidationOnTyping() {
  inputSpanishWord.addEventListener('beforeinput', (event) => {
    clearSpanishValidationText();
  });
}
function clearEnglishValidationOnTyping() {
  inputEnglishWord.addEventListener('beforeinput', (event) => {
    clearEnglishValidationText();
  });
}

// function calls for event listeners
formSubmit();
clearUserData();
getUserData();
clearSpanishValidationOnTyping();
clearEnglishValidationOnTyping();

// functions
function formValidateInputs() {
  formValidateInputSpanish();
  formValidateInputEnglish();
}
function formValidateInputSpanish() {
  if (inputSpanishWord.value === '') {
    spanishValidationMessage.textContent = 'please enter spanish word';
    spanishValidationMessage.style.color = 'red';
  }
}
function formValidateInputEnglish() {
  if (inputEnglishWord.value === '') {
    englishValidationMessage.textContent = 'please enter english word';
    englishValidationMessage.style.color = 'red';
  }
}
function createCardObject() {
  card = {
    spanishWord: inputSpanishWord.value,
    englishWord: inputEnglishWord.value
  };
}
function setArrayInLocalStorage() {
  const cardListString = JSON.stringify(cardList);
  localStorage.setItem('data', cardListString);
}
function getArrayFromLocalStorage() {
  const cardListResponseString = localStorage.getItem('data');
  cardListResponseVariable = JSON.parse(cardListResponseString);
}
function makeHTMLFromData() {
  getArrayFromLocalStorage();
  if (cardListResponseVariable !== null) {
    cardListResponseVariable.forEach(function(item) {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'javascript');
      cardDiv.innerHTML = `
        <div class="spanish">${item.spanishWord}</div>
        <div class="english">${item.englishWord}</div>
      `;
      container.append(cardDiv);
    });
  } else {
    alert('no data! please input some words');
  }
}
function deleteHTMLFromData() {
  const divsToDelete = document.querySelectorAll('.javascript');
  divsToDelete.forEach(function(item){
    item.remove();
  });
}
function clearFormInputValues() {
  inputSpanishWord.value = '';
  inputEnglishWord.value = '';
}
function clearSpanishValidationText() {
  spanishValidationMessage.textContent = '';
}
function clearEnglishValidationText() {
 englishValidationMessage.textContent = '';
}
function preventReloadOnFormSubmit() {
  event.preventDefault();
}
function pushCardIntoArray() {
  cardList.push(card);
}
function clearDataLocalStorage() {
  localStorage.clear();
}
function clearDataCardList() {
  cardList = [];
}