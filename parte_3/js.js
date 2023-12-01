document.addEventListener("DOMContentLoaded", function() {
    crearTabla();
  });
  
  function crearTabla() {
    fetch('http://localhost/parte_3/endpoint.php')
      .then(response => response.json())
      .then(data => {
        const tablaCursos = document.getElementById('tabla-cursos');
  
        const cursosArray = Object.values(data.data);
  
        for (const curso of cursosArray) {
          const tituloCurso = document.createElement('h2');
          tituloCurso.textContent = curso.nombre_curso;
          tablaCursos.appendChild(tituloCurso);
  
          const encabezado = document.createElement('tr');
  
          const encabezadoDni = document.createElement('th');
          encabezadoDni.textContent = 'DNI';
          encabezado.appendChild(encabezadoDni);
  
          const encabezadoApellido = document.createElement('th');
          encabezadoApellido.textContent = 'Apellido';
          encabezado.appendChild(encabezadoApellido);
  
          const encabezadoNombres = document.createElement('th');
          encabezadoNombres.textContent = 'Nombres';
          encabezado.appendChild(encabezadoNombres);
  
          tablaCursos.appendChild(encabezado);
  
          const alumnosArray = Object.values(curso.alumnos);
  
          for (const alumno of alumnosArray) {
            const fila = document.createElement('tr');
  
            const celdaDni = document.createElement('td');
            celdaDni.textContent = alumno.dni;
            fila.appendChild(celdaDni);
  
            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = alumno.apellido;
            fila.appendChild(celdaApellido);
  
            const celdaNombres = document.createElement('td');
            celdaNombres.textContent = alumno.nombre;
            fila.appendChild(celdaNombres);
  
            tablaCursos.appendChild(fila);
          }
        }
      })
      .catch(error => console.error(error));
  }