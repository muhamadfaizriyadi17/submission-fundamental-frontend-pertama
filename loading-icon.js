class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      // Create a shadow DOM
      this.attachShadow({ mode: 'open' });
  
      // Create a div element for the loading indicator
      const indicator = document.createElement('div');
      indicator.setAttribute('id', 'loading-indicator');
      this.shadowRoot.appendChild(indicator);
  
      // Style for the loading indicator
      const style = document.createElement('style');
      style.textContent = `
        #loading-indicator {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          z-index: 9999;
        }
        #loading-indicator .message {
          font-weight: bold;
          margin-bottom: 10px;
        }
      `;
      this.shadowRoot.appendChild(style);
    }
  
    show(message = 'Loading...') {
      // Create a message element
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.textContent = message;
  
      // Append the message element to the loading indicator
      this.shadowRoot.getElementById('loading-indicator').appendChild(messageElement);
      // Show the loading indicator
      this.style.display = 'block';
    }
  
    hide() {
      // Hide the loading indicator
      this.style.display = 'none';
      // Clear the content
      const loadingIndicator = this.shadowRoot.getElementById('loading-indicator');
      while (loadingIndicator.firstChild) {
        loadingIndicator.removeChild(loadingIndicator.firstChild);
      }
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);
  