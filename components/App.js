export default class App extends HTMLElement {
    constructor() {
      super();
      this.characters = [];
  
      /**
       * These methods are used as callbacks for event handlers on child elements,
       * the this would be the child element instead of the Custom Element.
       */
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
  
      const style = document.createElement('style');
      style.innerHTML = this.style;
      this.appendChild(style);
  
      const div = document.createElement('div');
      div.setAttribute('class', 'App');
      div.innerHTML = this.template;
      this.appendChild(div);
    }
  
    get template() {
      return `
        <crud-form></crud-form>
        <crud-table></crud-table>
      `;
    }
  
    get style() {
      return `
        .App {
          max-width: 800px;
          margin: 0 auto;
        }
      `;
    }
  
    get form() {
      return this.querySelector('crud-form');
    }
  
    get table() {
      return this.querySelector('crud-table');
    }

    readfromStorage(){
      Object.keys(localStorage).forEach(key => {
          this.characters.push(JSON.parse(localStorage.getItem(Key)));
      });
    }

    addCharacter(newCharacter) {
      let id = Math.floor(Math.random() * 100);

      localStorage.setItem(id,JSON.stringify(newCharacter));

      this.characters = [
        ...this.characters,
        {
          id: (this.characters.length + 1).toString(),
          name: newCharacter.name,
          job: newCharacter.job,
          comment: newCharacter.comment
        }
      ];
    }
  
    updateTable(characters = []) {
      const updateEvent = new CustomEvent('characters-updated', {
        detail: characters
      });
      localStorage.setItem(id,JSON.stringify(characters));

      this.table.dispatchEvent(updateEvent);
    }
  
    handleSubmit(event) {
      const character = event.detail;
      character.id
        ? this.updateCharacter(character)
        : this.addCharacter(character);
      this.updateTable(this.characters);
    }
  
    handleDelete(event) {
      this.removeCharacter(event.detail);
      this.updateTable(this.characters);
    }
  
    removeCharacter(id) {
      this.characters = this.characters.filter(character => character.id !== id);
    }
  
    handleEdit(event) {
      this.editCharacter(event.detail);
    }
  
    editCharacter(id) {
      const editCharacterEvent = new CustomEvent('edit-character', {
        detail: this.characters.find(char => char.id === id)
      });
      this.form.dispatchEvent(editCharacterEvent);
    }
  
    updateCharacter(updatedCharacter) {
      this.characters = this.characters.map(char =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      );
    }

    fetchInitialCharachters() {
      Object.keys(localStorage).forEach(key => {
        this.characters.push(JSON.parse(localStorage.getItem(key)));
    });
    }
  
    connectedCallback() {
      this.fetchInitialCharachters();
      this.form.addEventListener('form-submitted', this.handleSubmit);
      this.table.addEventListener('character-deleted', this.handleDelete);
      this.table.addEventListener('character-edited', this.handleEdit);
    }
  }
  
  customElements.define('crud-app', App);
  