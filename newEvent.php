<?php
    require 'calendar_database.php';
    $event_name = $_POST['event_name'];
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $loc = $_POST['location'];
    $color = $_POST['color'];
    $username = $_POST['username'];
    // $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    
    $add_event = $mysqli->prepare("insert into events (username, event_name, start_date, end_date, location, color) values (?, ?, ?, ?, ?, ?)");
    $result = "true";
    if(!$add_event){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        $result = "false";
        exit;
    }
    echo($response);

    $add_event->bind_param('ssssss', $username, $event_name, $start_date, $end_date, $loc, $color);
    $add_event->execute();
    $add_event->close();
    $mysqli->close();
?>