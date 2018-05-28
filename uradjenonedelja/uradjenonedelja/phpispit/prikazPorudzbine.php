<?php
header('Access-Control-Allow-Methods: GET');
include("functions.php");
if(isset($_GET['KORISNICI_ID'])){

//$id = intval($_GET['id']);
$KORISNICI_ID = intval($_GET['KORISNICI_ID']);

echo getPorudzbine($KORISNICI_ID);


?>
