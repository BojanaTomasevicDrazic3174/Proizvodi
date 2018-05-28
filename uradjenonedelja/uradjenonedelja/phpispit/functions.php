<?php
include("config.php");

function checkIfLoggedIn(){
	global $conn;
	if(isset($_SERVER['HTTP_TOKEN'])){
		$token = $_SERVER['HTTP_TOKEN'];
		$result = $conn->prepare("SELECT * FROM korisnici WHERE TOKEN=?");
		$result->bind_param("s",$token);
		$result->execute();
		$result->store_result();
		$num_rows = $result->num_rows;
		if($num_rows > 0)
		{
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

function login($username, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($username,$password)){
		$id = sha1(uniqid());
		$result2 = $conn->prepare("UPDATE korisnici SET TOKEN=? WHERE USERNAME=?");
		$result2->bind_param("ss",$id,$username);
		$result2->execute();
		$rarray['token'] = $id;
		$rarray['username']= $username;
	} else{
		header('HTTP/1.1 401 Unauthorized');
		$rarray['error'] = "Invalid username/password";
	}
	return json_encode($rarray);
}

function checkLogin($username, $password){
	global $conn;
	$password = md5($password);
	$result = $conn->prepare("SELECT * FROM korisnici WHERE USERNAME=? AND PASSWORD=?");
	$result->bind_param("ss",$username,$password);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{
		return false;
	}
}

function register($username, $password, $firstname, $lastname){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfUserExists($username)){
		$errors .= "Username already exists\r\n";
	}
	if(strlen($username) < 5){
		$errors .= "Username must have at least 5 characters\r\n";
	}
	if(strlen($password) < 5){
		$errors .= "Password must have at least 5 characters\r\n";
	}
	if(strlen($firstname) < 3){
		$errors .= "First name must have at least 3 characters\r\n";
	}
	if(strlen($lastname) < 3){
		$errors .= "Last name must have at least 3 characters\r\n";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO korisnici (FIRSTNAME, LASTNAME, USERNAME, PASSWORD) VALUES (?, ?, ?, ?)");
		$pass =md5($password);
		$stmt->bind_param("ssss", $firstname, $lastname, $username, $pass);
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = $conn->prepare("UPDATE korisnici SET TOKEN=? WHERE USERNAME=?");
			$result2->bind_param("ss",$id,$username);
			$result2->execute();
			$rarray['token'] = $id;
		}else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = "Database connection error";
		}
	} else{
		header('HTTP/1.1 400 Bad request');
		$rarray['error'] = json_encode($errors);
	}

	return json_encode($rarray);
}

function checkIfUserExists($username){
	global $conn;
	$result = $conn->prepare("SELECT * FROM korisnici WHERE USERNAME=?");
	$result->bind_param("s",$username);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{
		return false;
	}
}






