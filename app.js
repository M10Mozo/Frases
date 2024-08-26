const fracesOriginales = [
    { frace: '"los programas"', autor: 'Harold 1' },
    { frace: '"los programas 1"', autor: 'Harold 2' },
    { frace: '"los programas 2"', autor: 'Harold 3' },
    { frace: '"los programas 3"', autor: 'Harold 4' },
    { frace: '"los programas 4"', autor: 'Harold 5' },
];

const { createApp, ref } = Vue;

const app = createApp({
    setup() {
        const fraces = ref(fracesOriginales);
        const nuevafrace = ref('');
        const nuevoautor = ref('');
        const mostrarModal = ref(false);
        const fraseEditada = ref({ frace: '', autor: '' });
        let indiceEdicion = null;

        const add = () => {
            if (nuevafrace.value && nuevoautor.value) {
                fraces.value.push({ frace: nuevafrace.value, autor: nuevoautor.value });
                nuevafrace.value = '';
                nuevoautor.value = '';
            }
        };

        const eliminar = (numeros) => {
            fraces.value.splice(numeros, 1);
        };

        const abrirModal = (numeros) => {
            mostrarModal.value = true;
            indiceEdicion = numeros;
            // Aquí se asignan los valores actuales a editar
            fraseEditada.value = { 
                frace: fraces.value[numeros].frace, 
                autor: fraces.value[numeros].autor 
            };
        };

        const cerrarModal = () => {
            mostrarModal.value = false;
            indiceEdicion = null;
        };

        const actualizarFrase = () => {
            if (fraseEditada.value.frace && fraseEditada.value.autor) {
                fraces.value.splice(indiceEdicion, 1, { frace: fraseEditada.value.frace, autor: fraseEditada.value.autor });
                cerrarModal();
            }
        };

        return {
            fraces,
            nuevafrace,
            nuevoautor,
            mostrarModal,
            fraseEditada,
            add,
            eliminar,
            abrirModal,
            cerrarModal,
            actualizarFrase,
        };
    }
});

app.mount('#myapp');
