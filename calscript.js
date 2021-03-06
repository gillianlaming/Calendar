function updateCalendar(){ // builds html table
    $('.week').empty();
	let weeks = currentMonth.getWeeks();
    let i = 1;
	for(let w in weeks){
		let days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
		let this_week = "week" + i;
		for(let d in days){
            let this_date = days[d].getDate();
            let this_month = days[d].getMonth();
            let formatted_date = days[d].getFullYear() + "-" + (this_month +1) + "-" + this_date;

            if (days[d].getMonth() == currentMonth.month){
                $('#'+this_week).append("<td class='day_this_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6><img src='plus.png' class='plus' onclick='addEvent(this)'></td>");
            } else{
                $('#'+this_week).append("<td class='day_wrong_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6></td>");
            } 
            // show dates in columns, id is the date
        }
        i++;
    }
    if (username != ''){
        loggedIn();
    }
}

function displayUserEvents(response){ // takes json response and displays events in calendar html
    $('.event').remove();
    let parsed = JSON.parse(response);
    for (let i =0; i<parsed.length; i++){
        let date = parsed[i].start_date.split(" ")[0];
        let time = parsed[i].start_date.split(" ")[1];
        let loc = parsed[i].location;
        let color = parsed[i].color;
        let event_id = parsed[i].event_id;
        let author = parsed[i].username;
        let day = date.substring(8);
        
        if (day[0] == 0){
            day = day.substring(1);
            date = date.substring(0,7)+"-"+day;
        }
        
        if (date[5] == 0)
            date = date.slice(0, 5) + date.slice(6, date.length);

        if (time[0] == 0)
            time = time.substring(1);

        let code = " "; if(color == "coquelicot"){ code = '#EF626C'} if(color == "glaucous"){code = '#6B4EAA'}
        if(color == "wenge"){ code = '#1b1e88' } if(color == "amaranth"){ code = '#F291BE' }if(color == "black"){code = '#000000'}

        let event_string = "<div class='event' onclick='editEvent(this)'><h6 class='time' id='"+time+"'>"+time+"</h6><p class='event_name' id='"+parsed[i].event_name+"'>"+parsed[i].event_name+"<i id='"+loc+"'> at "+loc+"</i><i class='event_id' id='"+event_id+"'></i><i id='"+author+"'></i><i id='"+color+"'></i></p></div>";
        $('#'+date).append(event_string);

        $('#'+date+" h6").first().css({"margin-bottom": "-40px"});
        $('#'+date+" img").first().css({"margin-bottom": "-20px","top": "0px"});
        $('#'+date+" p").css({"color": code});
    }
}

function loggedIn(){ // if login is successful, the calendar becomes editable
    $('#header').html(username+"'s Calendar");
    $('#register').css('display', 'none');
    $('#login').css('display', 'none');
    $('#logout').css('display', 'block');



    let images = document.getElementsByClassName('plus');
    for (let i =0; i<images.length; i++){
        images[i].style.display = 'block';
        images[i].style.cursor = 'pointer';
    }

    $('#label').html("click the plus sign to add an event on that day, or click your event to edit it");

   getEvents();
}

function getEvents(){ // ajax call to getEvents.php which gets this user's events from sql
     $.ajax({
        type: 'POST',
        url: 'getEvents.php',
        data: {sessionCookie},
        success: function(response) {
            if(!(response == "")){
                displayUserEvents(response);
                colorBlocks(response);
            }
            else{
                location.reload();
            }
        }
    });
}

function getMonthName(){ // month int to string
    let monthNum = currentMonth.month;
    if (monthNum == 0){ return 'January';} if (monthNum == 1){ return 'February';}if (monthNum == 2){ return 'March';}if (monthNum == 3){ return 'April';}
    if (monthNum == 4){ return 'May';}if (monthNum == 5){ return 'June';}if (monthNum == 6){ return 'July';}if (monthNum == 7){ return 'August';}
    if (monthNum == 8){ return 'September';}if (monthNum == 9){ return 'October';}if (monthNum == 10){ return 'November';}if (monthNum == 11){ return 'December';}
}

function addEvent(day) {  // this function makes the dialog box pop up, and adds listener for submit
    let this_date = day.parentNode.id;
    $('#popUpHeader').html('<br><h3>add an event on '+this_date+'</h3>');
    $('#start_date').val(this_date+" 0:00:00");
    $('#end_date').val(this_date +" 0:00:00");
    $('#edit_event').attr('id', 'new_event');
    $('#location').val("");
    $('#color').css('display', '');
    $('#event_name').val("");
    $('#submit').val('Add Event');
    $('#popUp').dialog();
    $('#calendar').css('opacity', '.75');

    document.getElementById('submit').addEventListener("click", function(){
        if (username != ''){
            let form_contents = [$('#event_name').val(), $('#start_date').val(), $('#end_date').val(), $('#location').val(), $('select').val(), username, sessionCookie];
            sendNewEvent(form_contents);
        } else {
            alert("you are not logged in");
        }
    }, false);

    $('#popUp').on('dialogclose', function(event) {
        $('#calendar').css('opacity', '1');
    });
}

