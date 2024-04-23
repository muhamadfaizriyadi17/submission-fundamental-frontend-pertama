// import { notesData } from './note-data.js';

let notesData = [
    {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
    },
    {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
    },
    {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
    },
    {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
    },
    {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
    },
    {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
    },
    {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
    },
    {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
    },
    {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
    },
    {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
    },
    {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
    },
    {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
    },
    {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
    },
    {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
    },
    {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
    },
]

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

        const noteForm = this.querySelector('#noteForm');
        noteForm.addEventListener('submit', this.addNote.bind(this));

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
            const createdAt = new Date().toISOString();
            const newNote = {
                id: this.generateUniqueId(),
                title: titleText,
                body: descriptionText,
                createdAt,
                archived: false
            };
    
            // Tambahkan catatan baru di paling atas
            this.renderNoteItem(newNote, true); // Pass true as second argument to indicate insertion at top
    
            // Tambahkan catatan baru ke Local Storage
            notesData.unshift(newNote); // Tambahkan ke awal array
            this.saveNoteToLocalStorage();
    
            titleInput.value = '';
            descriptionInput.value = '';
        }
    }
    
    removeNoteFromLocalStorage(id) {
        notesData = notesData.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notesData));
    }          

    handleNoteClick(event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const listItem = target.closest('.list-group-item');
            listItem.remove();
    
            // Dapatkan ID catatan dari atribut data-id
            const noteId = listItem.dataset.id;
    
            // Remove note from Local Storage
            this.removeNoteFromLocalStorage(noteId);
        }
    }    

    saveNoteToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notesData));
    }

    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedNotes) {
            savedNotes.forEach(note => {
                this.renderNoteItem(note);
            });
        }
    }

    renderNoteItem(note, addToTop = false) {
        const noteList = this.querySelector('#noteList');
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'mt-3'); // Adding margin top
        listItem.dataset.id = note.id; // Set the data-id attribute
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
        if (addToTop) {
            noteList.prepend(listItem); // Tambahkan di paling atas
        } else {
            noteList.appendChild(listItem); // Tambahkan di paling bawah
        }
    }

    // generated random ID
    generateUniqueId() {
        return 'notes-' + Math.random().toString(36).substr(2, 9); 
    }
}

// Define custom element
customElements.define('note-app', NoteApp);
