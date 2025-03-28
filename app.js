// Configuración del editor de texto para los resúmenes
const editor = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Escribe tu resumen aquí...',
    modules: {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['link', 'image'],
        ],
    },
});

// Función para guardar resumen en formato PDF
document.getElementById('guardar-resumen').addEventListener('click', function () {
    const doc = new jsPDF();
    const contenido = editor.root.innerText; // Tomamos el texto en vez de HTML para evitar errores de formato

    doc.setFont('times', 'normal');
    doc.text(contenido, 10, 10, { maxWidth: 180 });

    doc.save('resumen.pdf');
});

// Función para subir apuntes y guardarlos en localStorage
document.getElementById('form-subir-apuntes').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const archivo = document.getElementById('archivo').files[0];
    const titulo = document.getElementById('titulo').value;

    if (!archivo || !titulo) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        let apuntesGuardados = JSON.parse(localStorage.getItem("apuntes")) || [];
        apuntesGuardados.push({ titulo: titulo, contenido: event.target.result, nombreArchivo: archivo.name });
        localStorage.setItem("apuntes", JSON.stringify(apuntesGuardados));

        alert('Apunte guardado con éxito.');
        mostrarApuntes();
    };

    reader.readAsDataURL(archivo);
});

// Mostrar apuntes guardados
function mostrarApuntes() {
    const listaApuntes = document.getElementById("lista-apuntes");
    listaApuntes.innerHTML = ""; // Limpiar lista antes de mostrar los archivos

    let apuntesGuardados = JSON.parse(localStorage.getItem("apuntes")) || [];
    apuntesGuardados.forEach((apunte, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${apunte.titulo} - 
            <a href="${apunte.contenido}" download="${apunte.nombreArchivo}">📥 Descargar</a> 
            <button onclick="eliminarApunte(${index})">❌ Eliminar</button>`;
        listaApuntes.appendChild(listItem);
    });
}

// Función para eliminar apuntes de localStorage
function eliminarApunte(index) {
    let apuntesGuardados = JSON.parse(localStorage.getItem("apuntes")) || [];
    apuntesGuardados.splice(index, 1);
    localStorage.setItem("apuntes", JSON.stringify(apuntesGuardados));
    mostrarApuntes();
}

// Cargar apuntes guardados al cargar la página
document.addEventListener("DOMContentLoaded", mostrarApuntes);
