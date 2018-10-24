<?php
    require 'calendar_database.php';
    session_start();
		
	if(isset($_SESSION['name'])){ // if logged in
        $event_name = $_POST['event_name'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $loc = $_POST['location'];
        $color = $_POST['color'];
        $username = $_SESSION['name'];
        $token = $_SESSION['token'];
        $cookie = $_POST['sessionCookie'];
        
        if ($cookie == $token){
        $add_event = $mysqli->prepare("insert into events (username, event_name, start_date, end_date, location, color) values (?, ?, ?, ?, ?, ?)");
        $result = "true";
        if(!$add_event){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            $result = "false";
            exit;
        }
        echo($result);

        $add_event->bind_param('ssssss', $username, $event_name, $start_date, $end_date, $loc, $color);
        $add_event->execute();
        $add_event->close();
        $mysqli->close();
    }
    else {
        echo("token incorrect");
    }
}
?>