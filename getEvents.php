<?php
    require 'calendar_database.php';

    $myArray = array();
    if ($result = $mysqli->query("select event_id, username, event_name, start_date, end_date, location from events order by event_id")) {
  
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
                $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  
    $result->close();
    $mysqli->close();
?>