export default class Form extends HTMLElement{
    constructor(){
        super();
        const form = document.createElement('form');
        form.id = 'submitForm';
        form.innerHTML = this.formTemplate();
        this.appendChild(form);
    }
    connectedCallback() {
        this.addEventListener('submit', this.onSubmit);
        this.addEventListener('edit-character', this.onEdit);
    }
    get form() {
        return this.querySelector('#submitForm');
    }

    formTemplate(id = '', name = '', job = '') {
        return `
          <input
            type="text"
            name="id"
            id="id"
            value="${id}"
            style="display: none"
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value="${name}"
            />
            <label htmlFor="job">Job</label>
            <input
            type="text"
            name="job"
            id="job"
            value="${job}"
          />
          <input id="submit" type="submit" value="Submit" />
        `;
    }
}

customElements.define('crud-form', Form);
