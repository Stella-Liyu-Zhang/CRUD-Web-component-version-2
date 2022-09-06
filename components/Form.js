
export default class Form extends HTMLElement {
  constructor() {
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

  onSubmit(event) {
    event.preventDefault();
    const id = this.querySelector('#id');
    const name = this.querySelector('#name');
    const comment = this.querySelector('#comment');
    const job = this.querySelector('#job');
    if (!name.value || !job.value || !comment.value) return;

    const submitEvent = new CustomEvent('form-submitted', {
      detail: {
        id: id.value,
        name: name.value,
        job: job.value,
        comment: comment.value
      }
      
    });

    this.dispatchEvent(submitEvent);

    id.value = '';
    name.value = '';
    job.value = '';
    comment.value = '';

  }

  onEdit(event) {
    this.form.innerHTML = this.formTemplate(
      event.detail.id,
      event.detail.name,
      event.detail.job,
      event.detail.comment
    );
  }

  formTemplate(id = '', name = '', job = '', comment = '') {
    return `
      <input
        type="text"
        name="id"
        id="id"
        value="${id}"
        style="display: none"
      />
      <label htmlFor="name">Movie Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value="${name}"
      />

      <label htmlFor="job">Director</label>
      <input
        type="text"
        name="job"
        id="job"
        value="${job}"
      />

      <label htmlFor="comment">Comments</label>
      <textarea
        type="text"
        name="comment"
        id="comment"
        value="${comment}">
      </textarea>
      <input id="submit" type="submit" value="Submit" />
    `;
  }
}

customElements.define('crud-form', Form);
