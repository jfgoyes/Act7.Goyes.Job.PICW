// Definimos una clase presonalizada llamada InputRange.
class InputRange extends HTMLElement {
    constructor() {
        super(); // Establecemos el contructor de la clase HTMLElement.
        // Definimos un Shadow DOM para el componente.
        this.attachShadow({ mode: 'open' });
    }

    // Definimos un método que se va a ejecutar automáticamente cuando se realiza el DOM.
    connectedCallback() {
        // Establecemos el contenido HTML y estilos CSS dentro del shadow DOM.
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
                <button id="enviar_numero">Mostrar resultado</button>
            </div>
        `;

        // Establecemos un listener para identificar los clicks realizados por el usuario.
        this.shadowRoot.querySelector('#enviar_numero').addEventListener('click', () => {
            // Identificamos los inputs, es decir los valores para el rango de los números.
            const valor_inicial = parseInt(this.shadowRoot.querySelector('#numero_inicial').value);
            const valor_final = parseInt(this.shadowRoot.querySelector('#numero_final').value);

            // Especificamos cierta condición si el usuario establece valores que no son numéricos.
            if (isNaN(valor_inicial) || isNaN(valor_final)) {
                alert('Es obligatorio establecer ambos números.');
                return;
            }

            // Establecemos otra condición en caso de que el valor inicial sea mayor que el valor final.
            if (valor_inicial > valor_final) {
                alert('El numero final debe ser mayor o igual que el numero inicial.');
                return;
            }

            /* Definimos un evento personalizado denominado como rango-seleccionado, que va a 
            tener los valores establecidos para el rango como tal */
            this.dispatchEvent(new CustomEvent('rango-seleccionado', {
                detail: { valor_inicial, valor_final }, // Establecemos los datos que se van a enviar.
                bubbles: true, // Permitimos que el evento se vaya propagando por la estructura DOM.
                composed: true // Permitimos que se realize el cruce del Shadow DOM.
            }));
        });
    }
}

// Registramos el respectivo componente personalizado.
customElements.define('input-range', InputRange);