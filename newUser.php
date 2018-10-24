<?php
    require 'calendar_database.php';

    if(isset($_POST['username'])){
        $username = $_POST['username'];
    }
    if(isset($_POST['password'])){
        $password = $_POST['password'];
        $hash = password_hash($password, PASSWORD_BCRYPT); 
    }

    // $current_users = $mysqli->prepare("select username from users order by username"); // get current users
    //     if(!$current_users){
    //         printf("Query Prep Failed: %s\n", $mysqli->error);
    //         exit;
    //     }
    //     $current_users->execute();
    //     $current_users->bind_result($user); // store usernames in variable
    //     $user_exists = true;  

    //     while($current_users->fetch()){ // loop through all users
    //         if ($username === $user){ // check for username
    //             $user_exists = false;
    //             break;
    //         }
    //     }
    //     $current_users->close();
    //     if ($user_exists){
    //         echo("false");
    //         exit;
    //     }
   
    $add_user = $mysqli->prepare("insert into users (username, password_hash) values (?, ?)");
    if(!$add_user){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        echo("false");
        exit;
    }
    else{
        echo("true");
    }

    $add_user->bind_param('ss', $username, $hash);
    $add_user->execute();
    $add_user->close();
    $mysqli->close();
    
    $current_users = $mysqli->prepare("select username from users order by username"); // get current users
        
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
        if ($user_exists){
            echo "user exists";
            exit;
        } 
        else{
            $add_user = $mysqli->prepare("insert into users (username, password_hash) values (?, ?)");
            $add_user->bind_param('ss', $username, $hash);
            $add_user->execute();
            $add_user->close();

            echo 'true';
        }
    $mysqli->close();
?>