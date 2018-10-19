<!DOCTYPE=html>
<html>
<?php
		require 'calendar_database.php';
        session_start();
        
        if(isset($_SESSION['name'])){ // if logged in
            $name = $_SESSION['name'];
            
        }
        if(isset($_POST['x'])){
            $form_data = $_POST['x'];
            echo $form_data;
        }

        ?>

    <script>
        // this part goes in leelas part
        let event_name = get the event
        let start_date = start date
        let end_date = end date
        let location = location 

        let url = 'addevent.php';
        let formData = new FormData();
        formData.append("event_name", name, "start_date", date, "end_date", date, "location", location);

            fetch('addevent.php', {
            method: "POST",
            body: JSON.stringify(data)
            })

        const pathToPhpFile = 'addevent.php';
        fetch(pathToPhpFile, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:',error))

        
    </script>
</html>


