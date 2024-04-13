class CustomLoader extends HTMLElement {
  constructor() {
    super()
    const loader = document.createElement('div')
    loader.id = 'loader'
    loader.classList.add('loader-style')

    this.appendChild(loader)

    const content = document.createElement('div')
    content.id = 'myDiv'
    content.style.display = 'none'
    content.style.textAlign = 'center'

    this.appendChild(content)
  }

  connectedCallback() {
    this.myFunction()
  }

  myFunction() {
    const loader = this.querySelector('#loader')
    const content = this.querySelector('#myDiv')
    this.myVar = setTimeout(() => {
      loader.style.display = 'none'
      content.style.display = 'block'
    }, 3000)
  }
}

customElements.define('custom-loader', CustomLoader)
