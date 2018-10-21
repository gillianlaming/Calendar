
function updateCalendar(){
    $('.week').empty();
	var weeks = currentMonth.getWeeks();
    let i = 1;
	for(var w in weeks){
		var days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
		let this_week = "week" + i;
		for(var d in days){
            let this_date = days[d].getDate();

            let formatted_date = days[d].getFullYear() + "-" + (days[d].getMonth() + 1) + "-" + this_date;

            if (days[d].getMonth() == currentMonth.month){
                $('#'+this_week).append("<td class='day_this_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6><img src='plus.png' id='plus' onclick='addEvent(this)'></td>");
            } else{
                $('#'+this_week).append("<td class='day_wrong_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6></td>");
            } 
            // show dates in columns, id is the date
        }
        i++;
    }
    displayEvents();
    getUser();
    // addListeners(document.getElementsByClassName("day_this_month"));
}

function getMonthName(){
    var monthNum = currentMonth.month;
    if (monthNum == 0){ return 'January';} if (monthNum == 1){ return 'February';}if (monthNum == 2){ return 'March';}if (monthNum == 3){ return 'April';}
    if (monthNum == 4){ return 'May';}if (monthNum == 5){ return 'June';}if (monthNum == 6){ return 'July';}if (monthNum == 7){ return 'August';}
    if (monthNum == 8){ return 'September';}if (monthNum == 9){ return 'October';}if (monthNum == 10){ return 'November';}if (monthNum == 11){ return 'December';}
}

// function addListeners(days){
//     for (var i=0; i<days.length; i++){
//         days[i].addEventListener('click', addEvent, false);
//     }
// }


function addEvent(day) {  // this function makes the dialog box pop up, and adds listener for submit
    let this_date = day.parentNode.id;
    $('#popUpHeader').html('<br><h3>add an event on '+this_date+'</h3>');
    $('#start_date').val(this_date+" 0:00:00");
    $('#end_date').val(this_date +" 0:00:00");
    $('#edit_event').attr('id', 'new_event');
    $('#location').val("");
    $('#event_name').val("");
    $('#submit').val('Add Event');
    $('#popUp').dialog();
    $('#calendar').css('opacity', '.75');

    document.getElementById('submit').addEventListener("click", function(){
        let form_contents = [$('#event_name').val(), $('#start_date').val(), $('#end_date').val(), $('#location').val()];
        sendNewEvent(form_contents);
    });
    $('#popUp').on('dialogclose', function(event) {
        $('#calendar').css('opacity', '1');
    });
}

function sendNewEvent(form_contents){ // this sends the form contents to php which sends to SQL
    $('#popUp').dialog('close');

    $.ajax({
        type: 'POST',
        url: 'newEvent.php',
        data: { event_name: form_contents[0], start_date: form_contents[1], end_date: form_contents[2], location: form_contents[3] },
        success: function(response) {
            console.log(response);
        }
    });

    updateCalendar();
}



function displayEvents(){ // display events from SQL
    let xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("GET", "http://ec2-18-223-135-67.us-east-2.compute.amazonaws.com/getEvents.php", true); //leela's
    xmlHttp.open("GET", "http://ec2-18-207-202-216.compute-1.amazonaws.com/~gdlaming/getEvents.php", true); //gillians
    
    // on load
    xmlHttp.addEventListener('load', function(e){
       if (xmlHttp.status == 200){
            let response = xmlHttp.responseText; // get json
            let parsed = JSON.parse(response); // parse json

            for (let i =0; i<parsed.length; i++){
                let date = parsed[i].start_date.split(" ")[0];
                let time = parsed[i].start_date.split(" ")[1];
                let loc = parsed[i].location;
                let event_id = parsed[i].event_id;
                let day = date.substring(8);
                
                if (day[0] == 0){
                    day = day.substring(1);
                    date = date.substring(0,7)+"-"+day;
                }

                if (time[0] == 0)
                    time = time.substring(1);
                
                $('#'+date).append("<h6 class='time' id='"+time+"'>"+time+"</h6><p class='event_name' event_id='"+event_id+"' id='"+parsed[i].event_name+"' onclick='editEvent(this)'>"+parsed[i].event_name+"<i id='"+loc+"'> at "+loc+"</i></p>");
                $('#'+date+" h6").first().css({"margin-bottom": "-40px"});
                $('#'+date+" img").first().css({"margin-bottom": "-20px","top": "0px"});
            }
       }
       else {
           $('#calendar').html("<p>Something went wrong. Try again!</p>");
       }
    }, false);

    xmlHttp.send(null);
}


function editEvent(event){ // pulls up dialog box for editing event
    let this_date = event.parentNode.id;
    let this_name = event.id;
    let this_time = event.parentNode.childNodes[2].id;
    let this_loc = event.parentNode.childNodes[3].childNodes[1].id;
    let this_event_id = event.attr('event_id'); // not working
    console.log(this_event_id);
    $('#popUpHeader').html('<br><h3>edit event on '+this_date+'</h3><button id="delete_event" value="'+this_name+'">Delete Event</button>');
    $('#new_event').attr('id', 'edit_event');
    $('#event_name').val(this_name);
    $('#start_date').val(this_date+" "+this_time);
    $('#end_date').val(this_date +" 23:00:00");
    $('#location').val(this_loc);
    $('#submit').val('Save Event');
    $('#popUp').dialog();
    $('#calendar').css('opacity', '.75');
    $('#popUp').on('dialogclose', function(event) {
        $('#calendar').css('opacity', '1');
    });
    document.getElementById('submit').addEventListener("click", function(){
        let form_contents = [$('#event_name').val(), $('#start_date').val(), $('#end_date').val(), $('#location').val(), this_event_id];
        editThisEvent(form_contents);
    });
}

function editThisEvent(form_contents) {
    $('#popUp').dialog('close');

    console.log("event_id is: "+form_contents[4]);

    $.ajax({
        type: 'POST',
        url: 'editEvent.php',
        data: { event_name: form_contents[0], start_date: form_contents[1], end_date: form_contents[2], location: form_contents[3], event_id: form_contents[4] },
        success: function(response) {
            console.log(response);
        }
    });

    updateCalendar();
}

