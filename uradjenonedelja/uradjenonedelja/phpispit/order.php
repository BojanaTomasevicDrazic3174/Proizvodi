<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");

if(isset($_POST['productId'])){

$PROIZVOD_ID = intval($_POST['productId']);
 echo addPorudzbina($PROIZVOD_ID);
}
else {
	echo json_encode("Losi podatci");
}
?>
