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
        ['link'],
        ['image'],
      ],
    },
  });
  
  // Función para guardar resumen en formato PDF
  document.getElementById('guardar-resumen').addEventListener('click', function () {
    const doc = new jsPDF();
    const contenido = editor.root.innerHTML;
    doc.html(contenido, {
      callback: function (doc) {
        doc.save('resumen.pdf');
      },
    });
  });
  
  // Formulario para subir apuntes
  document.getElementById('form-subir-apuntes').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aquí puedes agregar la lógica para subir archivos
    alert('Apunte subido con éxito');
  });
  