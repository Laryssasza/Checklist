export class ChecklistStorage {
  constructor() {
    this.data = [];
  }

  getLists() {
    return this.data;
  }

  addList(name) {
    this.data.push({ name, items: [] });
  }

  deleteList(index) {
    this.data.splice(index, 1);
  }

  addItem(listIndex, item) {
    this.data[listIndex].items.push(item);
  }

  editItem(listIndex, itemIndex, newText) {
    this.data[listIndex].items[itemIndex].text = newText;
  }

  toggleItemDone(listIndex, itemIndex) {
    const item = this.data[listIndex].items[itemIndex];
    item.done = !item.done;
  }

  deleteItem(listIndex, itemIndex) {
    this.data[listIndex].items.splice(itemIndex, 1);
  }
}
