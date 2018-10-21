<?php
    require 'calendar_database.php';
    $username = $_POST['username'];
    $password = $_POST['password']; //must encrypt the password

    $add_user = $mysqli->prepare("insert into users (username, password_hash) values (?, ?)");
    if(!$add_user){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $add_user->bind_param('ss', $username, $password);
    $add_user->execute();
    $add_user->close();
    $mysqli->close();
?>