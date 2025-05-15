import { ChecklistStorage } from './checklistStorage.js';

export class ChecklistProxy {
  constructor() {
    this.storage = new ChecklistStorage();
  }

  getLists() {
    return this.storage.getLists();
  }

  addList(name) {
    if (!name.trim()) throw new Error("Nome inválido");
    console.log(`[LOG] Lista adicionada: ${name}`);
    this.storage.addList(name);
  }

  deleteList(index) {
    console.log(`[LOG] Lista removida: index ${index}`);
    this.storage.deleteList(index);
  }

  addItem(listIndex, item) {
    if (!item.text.trim()) throw new Error("Item inválido");
    console.log(`[LOG] Item adicionado: ${item.text}`);
    this.storage.addItem(listIndex, item);
  }

  editItem(listIndex, itemIndex, newText) {
    console.log(`[LOG] Item editado: ${newText}`);
    this.storage.editItem(listIndex, itemIndex, newText);
  }

  toggleItemDone(listIndex, itemIndex) {
    this.storage.toggleItemDone(listIndex, itemIndex);
  }

  deleteItem(listIndex, itemIndex) {
    this.storage.deleteItem(listIndex, itemIndex);
  }
}
