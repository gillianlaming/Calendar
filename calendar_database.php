<?php

  $mysqli = new mysqli('localhost', 'calendar_username', 'calendar_password_hash', 'calendar');
 
  if($mysqli->connect_errno) {
      printf("Connection Failed: %s\n", $mysqli->connect_error);
      exit;
  }

?>