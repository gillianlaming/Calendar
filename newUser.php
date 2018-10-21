<?php
    require 'calendar_database.php';
    if(isset($_POST['username'])){
        $username = $_POST['username'];
    }
    if(isset($_POST['username'])){
        $password = $_POST['password'];
        $hash = password_hash($pass, PASSWORD_BCRYPT); //must encrypt the password
    }
   
    $add_user = $mysqli->prepare("insert into users (username, password_hash) values (?, ?)");
    if(!$add_user){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $add_user->bind_param('ss', $username, $hash);
    $add_user->execute();
    $add_user->close();
    $mysqli->close();
?>