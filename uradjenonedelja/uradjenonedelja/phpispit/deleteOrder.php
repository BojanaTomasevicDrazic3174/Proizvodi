

<?php
header('Access-Control-Allow-Methods: GET');
include("functions.php");

// echo json_encode('test')

 if(isset($_POST['ID']) && isset($_POST['PROIZVOD_ID'])){
	 $ID = intval($_POST['ID']);
	 $PROIZVOD_ID = intval($_POST['PROIZVOD_ID']);
	echo deletePorudzbina($ID, $PROIZVOD_ID);
 }


?>
