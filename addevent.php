<!DOCTYPE=html>
<html>
<?php
		require 'calendar_database.php';
        // session_start();
        
        // if(isset($_SESSION['name'])){ // if logged in
        //     $name = $_SESSION['name'];
            
        // }
        if(isset($_POST['x'])){
            $form_data = $_POST['x'];
            echo $form_data;
        }

        ?>

    <script>

        let url = 'addevent.php';
        let formData = new FormData();
        formData.append("event_name", event_name, "start_date", start_date, "end_date", end_date, "location", location);

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


        var formData = new FormData(someFormElement);
        var formElement = document.querySelector("form");
        var request = new XMLHttpRequest();
        request.open("POST", "addevent.php");
        request.send(new FormData(formElement));

        
    </script>
</html>


