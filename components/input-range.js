class InputRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                div { margin-bottom: 10px; }
                input, button { padding: 5px; margin: 4px; }
            </style>
            <div>
                <label>Número inicial: </label>
                <input type="number" id="numero_inicial" />
                <label>Número final: </label>
                <input type="number" id="numero_final" />
                <buuton id="enviar_numero">Mostrar resultado</button>
            </div>
        `;

        this.shadowRoot.querySelector('#enviar_numero').addEventListener('click', () => {
            const valor_inicial = parseInt(this.shadowRoot.querySelector('#numero_inicial').value);
            const valor_final = parseInt(this.shadowRoot.querySelector('#numero_final').value);

            if (isNaN(valor_inicial) || isNaN(valor_final)) {
                alert('Es obligatorio establecer ambos números.');
                return;
            }

            if (valor_inicial > valor_final) {
                alert('El numero final debe ser mayor o igual que el numero inicial.');
                return;
            }

            this.dispatchEvent(new CustomEvent('rango_numeros', {
                detail: { valor_inicial, valor_final },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('input-range', InputRange);