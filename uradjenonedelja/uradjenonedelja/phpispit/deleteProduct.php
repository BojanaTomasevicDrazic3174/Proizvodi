<?php
header('Access-Control-Allow-Methods: GET');
include("functions.php");

// echo json_encode('Tu smo');

 if(isset($_POST['ID'])){
	 
	 $id = intval($_POST['ID']);
	  echo deleteProizvod($id);

}


?>
