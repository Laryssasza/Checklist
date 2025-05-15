import { ChecklistProxy } from './checklistProxy.js';
import { ChecklistManager } from './checklistManager.js';

const manager = new ChecklistManager(new ChecklistProxy());

let currentListIndex = null;

function renderLists() {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";

  manager.getLists().forEach((list, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${list.name}</strong>
      <button onclick="openList(${index})">Abrir</button>
      <button onclick="deleteList(${index})">Excluir</button>
    `;
    container.appendChild(li);
  });
}

function addList() {
  const input = document.getElementById("newListName");
  try {
    manager.createList(input.value);
    input.value = "";
    renderLists();
  } catch (e) {
    alert(e.message);
  }
}

function deleteList(index) {
  if (confirm("Excluir esta lista?")) {
    manager.removeList(index);
    closeList();
    renderLists();
  }
}

function openList(index) {
  currentListIndex = index;
  const list = manager.getLists()[index];

  document.getElementById("listTitle").textContent = list.name;
  document.getElementById("listView").style.display = "block";
  document.getElementById("newItemText").value = "";

  renderItems();
}

function closeList() {
  document.getElementById("listView").style.display = "none";
  currentListIndex = null;
}

function renderItems() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = "";

  const items = manager.getLists()[currentListIndex].items;

  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleItem(${idx})">
      <span contenteditable="true"
            onblur="editItem(${idx}, this.textContent)"
            style="${item.done ? 'text-decoration: line-through; color: gray;' : ''}">
        ${item.text}
      </span>
      <button onclick="deleteItem(${idx})">Remover</button>
    `;
    ul.appendChild(li);
  });
}

function addItem() {
  const input = document.getElementById("newItemText");
  try {
    manager.addItem(currentListIndex, input.value);
    input.value = "";
    renderItems();
  } catch (e) {
    alert(e.message);
  }
}

function editItem(itemIndex, newText) {
  manager.editItem(currentListIndex, itemIndex, newText);
}

function toggleItem(itemIndex) {
  manager.toggleItem(currentListIndex, itemIndex);
  renderItems();
}

function deleteItem(itemIndex) {
  manager.removeItem(currentListIndex, itemIndex);
  renderItems();
}

window.addList = addList;
window.openList = openList;
window.deleteList = deleteList;
window.addItem = addItem;
window.editItem = editItem;
window.toggleItem = toggleItem;
window.deleteItem = deleteItem;
window.closeList = closeList;

renderLists();