function sendNewEvent(form_contents){ // this sends the form contents to php which sends to SQL
    $('#popUp').dialog('close');
    $.ajax({
        type: 'POST',
        url: 'newEvent.php',
        data: { event_name: form_contents[0], start_date: form_contents[1], end_date: form_contents[2], location: form_contents[3], color: form_contents[4], username: form_contents[5], sessionCookie: form_contents[6]},
        success: function(response) {
            $('#submit').replaceWith($('#submit').clone()); // removes event listeners
            getEvents();
        }
    });
}

function editEvent(event){ // pulls up dialog box for editing or deleting event, already propogated
    let this_time = event.childNodes[0].id;
    let this_name = event.childNodes[1].id;
    let this_date = event.parentNode.id;
    let this_loc = event.childNodes[1].childNodes[1].id;
    let this_event_id = event.childNodes[1].childNodes[2].id;
    let this_author = event.childNodes[1].childNodes[3].id;

    if (username === this_author){
        $('#popUpHeader').html('<br><h3>edit event on '+this_date+'</h3><button id="delete_event" value="'+this_name+'">Delete Event</button>');
        $('#new_event').attr('id', 'edit_event');
        $('#event_name').val(this_name);
        $('#start_date').val(this_date+" "+this_time);
        $('#end_date').val(this_date +" 23:00:00");
        $('#location').val(this_loc);
        $('#color').css('display', 'none'); // color is not editable
        $('#submit').val('Save Event');
        $('#popUp').dialog();
        $('#calendar').css('opacity', '.75');
        $('#popUp').on('dialogclose', function(event) {
            $('#calendar').css('opacity', '1');
        });
        document.getElementById('submit').addEventListener("click", function(){
            let form_contents = [$('#event_name').val(), $('#start_date').val(), $('#end_date').val(), $('#location').val(), this_event_id, sessionCookie];
            editThisEvent(form_contents);
        }, false);
        document.getElementById("delete_event").addEventListener("click", function(){
            deleteMe(this_event_id);

            $('#'+this_date+" h6").first().css({"margin-bottom": "-10px"});
            $('#'+this_date+" img").first().css({"margin-bottom": "0","top": "-30px"});
        }, false);
    } else {
        alert("you can\'t edit "+this_author+"\'s event");
    }
}

function editThisEvent(form_contents) { // sends form contents to php which sends to SQL to edit event
    $('#popUp').dialog('close');
    $.ajax({
        type: 'POST',
        url: 'editEvent.php',
        data: { event_name: form_contents[0], start_date: form_contents[1], end_date: form_contents[2], location: form_contents[3], event_id: form_contents[4], sessionCookie: form_contents[5] },
        success: function(response) {
            $('#submit').replaceWith($('#submit').clone());
            getEvents();
        }
    });
}

function deleteMe(info){ // sends info of what event to delete
    $('#popUp').dialog('close');
    $.ajax({
        type: 'POST',
        url: 'deleteEvent.php', 
        data: { event_id: info, sessionCookie },
        success: function(response) {
            if (response == "true"){
                $('#delete_event').replaceWith($('#delete_event').clone());
                getEvents();
            }
        }
    });
}

function colorBlocks(response){
    $('.colorListItem').remove();
    $('.line').remove();
    let parsed = JSON.parse(response);
    for (let i =0; i<parsed.length; i++){
        let date = parsed[i].start_date.split(" ")[0];
        let time = parsed[i].start_date.split(" ")[1];
        let loc = parsed[i].location;
        let color = parsed[i].color;
        let day = date.substring(8);
        
        if (day[0] == 0){
            day = day.substring(1);
            date = date.substring(0,7)+"-"+day;
        }

        if (time[0] == 0)
            time = time.substring(1);

        let code = " "; if(color == "coquelicot"){ code = '#EF626C'} if(color == "glaucous"){code = '#6B4EAA'}
        if(color == "wenge"){ code = '#1b1e88' } if(color == "amaranth"){ code = '#F291BE' }if(color == "black"){code = '#000000'}

        let event_string = "<li class='colorListItem'><h6 class='time'>"+date+" at "+time+"</h6><p class='event_name'>"+parsed[i].event_name+"<i id='"+loc+"'> at "+loc+"</i></p></li><hr class='line'>";

        $('#'+color+"Block").append(event_string);
        $('#'+color+"Block").css({"background-color": code, "color": "#fff"});
    }
}