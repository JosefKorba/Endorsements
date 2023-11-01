import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://wearethechampions-26e11-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const messageListInDB = ref(database, "messageList");

const inputFieldEl = document.querySelector("#input-field");
const buttonEl = document.querySelector("#btn");
const messageListEl = document.querySelector("#message-list");

function addMessageToContainer(message) {
  const newMessage = document.createElement("li");
  newMessage.textContent = message;
  messageListEl.appendChild(newMessage);
}

buttonEl.addEventListener("click", () => {
  const message = inputFieldEl.value;
  addMessageToContainer(message);
  push(messageListInDB, message);
  clearInputFieldEl();
});

onValue(messageListInDB, (snapshot) => {
  if (snapshot.exists()) {
    const itemsArray = Object.entries(snapshot.val());
    clearMessageListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      const currentItemValue = itemsArray[i][1];
      addMessageToContainer(currentItemValue);
    }
  } else {
    messageListEl.innerHTML = "";
  }
});

function clearMessageListEl() {
  messageListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}
