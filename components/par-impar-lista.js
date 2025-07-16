// Derfinimos la clase personalizada llamada ParImparLista.
class ParImparLista extends HTMLElement {
    constructor() {
        super(); // Definimos el respectivo constructor de la clase principal.

        // Especificamos y enlazamos el shadow DOM en modo open para que realice la encapsulación.
        this.attachShadow({ mode: 'open' });
    }

    // Definimos el método que se va a ejecutar automáticamente cuando el componente se añade al DOM.
    connectedCallback() {
        // Definimos la estructura HTML y los correspondientes estilos para las listas.
        this.shadowRoot.innerHTML = `
            <style>
                ul { padding-left: 20px; }
                li { margin-bottom: 4px; }
            </style>
            <ul id="lista_numeros"></ul>
        `;

        // Hacemos la escucha del evento personalizado rango-seleccionado creado en input-range.js.
        window.addEventListener('rango-seleccionado', (e) => {
            // Extraemos el respectivo rango definido desde el evento personalizado.
            const { valor_inicial, valor_final } = e.detail;
            // Especificamos el método que se encarga de generar la lista de los valores.
            this.mostrarListaNumeros(valor_inicial, valor_final);
        });
    }

    // Creamos una función para generar y mostrar la lista de números pares/impares.
    mostrarListaNumeros(valor_inicial, valor_final) {
        // Establecemos el elemento lista ul.
        const ul = this.shadowRoot.querySelector('#lista_numeros');
        ul.innerHTML = ''; // Hacemos una limpieza de datos previamente mostrados.

        // Hacemos un buncle que va a recorrer desde el valor inicial hasta el valor final.
        for (let valor_numerico = valor_inicial; valor_numerico <= valor_final; valor_numerico++) {
            const li = document.createElement('li');
            // Hacemos la identificación si el número es par o si es número impar.
            li.textContent = `${valor_numerico} - ${valor_numerico % 2 === 0 ? 'Número par' : 'Número impar'}`;
            // Agrtegamos el respectivo valor a la lista li.
            ul.appendChild(li);
        }
    }
}

// Hacemos el registro del custom element como par-impar-lista.
customElements.define('par-impar-lista', ParImparLista);