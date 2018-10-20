<?php
    require 'calendar_database.php';

    $myArray = array();
    if ($result = $mysqli->query("select username, event_name, start_date, end_date, location from events order by start_date")) {
  
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
                $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  
    $result->close();
    $mysqli->close();
?>