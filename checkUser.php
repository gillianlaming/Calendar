<?php
    require 'calendar_database.php';
    if(isset($_POST['username'])){
        $username = $_POST['username'];
    }
    if(isset($_POST['username'])){
        $password = $_POST['password']; //must encrypt the password
        
    }

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
        if ($user_exists == true){
           //check password
            $get_hash = $mysqli->prepare("select password_hash from users where username=?");
            // get the password_hash from the table
            if(!$get_hash){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            
            $get_hash->bind_param('s', $username);
            $get_hash->execute();
            $get_hash->bind_result($hash); // store in variable
            $get_hash->fetch();
            $get_hash->close();

            if (password_verify($password, $hash)){
                echo ("true");
            }
            else{
                echo ("false");
            }
        
    
        }
        else{
            echo ("false");
        }
        
        
        $mysqli->close();
   
?>