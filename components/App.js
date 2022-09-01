export default class App extends HTMLElement {
    constructor() {
        super();

        this.character = [];

        //create style element, and grab the style() to fill inside. 
        const style = document.createElement('style');
        style.innerHTML = this.style;
        this.appendChild(style);
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
}

customElements.define('crud-app', App);
