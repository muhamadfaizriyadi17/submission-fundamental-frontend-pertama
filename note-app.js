// note-app.js
import { notesData } from './note-data.js';

class NoteApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <div class="row justify-content-center mt-4">
                    <div class="col-md-6">
                        <h1 class="text-center">Notes App Javascript</h1>
                        <form id="noteForm">
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" id="title" required>
                            </div>
                            <div class="form-group mt-1">
                                <label for="description">Description:</label>
                                <textarea class="form-control" id="description" rows="3" required></textarea>
                            </div>
                            <div class="d-grid mt-3">
                                <button type="submit" class="btn btn-primary btn-block">Add Note</button>
                            </div>
                        </form>
                        <ul id="noteList" class="list-group mt-3"></ul>
                    </div>
                </div>
            </div>
        `;

        // Logic to handle form submission
        const noteForm = this.querySelector('#noteForm');
        noteForm.addEventListener('submit', this.addNote.bind(this));

        // Logic to handle delete note
        const noteList = this.querySelector('#noteList');
        noteList.addEventListener('click', this.handleNoteClick.bind(this));

        // Load notes from Local Storage when the app initializes
        this.loadNotes();
    }

    addNote(event) {
        event.preventDefault();
        const titleInput = this.querySelector('#title');
        const descriptionInput = this.querySelector('#description');
        const titleText = titleInput.value.trim();
        const descriptionText = descriptionInput.value.trim();
        if (titleText !== '' && descriptionText !== '') {
            const id = this.generateUniqueId();
            const noteList = this.querySelector('#noteList');
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'mt-3'); // Adding margin top
            const createdAt = new Date().toISOString(); 
            const newNote = {
                id,
                title: titleText,
                body: descriptionText,
                createdAt,
                archived: false // Default value for archived
            };

            notesData.push(newNote);

            listItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${titleText}</h5>
                        <p class="card-text">${descriptionText}</p>
                        <p class="card-text" style="font-size: small; color: #6c757d;">Created at: ${createdAt}</p> <!-- Tampilkan tanggal dibuat -->
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-danger delete-btn ml-2">Delete</button>
                        </div>
                    </div>
                </div>`;
            noteList.prepend(listItem); // Tampilkan di bagian paling atas
            titleInput.value = '';
            descriptionInput.value = '';

            // Tambahkan catatan baru ke dalam array notesData di note-data.js
            notesData.push({ title: titleText, body: descriptionText, createdAt, archived: false });
            console.log(notesData); // Periksa apakah data berhasil ditambahkan

            // Simpan catatan ke Local Storage
            this.saveNoteToLocalStorage();
        }
    }        

    handleNoteClick(event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const listItem = target.closest('.list-group-item');
            listItem.remove();

            // Remove note from Local Storage
            this.removeNoteFromLocalStorage(listItem.querySelector('.card-title').textContent);
        }
    }

    saveNoteToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notesData));
    }

    removeNoteFromLocalStorage(title) {
        notesData = notesData.filter(note => note.title !== title);
        localStorage.setItem('notes', JSON.stringify(notesData));
    }

    loadNotes() {
        const noteList = this.querySelector('#noteList');
        notesData.forEach(note => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'mt-3'); // Adding margin top
            listItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <p class="card-text">${note.body}</p>
                        <p class="card-text" style="font-size: small; color: #808080;">Created at: ${note.createdAt}</p> <!-- Perubahan ukuran dan warna font -->
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-danger delete-btn ml-2">Delete</button>
                        </div>
                    </div>
                </div>`;
            noteList.appendChild(listItem);
        });
    }    loadNotes() {
        // Render existing notes from notesData array
        notesData.forEach(note => {
            this.renderNoteItem(note);
        });
    }

    renderNoteItem(note) {
        const noteList = this.querySelector('#noteList');
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'mt-3'); // Adding margin top
        listItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.body}</p>
                    <p class="card-text" style="font-size: small; color: #6c757d;">Created at: ${note.createdAt}</p> <!-- Perubahan ukuran dan warna font -->
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-sm btn-danger delete-btn ml-2">Delete</button>
                    </div>
                </div>
            </div>`;
        noteList.appendChild(listItem);
    }

    generateUniqueId() {
        return 'notes-' + Math.random().toString(36).substr(2, 9); // Generate a random ID
    }

}

// Define custom element
customElements.define('note-app', NoteApp);


