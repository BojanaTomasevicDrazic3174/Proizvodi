<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");

if(isset($_POST['kategorija_proivoda_id']) && isset($_POST['ime']) && isset($_POST['cena'])&& isset($_POST['opis'])){


$KATEGORIJA_PROIZVODA_ID = $_POST['kategorija_proivoda_id'];
$IME = $_POST['ime'];
$CENA = $_POST['cena'];
$OPIS = $_POST['opis'];

 echo addProizvod($KATEGORIJA_PROIZVODA_ID , $IME, $CENA,$OPIS);
}
else {
	echo json_encode('Uneti podatci nisu korektni');
}
?>
