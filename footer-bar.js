class FooterBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer mt-auto py-3 bg-light">
                <div class="container text-center">
                    <span class="text-muted"><footer>&copy; Copyright 2024 Muhamad Faiz Riyadi - 2024</footer>
                    .</span>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-bar', FooterBar);
