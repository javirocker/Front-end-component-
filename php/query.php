<?php
// query.php

include 'connection.php';

// Ejemplo de una consulta SELECT
$sql = "SELECT * FROM suscriptores";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // Salida de datos de cada fila
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Nombre: " . $row["nombre"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 resultados";
}

// Cerrar la conexión
mysqli_close($conn);
?>
