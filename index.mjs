import {tmpl} from './content.js';

// let tmpl = document.createElement('template');
// tmpl.innerHTML = `<style>:host { ... }</style> <!-- look ma, scoped styles -->
// <b>I'm in shadow dom!</b>
// <slot></slot>`;

export class AppDrawer extends HTMLElement {

    static get observedAttributes() {
        return ['disabled', 'open'];
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(val) {
        if(val) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
        this.toggleDrawer();
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        if(val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this.addEventListener('click', (ev) => {
            if(this.disabled) {
                return;
            }
            this.toggleDrawer();
        });        
    }

    connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";  
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if(this.disabled) {
            this.setAttribute('tabindex', '-1');
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.setAttribute('tabindex', '0');
            this.setAttribute('aria-disabled', 'false');
        }

    }

    toggleDrawer() {
    }

}

customElements.whenDefined('app-drawer').then(() => {
    console.log('app-drawer defined');
});

window.customElements.define('app-drawer', AppDrawer);

