class ParImparLista extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ul { padding-left: 20px; }
                li { margin-bottom: 4px; }
            </style>
            <ul id="lista_numeros"></ul>
        `;

        window.addEventListener('rango-seleccionado', (e) => {
            const { valor_inicial, valor_final } = e.detail;
            this.mostrarListaNumeros(valor_inicial, valor_final);
        });
    }

    mostrarListaNumeros(valor_inicial, valor_final) {
        const ul = this.shadowRoot.querySelector('#lista_numeros');
        ul.innerHTML = '';

        for (let valor_numerico = valor_inicial; valor_numerico <= valor_final; valor_numerico++) {
            const li = document.createElement('li');
            li.textContent = `${valor_numerico} - ${valor_numerico % 2 === 0 ? 'Número par' : 'Número impar'}`;
            ul.appendChild(li);
        }
    }
}

customElements.define('par-impar-lista', ParImparLista);