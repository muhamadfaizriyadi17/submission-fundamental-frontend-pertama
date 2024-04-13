// Function untuk menampilkan custom loader
function showCustomLoader() {
  const loader = document.querySelector('custom-loader')
  const loaderElement = loader.querySelector('#loader')
  const contentElement = loader.querySelector('#myDiv')

  loaderElement.style.display = 'block'
  contentElement.style.display = 'none'
}

// Function untuk menyembunyikan custom loader
function hideCustomLoader() {
  const loader = document.querySelector('custom-loader')
  const loaderElement = loader.querySelector('#loader')

  loaderElement.style.display = 'none'
}

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
        `

    const noteForm = this.querySelector('#noteForm')
    noteForm.addEventListener('submit', this.addNote.bind(this))

    const noteList = this.querySelector('#noteList')
    noteList.addEventListener('click', this.handleNoteClick.bind(this))

    this.retrieveNotes()
  }

  async addNote(event) {
    event.preventDefault()

    showCustomLoader()

    const titleInput = this.querySelector('#title')
    const descriptionInput = this.querySelector('#description')
    const titleText = titleInput.value.trim()
    const descriptionText = descriptionInput.value.trim()
    if (titleText !== '' && descriptionText !== '') {
      try {
        const response = await fetch(
          'https://notes-api.dicoding.dev/v2/notes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: titleText,
              body: descriptionText,
            }),
          },
        )
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          this.renderNoteItem(data.data)

          titleInput.value = ''
          descriptionInput.value = ''
        } else {
          console.error('Failed to add note:', data.message)
        }
      } catch (error) {
        console.error('Error adding note:', error)
      } finally {
        hideCustomLoader()
      }
    } else {
      hideCustomLoader()
    }
  }

  async handleNoteClick(event) {
    const target = event.target
    if (target.classList.contains('delete-btn')) {
      const listItem = target.closest('.list-group-item')
      const noteId = listItem.dataset.id
      try {
        const response = await fetch(
          `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
          {
            method: 'DELETE',
          },
        )
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          listItem.remove()
        } else {
          console.error('Failed to delete note:', data.message)
        }
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  async retrieveNotes() {
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes')
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        data.data.forEach((note) => {
          this.renderNoteItem(note)
        })
      } else {
        console.error('Failed to retrieve notes:', data.message)
      }
    } catch (error) {
      console.error('Error retrieving notes:', error)
    }
  }

  renderNoteItem(note) {
    const noteList = this.querySelector('#noteList')
    const listItem = document.createElement('li')
    listItem.classList.add('list-group-item', 'mt-3')
    listItem.dataset.id = note.id
    listItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.body}</p>
                    <p class="card-text" style="font-size: small; color: #6c757d;">Created at: ${note.createdAt}</p>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-sm btn-danger delete-btn ml-2">Delete</button>
                    </div>
                </div>
            </div>`
    noteList.appendChild(listItem)
  }
}

customElements.define('note-app', NoteApp)
