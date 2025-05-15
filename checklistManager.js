export class ChecklistManager {
  constructor(storage) {
    this.storage = storage;
  }

  getLists() {
    return this.storage.getLists();
  }

  createList(name) {
    this.storage.addList(name);
  }

  removeList(index) {
    this.storage.deleteList(index);
  }

  addItem(listIndex, text) {
    this.storage.addItem(listIndex, { text, done: false });
  }

  editItem(listIndex, itemIndex, newText) {
    this.storage.editItem(listIndex, itemIndex, newText);
  }

  toggleItem(listIndex, itemIndex) {
    this.storage.toggleItemDone(listIndex, itemIndex);
  }

  removeItem(listIndex, itemIndex) {
    this.storage.deleteItem(listIndex, itemIndex);
  }
}
