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
        if ($user_exists == true){
           //check password
           $myArray = array();
            if ($result = $mysqli->query("select username, password_hash, from users order by username")) {
        
                while($row = $result->fetch_array(MYSQL_ASSOC)) {
                        $myArray[] = $row;
                }
                echo json_encode($myArray);
            }
        
    $result->close();
        }
        else{
            echo "false";
        }
        $current_users->close();
        $mysqli->close();
   
?>