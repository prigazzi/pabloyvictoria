<?php
	$conn = mysql_connect('DB_HOST', 'DB_USER', 'DB_PASSWORD') or die('Ups. Hay un problema con la base de datos.');
	mysql_select_db('casamiento', $conn);

	$name    = mysql_real_escape_string($_POST['name']);
	$phone   = mysql_real_escape_string($_POST['phone']);
	$email   = mysql_real_escape_string($_POST['email']);
	$comment = mysql_real_escape_string($_POST['comment']);
	$assist  = mysql_real_escape_string($_POST['assist']);

	$query = "INSERT INTO rsvp (nombre, telefono, email, comentario, asistire)
	VALUES ('$name', '$phone', '$email', '$comment', '$assist')";
	$rs = mysql_query($query);

	if($rs) {
		if($assist == 'no') {
			echo "Muchas gracias! Es una pena que no podamos contar con tu presencia en el casamiento.";
		} else {
			echo "Muchas gracias por confirmar tu asistencia al casamiento! Estamos muy contentos que puedas compartir este momento con nosotros.";
		}
	} else {
		echo "Al parecer hubo un problema con la base de datos. Por favor, envianos un email a pablo.rigazzi@gmail.com para que lo corrija de inmediato.";
	}
