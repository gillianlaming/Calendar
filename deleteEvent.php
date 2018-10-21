<!DOCTYPE html>
<html lang='en'>
<?php
require 'calendar_database.php';

    $event_id = $_POST['event_id'];
		//delete from databse
    $delete_event = $mysqli->prepare("delete from events where event_id = ?");
    if (!$delete_event){
			printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
	}
	$delete_event->bind_param('i', $event_id);
    $delete_event->execute(); 
    $delete_event->close();
    
	$delete = $mysqli->prepare("delete from events where id = ?");
    if (!$delete){
			printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
	}
	$delete->bind_param('i', $event_id);
    $delete->execute(); 
    $delete->close();

?>
</html>