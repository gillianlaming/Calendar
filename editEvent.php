<?php
    require 'calendar_database.php';
    session_start();
		
	if(isset($_SESSION['name'])){ 
        $event_name = $_POST['event_name'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $loc = $_POST['location'];
        $event_id = $_POST['event_id'];
        $sessionCookie = $_POST['sessionCookie'];
        $token = $_SESSION['token'];

        if ($sessionCookie == $token){
        $edit_event = $mysqli->prepare("update events set event_name = ?, start_date = ?, end_date = ?, location = ? WHERE event_id = ?");
        if(!$edit_event){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $edit_event->bind_param('sssss', $event_name, $start_date, $end_date, $loc, $event_id);
        $edit_event->execute();
        $edit_event->close();
        $mysqli->close();
    }
    else{
        echo("");
    }
    }
?>