function addKategorijaProizvoda($ime){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfLoggedIn()){
		if(strlen($ime) < 3){
			$errors .= "Ime kategorije mora imati bar 3 karaktera\r\n";
		}
		if($errors == ""){
				$stmt = $conn->prepare("INSERT INTO KATEGORIJA_PROIZVODA (IME) VALUES (?)");
				$stmt->bind_param("s", $ime);
				if($stmt->execute()){
					$rarray['success'] = "ok";
				}else{
					$rarray['error'] = "Database connection error";
				}
				return json_encode($rarray);
		} else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = json_encode($errors);
			return json_encode($rarray);
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getKategorije(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM KATEGORIJA_PROIZVODA");
		$num_rows = $result->num_rows;
		$kategorije = array();
		if($num_rows > 0)
		{	// $result2 = $conn->query("SELECT * FROM KATEGORIJA_PROIZVODA"); Ovaj red je ne potreban jer smo vec imamo poziv u $resulat
			while($row = $result->fetch_assoc()) {
				array_push($kategorije,$row);
			}
		}
		$rarray['kategorije'] = $kategorije;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}
function addProizvod($KATEGORIJA_PROIZVODA_ID , $IME, $CENA,$OPIS){

		global $conn;
		$rarray = array();
		$errors = "";
		if(checkIfLoggedIn()){
			 if(strlen($IME) < 3){
				 $errors .= "Name must have at least 3 characters\r\n";
			}
			 if(strlen($OPIS) < 3){
				 $errors .= "ISBN must have at least 3 characters\r\n";
			 }
			 if(!isset($KATEGORIJA_PROIZVODA_ID)){
				 $errors .= "You need to set author of a book\r\n";
			 }
			 if(!isset($CENA)){
				 $errors .= "You need to set author of a book\r\n";
			 }
			 if($errors == ""){
				 $stmt = $conn->prepare("INSERT INTO proizvod (KATEGORIJA_PROIZVODA_ID, IME,CENA,OPIS) VALUES (?, ?, ?,?)");
				 $stmt->bind_param("isis", $KATEGORIJA_PROIZVODA_ID, $IME, $CENA,$OPIS);
				 if($stmt->execute()){
					 $rarray['success'] = "ok";
				 }else{
					 $rarray['error'] = "Database connection error";
				 }
				 return json_encode($rarray);
			 } else{
				 header('HTTP/1.1 400 Bad request');
				 $rarray['error'] = json_encode($errors);
				 return json_encode($rarray);
			 }
		 } else{
			 $rarray['error'] = "Please log in";
			 header('HTTP/1.1 401 Unauthorized');
			 return json_encode($rarray);
		 }
}

function getProizvodi(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM proizvod");
		$num_rows = $result->num_rows;
		$products = array();
		if($num_rows > 0)
		{
				while($row = $result->fetch_assoc()) {
				$row['IME'] = getCategoryById($row['KATEGORIJA_PROIZVODA_ID']);
				array_push($products,$row);
			}
		}
		$rarray['products'] = $products;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getCategoryById($KATEGORIJA_PROIZVODA_ID){
	global $conn;
		$rarray = array();
		$KATEGORIJA_PROIZVODA_ID = intval($KATEGORIJA_PROIZVODA_ID);
		$result = $conn->query("SELECT * FROM kategorija_proizvoda WHERE ID=".$KATEGORIJA_PROIZVODA_ID);
		$num_rows = $result->num_rows;
		$rowtoreturn = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM kategorija_proizvoda WHERE ID=".$KATEGORIJA_PROIZVODA_ID);
			while($row = $result2->fetch_assoc()) {
				$rowtoreturn = $row;
			}
		}
		return $rowtoreturn['IME'];
}


function getKorisnikByToken(){
	$token = $_SERVER['HTTP_TOKEN'];
	global $conn;
	$result = $conn->query("SELECT ID FROM korisnici WHERE TOKEN ='".$token."'");
	$num_rows = $result->num_rows;
	if($num_rows === 1){
		$row = $result->fetch_assoc();
	     return $row['ID'];
	}
}

function addPorudzbina($PROIZVOD_ID){
		
		     global $conn;
			 $rarray = array();
			 $DATUM = date('m-d-Y H:i:s');
			 
			 if(checkIfLoggedIn()){
					$korisnikId = getKorisnikByToken();
					 $stmt = $conn->prepare("INSERT INTO  porudzbina (KORISNICI_ID,PROIZVOD_ID,DATUM) VALUES (?, ?, ?)");
					 $stmt->bind_param("iis", $korisnikId, $PROIZVOD_ID, $DATUM);
					 if($stmt->execute()){
						 $rarray['success'] = "ok";
					 }else{
						 $rarray['error'] = "Database connection error";
					 }
					 return json_encode($rarray);
				 }
			  else{
				 $rarray['error'] = "Please log in";
				 header('HTTP/1.1 401 Unauthorized');
				 return json_encode($rarray);
			 }

}

function getPorudzbine(){
		global $conn;
		$rarray = array();
		if(checkIfLoggedIn()){
			$korisnikId = getKorisnikByToken();
			$result = $conn->query("SELECT * FROM porudzbina WHERE KORISNICI_ID=" .$korisnikId);
			$num_rows = $result->num_rows;
			$narudzbina = array();
			if($num_rows > 0)
			{
				$result2 = $conn->query("SELECT * FROM porudzbina WHERE KORISNICI_ID=" .$korisnikId);
				while($row = $result2->fetch_assoc()) {
					$row['IME'] = getProizvodById($row['PROIZVOD_ID']);
					array_push($narudzbina,$row);
				}
			}
			$rarray['narudzbina'] = $narudzbina;
			return json_encode($rarray);
		} else{
			$rarray['error'] = "Please log in";
			header('HTTP/1.1 401 Unauthorized');
			return json_encode($rarray);
		}
	}
	

function getProizvodById($PROIZVOD_ID){

			global $conn;
				$rarray = array();
				$PROIZVOD_ID = intval($PROIZVOD_ID);
				$result = $conn->query("SELECT * FROM proizvod WHERE ID=".$PROIZVOD_ID);
				$num_rows = $result->num_rows;
				$rowtoreturn = array();
				if($num_rows > 0)
				{
					$result2 = $conn->query("SELECT * FROM proizvod WHERE ID=".$PROIZVOD_ID);
					while($row = $result2->fetch_assoc()) {
						$rowtoreturn = $row;
					}
				}
				return $rowtoreturn['IME'];


		}


function deletePorudzbina($orderid, $productid){
	global $conn;
	$rarray = array();
	// echo json_encode($orderid." i ".$productid);
	 if(checkIfLoggedIn()){
		 $result = $conn->prepare("DELETE FROM porudzbina WHERE ID=? AND PROIZVOD_ID=?");
		 $result->bind_param("ii",$orderid,$productid);
		 $result->execute();
		 $rarray['success'] = "Deleted successfully";
	 } else{
		 $rarray['error'] = "Please log in";
		 header('HTTP/1.1 401 Unauthorized');
	 }
    return json_encode($rarray);
}

function ifAdmin(){
	$token = $_SERVER['HTTP_TOKEN'];
	global $conn;
	$result = $conn->query("SELECT USERNAME FROM korisnici WHERE TOKEN ='".$token."'");
	$num_rows = $result->num_rows;
	if($num_rows === 1){
		$row = $result->fetch_assoc();
		$username = $row['USERNAME'];
		if ($username == 'admin'){
	    return true;}else {return false;}
	}
	else {
		return false;
	}
}

function deleteProizvod($PROIZVOD_ID){
	 global $conn;
	 // echo json_encode('Tu smo'); Proveravamo 
	  $rarray = array();
	  if(checkIfLoggedIn() &&  ifAdmin()){
		 $result = $conn->prepare("DELETE FROM proizvod WHERE ID=?");
		 $result->bind_param("i",$PROIZVOD_ID);
		 $result->execute();
		 $rarray['success'] = "Deleted successfully";
		 return json_encode($rarray);
	  } else{
		  $rarray['error'] = "Please log in";
		  header('HTTP/1.1 401 Unauthorized');
	  }
	  // return json_encode($rarray);

}




?>
