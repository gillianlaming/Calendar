<?php
    require 'calendar_database.php';
    $user = 'leela'; // change this
    $myArray = array();
    
    $result = $mysqli->prepare("select event_id, username, event_name, start_date, end_date, location from events where username=?");
    if(!$result){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $result->bind_param('s', $user);
    $result->execute();

    $result->bind_result($event_id, $username, $event_name, $start_date, $end_date, $location);

    while ($result->fetch()) {
        array_push($myArray, ['event_id' => $event_id, 'username' => $username, 'event_name' => $event_name, 'start_date' => $start_date, 'end_date' =>  $end_date, 'location' =>  $location]);
    }
    echo json_encode($myArray);
    
    $result->close();
    $mysqli->close();
?>