<?php
require 'calendar_database.php';
session_start();
		
	if(isset($_SESSION['name'])){ 
        $sessionCookie = $_POST['sessionCookie'];
        $token = $_SESSION['token'];

        $event_id = $_POST['event_id'];
            //delete from databse
        
        $delete = $mysqli->prepare("delete from events where event_id = ?");
        $worked = "true";
        if (!$delete){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                $worked = "false";
                exit;
        }
        echo($worked);
        

        $delete->bind_param('i', $event_id);
        $delete->execute(); 
        $delete->close();
        $mysqli->close();
    }
?>