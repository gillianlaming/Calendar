<?php
    require 'calendar_database.php';
    $username = $_POST['username'];
    $password = $_POST['password']; //must encrypt the password

    $current_users = $mysqli->prepare("select username from users order by username"); // get current users
        if(!$current_users){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $current_users->execute();
        $current_users->bind_result($user); // store usernames in variable
        $user_exists = false;  

        while($current_users->fetch()){ // loop through all users
            if ($username === $user){ // check for username
                $user_exists = true;
                break;
            }
        }
        $current_users->close();
   
?>