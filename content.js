let tmpl = document.createElement('template');
tmpl.innerHTML = `<style>:host { ... }</style> <!-- look ma, scoped styles -->
<b>I'm in shadow dom!</b>
<slot></slot>`;

export {tmpl};
