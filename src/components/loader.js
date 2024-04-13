class CustomLoader extends HTMLElement {
  constructor() {
    super()
    // Buat elemen loader
    const loader = document.createElement('div')
    loader.id = 'loader'
    // Tambahkan class untuk gaya dari file CSS
    loader.classList.add('loader-style')

    // Tambahkan elemen loader ke dalam elemen custom loader
    this.appendChild(loader)

    // Buat elemen konten
    const content = document.createElement('div')
    content.id = 'myDiv'
    content.style.display = 'none'
    content.style.textAlign = 'center'

    // Tambahkan elemen konten ke dalam elemen custom loader
    this.appendChild(content)
  }

  connectedCallback() {
    // Jalankan fungsi myFunction saat elemen custom loader terhubung ke dokumen
    this.myFunction()
  }

  myFunction() {
    // Menyimpan referensi ke elemen loader dan konten
    const loader = this.querySelector('#loader')
    const content = this.querySelector('#myDiv')
    // Set waktu tunda sebelum menampilkan konten
    this.myVar = setTimeout(() => {
      loader.style.display = 'none'
      content.style.display = 'block'
    }, 3000)
  }
}

// Daftarkan elemen custom loader ke dalam dokumen
customElements.define('custom-loader', CustomLoader)
