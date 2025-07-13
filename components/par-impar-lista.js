class ParImparLista extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ul { padding-left: 20px; }
                li { margin-bottom: 4px; }
            </style>
            <ul id="lista_numeros"></ul>
        `;

        window.addEventListener('rango-numeros', (e) => {
            const { numero_inicial, numero_final } = e.detail;
            this.mostrarListaNumeros(numero_inicial, numero_final);
        });
    }

    mostrarListaNumeros(numero_inicial, numero_final) {
        const ul = this.shadowRoot.querySelector('#lista_numeros');
        ul.innerHTML = '';

        for (let valor_numerico = numero_inicial; valor_numerico <= numero_final; valor_numerico++) {
            const li = document.createElement('li');
            li.textContent = `${valor_numerico} - ${valor_numerico % 2 === 0 ? 'Número par' : 'Numero impar'}`;
            ul.appendChild(li);
        }
    }
}

customElements.define('par-impar-lista', ParImparLista);