<!DOCTYPE HTML>
<html>
    <head>
        <?php
        session_start();
        if (isset($_SESSION['name'])){ // if logged in, show options
            $name = $_SESSION['name'];
        ?>
        <meta charset="utf-8"/>
        <title><?php echo $name ?>'s calendar</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <link rel="stylesheet" href="calendar.css">
        <script type="text/javascript" src="calscript.js"></script>
        <script type="text/javascript" src="calendar.min.js"></script>
    </head>
    <body>
        <h1> <?php echo $name ?>'s calendar</h1>
        <h3 id="month_label"></h3>
        <button id="prev_month_btn">prev month</button>
        <button id="next_month_btn">next month</button>
        <table id="calendar">
            <tr>
                <td>Sunday</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td>
            </tr>
            <tr id="week1" class="week"></tr>
            <tr id="week2" class="week"></tr>
            <tr id="week3" class="week"></tr>
            <tr id="week4" class="week"></tr>
            <tr id="week5" class="week"></tr>
        </table>
        </body>
    </html>
    <?php } ?>
 
<script>
    var currentMonth = new Month(2018, 9); // current month is October 2018
    document.getElementById("month_label").innerHTML = getMonthName()+" "+currentMonth.year;
    updateCalendar(); // show the calendar

    // Change the month when the "next" button is pressed
    document.getElementById("next_month_btn").addEventListener("click", function(){
        currentMonth = currentMonth.nextMonth();
        updateCalendar(); 
        document.getElementById("month_label").innerHTML = getMonthName() +" "+currentMonth.year;
    }, false);

    document.getElementById("prev_month_btn").addEventListener("click", function(){
        currentMonth = currentMonth.prevMonth();
        updateCalendar(); 
        document.getElementById("month_label").innerHTML = getMonthName() +" "+currentMonth.year;
    }, false);

    document.getElementsByClassName('day_this_month').addEventListener('click', function(){
        alert("hi");
    }, false);
</script>
