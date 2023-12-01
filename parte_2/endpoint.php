<?php

// Configuración de la conexión a la base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'prueba_tecnica';

// Conexión
$conexion = new mysqli($host, $user, $password, $database);

# Ejemplo de Consulta
$consulta = $conexion->query("
    SELECT a.dni, a.apellido, a.nombres, c.cod_curso, c.desccripcion AS curso, c.abreviatura
    FROM alumnos a
    JOIN inscripciones i ON a.dni = i.dni_Alu
    JOIN cursos c ON i.cod_curso = c.cod_curso;
");

###### Lectura y armado de Datos #######

$arrayEjemplo = array();

while ($row = $consulta->fetch_assoc()) {
    $dni = $row['dni'];
    $apellido = $row['apellido'];
    $nombres = $row['nombres'];
    $curso = $row['curso'];
    $abreviatura = $row['abreviatura'];

    $claveCurso = $abreviatura;
    if (!isset($arrayEjemplo[$claveCurso])) {
        $arrayEjemplo[$claveCurso] = array(
            'id_curso' => $row['cod_curso'],
            'nombre_curso' => $curso,
            'alumnos' => array()
        );
    }

    $arrayEjemplo[$claveCurso]['alumnos'][$dni] = array(
        'dni' => $dni,
        'nombre' => $nombres,
        'apellido' => $apellido
    );
}

# Ejemplo de mostrado de datos en formato Json para el endpoint

echo json_encode(array(
    "codigo" => 0,
    "mensajes" => array("Datos obtenidos con éxito"),
    "data" => $arrayEjemplo
));