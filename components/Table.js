export default class Table extends HTMLElement {
    constructor() {
        super();
        const table = document.createElement('table');
        table.id = 'table';
        this.appendChild(table);
    
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
      }
}