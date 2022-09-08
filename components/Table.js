export default class Table extends HTMLElement {
  constructor() {
    super();
    const table = document.createElement('table');
    table.id = 'table';
    this.appendChild(table);

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);

  }

  get table() {
    return this.querySelector('#table');
  }

  handleUpdateEvent(event) {
    this.updateTable(event.detail);
    this.addButtonListeners();
  }

  addButtonListeners() {
    const deleteBtn = this.table.querySelectorAll('.delete-btn');
    const editBtn = this.table.querySelectorAll('.edit-btn');

    deleteBtn.forEach(btn => btn.addEventListener('click', this.onDelete));
    editBtn.forEach(btn => btn.addEventListener('click', this.onEdit));
  }

  onDelete(e) {
    this.deleteConfirmation(e);
    const id = e.target.getAttribute('data-id');
    const deleteEvent = new CustomEvent('character-deleted', {
      detail: id
    });
    localStorage.removeItem(e.key);
    this.dispatchEvent(deleteEvent);
  }

  deleteConfirmation(e) {
    return confirm('Are you sure you want to Delete?');
  }


  onEdit(e) {
    const id = e.target.getAttribute('data-id');
    const editEvent = new CustomEvent('character-edited', {
      detail: id
    });
    this.dispatchEvent(editEvent);
  }

  updateTable(characters = []) {
    this.table.innerHTML = `
      <thead>
        <tr>
          <th>Movie Name</th>
          <th>Director</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${characters
        .map((character, index) => {
          return `
            <tr>
              <td>${character.name}</td>
              <td>${character.movie}</td>
              <td>${character.comment}</td>
              <td>
                <button data-id="${character.id}" class="delete-btn" >Delete</button>
                <button data-id="${character.id}" class="edit-btn" >Edit</button>
              </td>
          </tr>
          `;
        })
        .join('')}
      </tbody>
    `;
  }
  
  // fetchinitialData(){
  //   var i ;
  //   for (i = 0; i < localStorage.length; i++)   {
  //     this.updateTable(localStorage.key(i));
   

  //     this.updateTable(localStorage.getItem(localStorage.key(i)));
  //     console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
  //   }
  // }

  connectedCallback() {  
    
  //  this.fetchinitialData();
    this.addEventListener('characters-updated', this.handleUpdateEvent);
  }
}
